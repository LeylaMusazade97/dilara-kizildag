import assert from "node:assert/strict";
import test from "node:test";
import worker from "../dist/server/index.js";

const origin = "https://dilara-kizildag-portfolio.leilamusaz.chatgpt.site";
const cases = [
  ["/", "tr", "Dilara Kızıldağ | Ressam ve Görsel Sanatçı", "İstanbul merkezli ressam ve görsel sanatçı Dilara Kızıldağ’ın seçili eserleri, resim serileri, sergileri ve sanat pratiği."],
  ["/?lang=en", "en", "Dilara Kızıldağ | Painter and Visual Artist", "Explore selected artworks, painting series, exhibitions, and the artistic practice of Istanbul-based painter and visual artist Dilara Kızıldağ."],
  ["/about", "tr", "Hakkında | Dilara Kızıldağ", "İstanbul merkezli ressam ve görsel sanatçı Dilara Kızıldağ’ın biyografisi, sanat pratiği, sergileri ve projeleri."],
  ["/about?lang=en", "en", "About | Dilara Kızıldağ", "Discover the biography, artistic practice, exhibitions, and projects of Istanbul-based painter and visual artist Dilara Kızıldağ."],
  ["/gallery", "tr", "Galeri ve Seriler | Dilara Kızıldağ", "Dilara Kızıldağ’ın Hortlak Şefkat İster, Defterle Aramızda, Cam Altı ve Meyhane Serisi çalışmalarını keşfedin."],
  ["/gallery?lang=en", "en", "Gallery and Series | Dilara Kızıldağ", "Explore Dilara Kızıldağ’s selected artworks and series, including Hortlak Şefkat İster, Defterle Aramızda, reverse-glass paintings, and Meyhane."],
];

async function render(path, headers = {}) {
  const response = await worker.fetch(new Request(origin + path, {
    headers: { accept: "text/html", ...headers },
  }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, {
    waitUntil() {}, passThroughOnException() {},
  });
  return { response, html: await response.text() };
}

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(([, name, value]) =>
    [name.toLowerCase(), value.replaceAll("&amp;", "&").replaceAll("&quot;", '"')],
  ));
}

for (const [path, language, title, description] of cases) {
  test(`initial server HTML SEO: ${path}`, async () => {
    const { response, html } = await render(path);
    assert.equal(response.status, 200);
    assert.match(html, new RegExp(`<html[^>]*lang="${language}"`));
    const head = html.match(/<head[^>]*>([\s\S]*?)<\/head>/)?.[1];
    assert.ok(head, "Initial HTML must contain a head");
    assert.equal(head.match(/<title>(.*?)<\/title>/s)?.[1], title);
    const metas = [...head.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => attributes(tag));
    assert.equal(metas.filter((m) => m.name === "description").length, 1);
    assert.equal(metas.find((m) => m.name === "description")?.content, description);
    const links = [...head.matchAll(/<link\b[^>]*>/g)].map(([tag]) => attributes(tag));
    assert.deepEqual(links.filter((l) => l.rel === "canonical").map((l) => l.href), [origin + path]);
    const base = path.split("?")[0];
    assert.deepEqual(links.filter((l) => l.hreflang).map((l) => [l.hreflang, l.href]).sort(),
      [["en", origin + base + "?lang=en"], ["tr", origin + base]]);
    assert.equal(metas.some((m) => /^(robots|googlebot)$/.test(m.name ?? "") && /noindex/.test(m.content ?? "")), false);
  });
}

test("URL language overrides an untrusted request header, including concurrent requests", async () => {
  const results = await Promise.all(cases.map(async ([path, language]) => {
    const { html } = await render(path, { "x-portfolio-language": language === "en" ? "tr" : "en" });
    assert.match(html, new RegExp(`<html[^>]*lang="${language}"`));
  }));
  assert.equal(results.length, 6);
});

test("series parameter renders selected content with its own SEO URLs", async () => {
  const { html } = await render("/gallery?series=meyhane&lang=en");
  assert.match(html, /<html[^>]*lang="en"/);
  const links = [...html.matchAll(/<link\b[^>]*>/g)].map(([tag]) => attributes(tag));
  assert.equal(links.find((l) => l.rel === "canonical")?.href, origin + "/gallery?series=meyhane&lang=en");
  assert.ok(links.filter((l) => l.hreflang).every((l) => l.href.includes("series=meyhane")));
  assert.ok(html.includes('class="series-grid series-grid--meyhane"'));
});

test("sitemap contains the six main and six additional series canonical URLs without invented lastmod", async () => {
  const { response, html: xml } = await render("/sitemap.xml");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /xml/);
  assert.match(xml, /xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9"/);
  const extra = ["defter", "cam-alti", "meyhane"].flatMap((key) => [origin + `/gallery?series=${key}`, origin + `/gallery?series=${key}&lang=en`]);
  assert.deepEqual([...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, url]) => url.replaceAll("&amp;", "&")).sort(),
    [...cases.map(([path]) => origin + path), ...extra].sort());
  assert.equal(xml.includes("<lastmod>"), false);
  assert.equal(xml.includes("series=hortlak"), false);
});

