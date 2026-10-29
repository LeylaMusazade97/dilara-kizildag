import EditorialSection from "./EditorialSection";
import MotionRegion from "./MotionRegion";
import ResponsiveArtwork from "./ResponsiveArtwork";
import { LanguageSwitcher, languageFrom, localHref, type PageSearchParams } from "./language";
import { pageMetadata } from "./seo";

export async function generateMetadata({ searchParams }: { searchParams: PageSearchParams }) {
  return pageMetadata("/", languageFrom((await searchParams).lang));
}

const exhibitionsTr = [
  ["2026", "Reclaim Collective", "Karma Sergi · 48 Stunden Neukölln", "Berlin, Almanya"],
  ["2026", "Kadın Zamanı", "Karma Sergi · SAYE Kollektif", "İstanbul"],
  ["2025", "Sana Dokunduğum Yer", "Solo Sergi · Barba Art Space", "İstanbul"],
  ["2025", "İAAF", "Karma Sergi · Lütfi Kırdar Kongre Merkezi", "İstanbul"],
  ["2024", "Olipa Kerran", "Karma Sergi · Weekend Gallery", "Helsinki, Finlandiya"],
  ["2024", "Evvel Zaman İçinde", "İkili Sergi · Mantra", "İstanbul"],
];
const exhibitionsEn = [
  ["2026", "Reclaim Collective", "Group Exhibition · 48 Stunden Neukölln", "Berlin, Germany"],
  ["2026", "Kadın Zamanı", "Group Exhibition · SAYE Collective", "Istanbul"],
  ["2025", "Sana Dokunduğum Yer", "Solo Exhibition · Barba Art Space", "Istanbul"],
  ["2025", "İAAF", "Group Exhibition · Lütfi Kırdar Congress Center", "Istanbul"],
  ["2024", "Olipa Kerran", "Group Exhibition · Weekend Gallery", "Helsinki, Finland"],
  ["2024", "Evvel Zaman İçinde", "Two-Person Exhibition · Mantra", "Istanbul"],
];

const quotedExhibitionTitle = (title: string) => `“${title}”`;

const meyhaneWorks = [
  ["gallery-meyhane-biz.webp", "Biz"],
  ["gallery-meyhane-derinde.webp", "Derinde, uzakta, burda"],
  ["gallery-meyhane-karsi-masa-a4.webp", "Karşı masa"],
  ["gallery-meyhane-karsi-masa-a5.webp", "Karşı masa"],
  ["gallery-meyhane-otoportre.webp", "Meyhaneli otoportre"],
  ["gallery-meyhane-meyve-tabagi.webp", "Meyve tabağı"],
  ["gallery-meyhane-sofra-a5.webp", "Sofra"],
  ["gallery-meyhane-sofra-a4.webp", "Sofra"],
  ["gallery-meyhane-suda.webp", "Suda"],
];

function ArrowRightIcon() {
  return (
    <svg className="section-link-icon" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M7 25 25 7M11 7h14v14" />
    </svg>
  );
}

const homeEn = {
  nav:["Home","Gallery","About"], artist:"Painter", quote:"“I paint not to hold a moment still, but to find my way back to it.”", practiceLabel:"Art Practice",
  practiceTitle:<>I gather stories<br />along the way.</>,
  practice:"My artistic practice takes shape outside the home, at temporary stopping points. In public space, I choose an unobtrusive place where I can feel safe and draw the moment from both within and outside it. My body thus shifts from an object being looked at into an instrument that listens to and reconstructs its surroundings. My drawing practice makes the relationship between inside and outside visible not as a linear passage, but as an interwoven process marked by traces. It becomes a fluid state of being, emerging anew from within.",
  caption:"“Dragon and Simurgh”, reverse-glass painting", statement:"“Ever since I can remember, I have struggled to form an intimate relationship with words. Visual expression has always allowed me to express myself more fully and has affected me more deeply. At the same time, growing up with the visible scars I have carried on my body since infancy, I learned not to be seen. As I grew up quietly and invisibly, the parts of me that listened to, observed, and watched the life around me developed differently from everyone else’s; painting became a part of me without which I could no longer be myself.”",
  story:"Read more", series:"Series", meyhane:"“MEYHANE” SERIES", all:"View all", notes:["Watercolour, ink, and coloured pencil intertwine across these pages, building a layered visual narrative on paper.","Bringing together everyday observations, moments of travel, and personal experience, each work becomes a way of encountering the world anew."], exhibitions:"EXHIBITIONS AND PROJECTS", themes:"Themes", feminine:"THE HONOUR OF THE FEMININE", feminineNotes:["Within binary gender norms, woman is defined as the settled one: Mother Earth, Pachamama, Gaia… She nurtures, protects roots, and safeguards the seed.","I find a certain poetry in the expectations of our cherished norms. On the road and in motion, I explore the potential of inhabiting a body with a womb, a vagina, and breasts—and the honour of the feminine."], footer:"For an exhibition, project, or collaborative idea, please get in touch.", location:"Şişli, Istanbul"
};

export default async function Home({ searchParams }: { searchParams: PageSearchParams }) {
  const language = languageFrom((await searchParams).lang); const en = language === "en";
  return (
    <main className="home-page" id="main-content" lang={language}>
      <section className="hero" id="ana-sayfa">
        <div className="hero-image"><ResponsiveArtwork src="/art/dilara-portrait.webp" sizes="(max-width: 900px) 100vw, 50vw" alt={en?"A black-and-white portrait of painter and visual artist Dilara Kizildag":"Ressam ve görsel sanatçı Dilara Kızıldağ’ın siyah beyaz portresi"} fetchPriority="high" /></div>
        <div className="hero-copy">
          <nav aria-label={en?"Main navigation":"Ana navigasyon"}><LanguageSwitcher language={language} path="/" /><a href={localHref("/#ana-sayfa",language)} aria-current="page">{en?homeEn.nav[0]:"Ana Sayfa"}</a><a href={localHref("/gallery",language)}>{en?homeEn.nav[1]:"Galeri"}</a><a href={localHref("/about",language)}>{en?homeEn.nav[2]:"Hakkında"}</a><a href="https://asilyolculukgeridonmek.wordpress.com/" target="_blank" rel="noopener noreferrer">Blog</a></nav>
          <div className="hero-title"><h1>{en?<>DILARA<br />KIZILDAG</>:<>DİLARA<br />KIZILDAĞ</>}</h1><p className="eyebrow">{en?homeEn.artist:"Ressam"}</p></div>
          <p className="hero-quote">{en?homeEn.quote:"“Anı durdurmak için değil, onunla yeniden buluşmak için resmediyorum.”"}</p>
        </div>
      </section>

      <section className="practice" id="hakkinda">
        <div className="practice-copy">
          <p className="eyebrow">{en?homeEn.practiceLabel:"Sanat Pratiği"}</p>
          <h2>{en?homeEn.practiceTitle:<>Hikâyeleri<br />yolda biriktiriyorum.</>}</h2>
          <p>{en?homeEn.practice:"Sanatsal pratiğim evin dışında, geçici duraklarda ortaya çıkar. Kamusal alanda güvende hissedeceğim görünmez bir oturma yeri seçiyor; o anı hem içeriden hem dışarıdan bakarak çiziyorum. Bedenim böylece bakılan bir nesneden, mekânı dinleyen ve yeniden kuran bir gözlem aracına dönüşüyor. Çizim pratiğim, içeri ve dışarı arasındaki ilişkiyi doğrusal bir geçişten ziyade, izlerle işaretlenmiş, iç içe geçen bir süreç olarak görünür kılıyor. İçten gelenle yeniden ortaya çıkan akışkan bir oluş haline geliyor."}</p>
        </div>
        <MotionRegion kind="rotation" language={language} id="galeri">
          <div className="practice-artwork-viewport">
          <ResponsiveArtwork className="circular-artwork" loading="lazy" decoding="async" src="/art/cam-alti-minno.webp" sizes="(max-width: 900px) calc(100vw - 32px), 41vw" alt="Ejderha ve Simurg adlı dairesel cam altı eser" />
          </div>
          <figcaption>{en?homeEn.caption:"“Ejderha ve Simurg”, cam altı boyama tekniği"}</figcaption>
        </MotionRegion>
      </section>

      <section className="statement">
        {en?<p><span>{homeEn.statement.slice(0,2)}</span>{homeEn.statement.slice(2)} <a className="statement-link" href={localHref("/about#hikayem",language)}>{homeEn.story}</a></p>:<p><span>“K</span>endimi bildiğimden beri kelimelerle samimi bir bağ kuramadım. Görsel ifade beni her zaman daha çok ifade etti ve etkiledi. Bunun yanında, bebekliğimden beri bedenimde taşıdığım görünür yaralarla büyürken, görünür olmamayı öğrendim. Görünmezce ve sessizce büyürken içinde bulunduğum hayatı dinleyen, gözleyen ve izleyen kaslarım herkesten farklı gelişince resim yapmak, yapamazsam ben olamayacağım bir parçam haline geliverdi.” <a className="statement-link" href={localHref("/about#hikayem",language)}>Devamını oku</a></p>}
      </section>

      <section className="series" aria-labelledby="series-title">
        <div className="series-heading">
          <p className="eyebrow">{en?homeEn.series:"Seriler"}</p>
          <div className="section-heading-row">
            <h2 className="section-title" id="series-title">{en?homeEn.meyhane:"MEYHANE SERİSİ"}</h2>
            <a className="section-link" href={localHref("/gallery#seriler",language,{series:"meyhane"})}>{en?homeEn.all:"Tümünü gör"} <ArrowRightIcon /></a>
          </div>
        </div>
        <MotionRegion kind="carousel" language={language}>
        <div className="series-marquee" aria-label="Meyhane Serisi eserleri">
          <div className="series-track">
            {[0, 1].map((set) => (
              <div className="series-set" key={set} aria-hidden={set === 1}>
                {meyhaneWorks.map(([file, title]) => (
                  <ResponsiveArtwork loading="lazy" decoding="async" key={`${set}-${file}`} src={`/art/${file}`} sizes="(max-width: 900px) 76vw, 32vw" alt={set === 0 ? title : ""} />
                ))}
              </div>
            ))}
          </div>
        </div>
        </MotionRegion>
        <div className="series-notes two-notes"><p>{en?homeEn.notes[0]:"Suluboya, mürekkep ve renkli kalemin iç içe geçtiği bu sayfalar, kâğıt üzerinde katmanlı bir görsel anlatı kurar."}</p><p>{en?homeEn.notes[1]:"Gündelik gözlemleri, yolculuk anlarını ve kişisel deneyimleri bir araya getiren her çalışma, dünyayla yeniden karşılaşma biçimime dönüşür."}</p></div>
      </section>

      <section className="exhibitions">
        <header className="exhibition-heading">
          <p className="exhibition-range">2006–2026</p>
          <div className="section-heading-row exhibition-title-row">
            <h2>{en?homeEn.exhibitions:"SERGİLER VE PROJELER"}</h2>
            <a className="section-link" href={localHref("/about#sergiler",language)}>{en?homeEn.all:"Tümünü gör"} <ArrowRightIcon /></a>
          </div>
        </header>
        <div className="exhibition-list">{(en?exhibitionsEn:exhibitionsTr).map(([year,title,details,location]) => <div className="exhibition-row" key={year + title}><span>{year}</span><span>{quotedExhibitionTitle(title)}</span><span>{details}</span><span>{location}</span></div>)}</div>
      </section>

      <section className="feminine">
        <div className="feminine-heading">
          <div className="feminine-kicker-row">
            <p className="eyebrow">{en?homeEn.themes:"Temalar"}</p>
            <a className="section-link" href={localHref("/gallery",language)}>{en?homeEn.all:"Tümünü gör"} <ArrowRightIcon /></a>
          </div>
          <h2 className="section-title">{en?homeEn.feminine:"FEMİNENİN ONURU"}</h2>
        </div>
        <div className="feminine-grid">
          <ResponsiveArtwork className="circular-artwork" loading="lazy" decoding="async" src="/art/hortlak-sana-dokundugum-yer.webp" sizes="(max-width: 900px) calc(100vw - 32px), 25vw" alt="Sana Dokunduğum Yer" />
          <ResponsiveArtwork loading="lazy" decoding="async" src="/art/hortlak-hayaletinin-tutundugu-yerde.webp" sizes="(max-width: 900px) 75vw, 25vw" alt="Hayaletinin Tutunduğu Yerde" />
          <ResponsiveArtwork className="circular-artwork" loading="lazy" decoding="async" src="/art/hortlak-isimsiz.webp" sizes="(max-width: 900px) calc(100vw - 32px), 25vw" alt="İsimsiz" />
          <ResponsiveArtwork loading="lazy" decoding="async" src="/art/hortlak-yersiz.webp" sizes="(max-width: 900px) 75vw, 25vw" alt="Yersiz" />
        </div>
        <div className="two-notes"><p>{en?homeEn.feminineNotes[0]:"Toplumsal ikili cinsiyet normlarında kadın, yerleşik olandır. Toprak Ana, Pacha de Mama, Gaia… Besler, kökleri korur, tohumu saklar."}</p><p>{en?homeEn.feminineNotes[1]:"Sevgili normlarımızın beklentilerini kendi şiirselliği içinde tatlı buluyorum. Rahim taşıyan, vajinalı ve memeli bir bedende olmanın potansiyellerini ve feminenin onurunu yolda, hareket hâlinde araştırıyorum."}</p></div>
      </section>

      <EditorialSection language={language} />

      <footer>
        <p className="footer-call">{en?homeEn.footer:"Bir sergi, proje ya da ortak üretim fikri için benimle iletişime geçin."}</p>
        <div className="footer-info"><a href="mailto:dilaraartspace@gmail.com">dilaraartspace@gmail.com</a><a href="https://www.google.com/maps/search/?api=1&amp;query=%C5%9Ei%C5%9Fli%2C%20%C4%B0stanbul" target="_blank" rel="noreferrer">{en?homeEn.location:"Şişli, İstanbul"}</a><a href="https://www.instagram.com/regresart/" target="_blank" rel="noreferrer">@regresart</a></div>
        <div className="footer-base"><span>{en?"Dilara Kizildag":"Dilara Kızıldağ"}</span><span>© 2026</span></div>
      </footer>
    </main>
  );
}