const seriesCases = [
  ["hortlak", "Hortlak Şefkat İster", "The Ghost Needs Compassion", 7, "Hortlak, yası tutulmamış", "The ghost represents", "Karışık teknik", "Mixed media"],
  ["defter", "Defterle Aramızda", "Between the Notebook and Me", 9, "Defterlerim bu diyaloğun", "My notebooks are like an archive", "Kağıt üzerine karışık teknik", "Mixed media on paper"],
  ["cam-alti", "Cam Altı", "Reverse Glass", 2, null, null, "Cam altı boyama tekniği", "Reverse glass painting"],
  ["meyhane", "Meyhane", "“Meyhane” Series", 11, "Bir meyhanede zaman başka türlü akar.", "Time flows differently in a meyhane.", "Kağıt üzerine suluboya", "Watercolour on paper"],
];

for (const [key, trLabel, enLabel, count, trDescription, enDescription, trTechnique, enTechnique] of seriesCases) {
  for (const language of ["tr", "en"]) {
    test(`series SSR, links, metadata and language switching: ${key}/${language}`, async () => {
      const suffix = language === "en" ? "&lang=en" : "";
      const path = `/gallery?series=${key}${suffix}`;
      const canonicalPath = key === "hortlak" ? `/gallery${language === "en" ? "?lang=en" : ""}` : path;
      const { response, html } = await render(path);
      assert.equal(response.status, 200);
      assert.match(html, new RegExp(`<html[^>]*lang="${language}"`));
      const section = html.match(/<section\b[^>]*class="gallery-series"[\s\S]*?<\/section>/)?.[0];
      assert.ok(section);
      assert.match(section, new RegExp(`class="series-grid series-grid--${key}"`));
      assert.equal((section.match(/<figure\b/g) ?? []).length, count);
      assert.equal((section.match(/class="series-grid /g) ?? []).length, 1);
      const label = language === "en" ? enLabel : trLabel;
      assert.ok(section.includes(`<h3 class="sr-only">${label}</h3>`));
      const description = language === "en" ? enDescription : trDescription;
      if (description) assert.ok(section.includes(description));
      assert.ok(section.includes(language === "en" ? enTechnique : trTechnique));
      const head = html.match(/<head[^>]*>([\s\S]*?)<\/head>/)?.[1];
      const links = [...head.matchAll(/<link\b[^>]*>/g)].map(([tag]) => attributes(tag));
      assert.equal(links.find((l) => l.rel === "canonical")?.href, origin + canonicalPath);
      const trPath = key === "hortlak" ? "/gallery" : `/gallery?series=${key}`;
      const enPath = key === "hortlak" ? "/gallery?lang=en" : `/gallery?series=${key}&lang=en`;
      assert.deepEqual(links.filter((l) => l.hreflang).map((l) => [l.hreflang, l.href]).sort(), [["en", origin + enPath], ["tr", origin + trPath]]);
      if (key !== "hortlak") {
        assert.equal(head.match(/<title>(.*?)<\/title>/s)?.[1], `${label} | Dilara Kızıldağ`);
        assert.ok(attributes(head.match(/<meta name="description"[^>]*>/)?.[0]).content.length > 0);
      }
      const seriesNav = section.match(/<nav\b[\s\S]*?<\/nav>/)?.[0];
      assert.equal((seriesNav.match(/<a\b/g) ?? []).length, 4);
      assert.equal(seriesNav.includes("<button"), false);
      const navLinks = [...seriesNav.matchAll(/<a\b[^>]*>/g)].map(([tag]) => attributes(tag));
      assert.equal(navLinks.filter((l) => l["aria-current"] === "page").length, 1);
      assert.equal(navLinks.find((l) => l["aria-current"] === "page")?.href, canonicalPath + "#seriler");
      for (const link of navLinks) {
        assert.equal(new URL(link.href, origin).searchParams.get("lang"), language === "en" ? "en" : null);
      }
      const languageOptions = html.match(/<div class="language-options">([\s\S]*?)<\/div>/)?.[1];
      const languageLinks = [...languageOptions.matchAll(/<a\b[^>]*>/g)].map(([tag]) => attributes(tag));
      assert.deepEqual(languageLinks.map((l) => l.href), [trPath, enPath]);
      const refresh = await render(path);
      assert.equal(refresh.html.match(/<section\b[^>]*class="gallery-series"[\s\S]*?<\/section>/)?.[0], section);
    });
  }
}

test("unknown and empty series return 404 instead of rendering the default gallery", async () => {
  for (const path of ["/gallery?series=unknown", "/gallery?series=unknown&lang=en", "/gallery?series="]) {
    const { response, html } = await render(path);
    assert.equal(response.status, 404);
    assert.equal(html.includes('class="series-grid series-grid--hortlak"'), false);
  }
});

test("default aliases and parameterless gallery have identical series content", async () => {
  for (const suffix of ["", "?lang=en"]) {
    const a = await render("/gallery" + suffix);
    const b = await render("/gallery?series=hortlak" + (suffix ? "&lang=en" : ""));
    const section = (html) => html.match(/<section\b[^>]*class="gallery-series"[\s\S]*?<\/section>/)?.[0];
    assert.equal(section(a.html), section(b.html));
  }
});

for (const language of ["tr", "en"]) {
  test(`home animations remain without visible pause controls in initial HTML: ${language}`, async () => {
    const { html } = await render(language === "en" ? "/?lang=en" : "/");
    const buttons = [...html.matchAll(/<button\b[^>]*class="motion-control[^>]*>(.*?)<\/button>/gs)];
    assert.equal(buttons.length, 0);
    assert.ok(html.includes('id="galeri" class="practice-artwork motion-region"'));
    assert.ok(html.includes('class="series-motion-region motion-region"'));
  });
}
