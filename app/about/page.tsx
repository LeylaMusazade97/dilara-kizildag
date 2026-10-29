import EditorialSection from "../EditorialSection";
import ResponsiveArtwork from "../ResponsiveArtwork";
import { LanguageSwitcher, languageFrom, localHref, type PageSearchParams } from "../language";
import { pageMetadata } from "../seo";

export async function generateMetadata({ searchParams }: { searchParams: PageSearchParams }) {
  return pageMetadata("/about", languageFrom((await searchParams).lang));
}

function ExternalArrowIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M7 25 25 7M11 7h14v14" />
    </svg>
  );
}

const exhibitions = [
  ["2026", "Reclaim Collective", "Karma Sergi · 48 Stunden Neukölln Fest", "Berlin, Almanya"],
  ["2026", "Kadın Zamanı", "Karma Sergi · SAYE Kolektif", "Beyoğlu, İstanbul"],
  ["2025", "Sana Dokunduğum Yer", "Solo Sergi · Barba Art Space", "Beyoğlu, İstanbul"],
  ["2025", "İAAF – İstanbul Sanat ve Antika Fuarı", "Karma Sergi · Lütfi Kırdar Kongre Merkezi", "İstanbul"],
  ["2024", "Olipa Kerran", "Karma Sergi · Weekend Gallery · Dilara Kızıldağ, Semra Türkmen, Kenan Türkmen ve Eda Azak", "Helsinki, Finlandiya"],
  ["2024", "Evvel Zaman İçinde", "Dual Sergi · Mantra · Eda Azak ve Dilara Kızıldağ", "İstanbul"],
  ["2023", "43", "Solo Sergi · Mantra", "İstanbul"],
  ["2023", "Kağıt İşler", "Karma Sergi · Peripetia", "İstanbul", "https://oggito.com/icerikler/bir-sergiden-gunumuze-yansiyanlar/68047"],
  ["2022", "Konuşma Zamanı", "Dijital Sergi · İstanbul Toplumsal Cinsiyet Müzesi", "İstanbul", "https://konusmazamani.com/sanatcilar/dilara-kizildag"],
  ["2021", "Karma Sergi", "Galeri La Visione", "İstanbul"],
  ["2020", "Açık Stüdyo Günleri", "Görsel Diyalog Sergisi · Şehlem Kaçar · Şiddetsizlik Eğitim ve Araştırma Merkezi", "İstanbul"],
  ["2020", "Git Üstüne Bir Şey Giy", "Fotoğraf projesi · Günseli Baki · K2 Güncel Sanat Merkezi", "İzmir", "https://www.saridenizalti.com/gitustunebirseygiy"],
  ["2019", "Açık Stüdyo Günleri", "Ortak çalışma · Şehlem Kaçar ve Meryem Güldürdak · Şiddetsizlik Eğitim ve Araştırma Merkezi", "İstanbul"],
  ["2019", "Kazdağları Dayanışması Nöbet Yeri", "Karma Resim Sergisi", "Çanakkale"],
  ["2018", "Çağrışımlar", "72 Kadından Fotoğraflar Sergisi · Mecra Salonu", "Kadıköy, İstanbul"],
  ["2015", "Latent", "Sanatta Görünürlük Festivali · Kluge Kolektifi · Performans · Tophane-i Amire", "İstanbul", "https://klugekolektif.wordpress.com/"],
  ["2013", "Sanatın Eylemi / Kürtaj Haktır", "Video art, fotoğraf ve kolektif görsel üretimler", "İstanbul"],
  ["2013", "Su Damlası", "Fotoroman projesi · Cezayir Sergi Salonu · Küratörlük", "İstanbul"],
  ["2009", "Haksız Tahrik", "Feminist Sergi · Hafriyat Karaköy · Enstalasyon ve performans", "İstanbul"],
  ["2008", "1. Baskı Resim Bienali – Dönüş", "Serigrafi · İMOGA Müzesi", "İstanbul"],
  ["2006", "67. Devlet Resim ve Heykel Yarışması", "“Kargalar” · Linol baskı", "Ankara"],
] as const;

const exhibitionsEn = [
  ["2026","Reclaim Collective","48 Stunden Neukölln Festival · Group Exhibition","Berlin, Germany"],
  ["2026","Kadın Zamanı","SAYE Collective · Group Exhibition","Beyoğlu, Istanbul"],
  ["2025","Sana Dokunduğum Yer","Solo Exhibition · Barba Art Space","Beyoğlu, Istanbul"],
  ["2025","İAAF – İstanbul Sanat ve Antika Fuarı","Group Exhibition · Lütfi Kırdar Congress Center","Istanbul"],
  ["2024","Olipa Kerran","Dilara Kizildag, Semra Türkmen, Kenan Türkmen and Eda Azak · Group Exhibition · Weekend Gallery","Helsinki, Finland"],
  ["2024","Evvel Zaman İçinde","Eda Azak and Dilara Kizildag · Two-Person Exhibition · Mantra","Istanbul"],
  ["2023","43","Solo Exhibition · Mantra","Istanbul"],
  ["2023","Kağıt İşler","Group Exhibition · Peripetia","Istanbul","https://oggito.com/icerikler/bir-sergiden-gunumuze-yansiyanlar/68047"],
  ["2022","Konuşma Zamanı","Digital exhibition organized by the Istanbul Museum of Gender","Istanbul","https://konusmazamani.com/sanatcilar/dilara-kizildag"],
  ["2021","Group Exhibition","Galeri La Visione","Istanbul"],
  ["2020","Açık Stüdyo Günleri","Visual Dialogue Exhibition with Şehlem Kaçar · Center for Nonviolent Education and Research","Istanbul"],
  ["2020","Git Üstüne Bir Şey Giy","Exhibition as part of Günseli Baki’s photography project · K2 Contemporary Art Center","Izmir","https://www.saridenizalti.com/gitustunebirseygiy"],
  ["2019","Açık Stüdyo Günleri","Collaborative work with Şehlem Kaçar and Meryem Güldürdak · Center for Nonviolent Education and Research","Istanbul"],
  ["2019","Kazdağları Dayanışması Nöbet Yeri","Group Painting Exhibition","Çanakkale"],
  ["2018","Çağrışımlar","Photographs by 72 Women · Mecra Hall","Kadıköy, Istanbul"],
  ["2015","Latent","Visibility in Art Festival · Kluge Collective · Performance · Tophane-i Amire","Istanbul","https://klugekolektif.wordpress.com/"],
  ["2013","Sanatın Eylemi / Kürtaj Haktır","Video art, photography, and collective visual works · Various venues","Istanbul"],
  ["2013","Su Damlası","Photo-novel project based on a tale by Pınar Selek · Cezayir Exhibition Hall · Curator","Istanbul"],
  ["2009","Haksız Tahrik","Feminist Exhibition · Vajina Kapı installation and performance with Hatice Telci · Hafriyat Karaköy","Istanbul"],
  ["2008","1. Baskı Resim Bienali – Dönüş","Screen-printing work · İMOGA Museum","Istanbul"],
  ["2006","67. Devlet Resim ve Heykel Yarışması","Kargalar · Linocut print","Ankara"],
] as const;

const exhibitionTypes = new Set(["Karma Sergi", "Group Exhibition"]);
const displayExhibitionTitle = (title: string) => exhibitionTypes.has(title) ? title : `“${title}”`;

const storyTr=[
  "Neredeyse yirmili yaşlarıma kadar sözcüklerle samimi bir bağ kuramadım. Görsellik, kendimi çok daha iyi ifade edebilmemin kapılarını açtı bana. Bebekliğimden beri bedenimde taşıdığım görünür yaralarla büyürken, görünmez olmayı öğrendim. Sözcüklerle aramızdaki mesafeyle geçen ve görülmekten kaçındığım o yıllarda, yine de herkes gibi gördüklerimi anlatmaya ihtiyacım vardı. İçinde bulunduğum hayatı dinleyen, gözleyen ve izleyen kaslarım herkesten farklı gelişince resim yapmak, yapamazsam ben olamayacağım bir parçam hâline geliverdi.",
  "Kadın bedeninin yerleşik, koruyan ve besleyen olarak tarif edildiği dünyada kimliğimin sınırlarını yokluyor; bedenin başka bir ihtimalini yolda ve hareket hâlinde araştırıyorum. Kamusal alanda görünmezlik zırhımı kuşanarak kendime güvenli bir yer seçiyor, bulunduğum anı çiziyorum. Çizerken hem içeriden hem dışarıdan bakıyorum. Anlar genişlemeye, zaman farklı akmaya başlıyor. Bedenim, bakılan bir nesne olmaktan çıkıp bulunduğu yeri dinleyen ve yeniden kuran bir araca dönüşüyor.",
  "Çalışmalarım çocuksu bir merak ve gözlemle başlıyor. Baktığım yeri kaydediyor, sonra onu yeniden anlatmanın yollarını arıyorum. Yolculuklarımdan hikâyeler topluyor, onları kâğıt üzerinde dönüştürerek kendi görsel arşivimi oluşturuyorum. Mümkün olduğunca samimi ve kişisel bir yerden. Bu yönüyle işlerim, Anadolu’nun sözlü anlatı geleneğinden de besleniyor: nasıl her hikâye anlatıldıkça değişiyorsa, gördüğüm her şey de çizdikçe dönüşüyor.",
  "2017’den beri tuttuğum sanatçı günlükleri uzun zamandır bu sürecin merkezinde. Her sayfa bir zaman, bir yer, bir hâl. Anlar arşivi; onlara tekrar dönmenin, her seferinde başka bir andan bakmanın olanaklarını yokluyor. Bu defterlerde anları sabitlemekten çok, onlara yeniden bakmanın yollarını arıyorum. Çünkü bakarken değişiyorum; çizerken yeniden kuruyorum. İzleyiciye de kendi anına, kendi merakına, kendi hikâyesine geri dönmesi için bir alan açmak istiyorum.",
  "Defterler aylarca sırtımda taşıdığım yol arkadaşlarına dönüşüyor. Yüküm ağırlaştıkça defterle aramızdaki bağ da güçleniyor, böylece defter bittiğinde onunla vedalaşmak da bir süre alıyor. Doğu anlatı geleneğinde olduğu gibi, kendimi yeni bir defterle yine başladığım yerde buluyorum."
];
const storyEn=[
  "Until I was almost twenty, I could not form an intimate bond with words. Visual expression opened doors for me to express myself far more fully. Growing up with visible wounds I had carried on my body since infancy, I learned to become invisible. In those years of distance between words and myself, when I avoided being seen, I still needed, like everyone else, to tell of what I saw. As the muscles with which I listened to, observed, and watched the life around me developed differently from those of others, painting became a part of me without which I could not be myself.",
  "In a world where the female body is defined as settled, protective, and nurturing, I test the boundaries of my identity, exploring another possibility for the body on the road and in motion. In public space, I put on my armour of invisibility, choose a safe place for myself, and draw the moment I inhabit. As I draw, I look both from within and from the outside. Moments begin to expand, and time begins to flow differently. My body ceases to be an object to be looked at and becomes an instrument that listens to and reconstructs the place it occupies.",
  "My work begins with a childlike curiosity and observation. I record what lies before me, then look for ways to tell it anew. I gather stories on my journeys and transform them on paper, building my own visual archive. From as sincere and personal a place as possible. In this sense, my work also draws nourishment from Anatolia’s oral storytelling tradition: just as every story changes each time it is told, everything I see is transformed as I draw.",
  "The artist’s journals I have kept since 2017 have long been at the heart of this process. Each page holds a time, a place, a state of being. An archive of moments, exploring the possibilities of returning to them, of looking each time from another moment. Rather than fixing moments in these notebooks, I look for ways to see them anew. Because I change as I look; I reconstruct as I draw. I want to open a space for viewers to return to their own moment, their own curiosity, their own story.",
  "My notebooks become travelling companions that I carry on my back for months. As my load grows heavier, the bond between the notebook and me grows stronger, so that when a notebook comes to an end, saying goodbye takes time too. As in the storytelling traditions of the East, I find myself back where I began, with a new notebook."
];

export default async function AboutPage({searchParams}:{searchParams:PageSearchParams}) {
  const language=languageFrom((await searchParams).lang); const en=language==="en";
  const aboutTr=[<><strong>İstanbul’da yaşayan bir sanatçı ve sanat eğitimcisi.</strong> <strong>Marmara Üniversitesi Güzel Sanatlar Eğitimi Bölümü Özgün Baskı Ana Sanat Dalı 2007 yılı mezunu.</strong> 2006 yılından bu yana farklı disiplinlerde üretimlerini sürdürüyor. Çalışmaları, İstanbul başta olmak üzere Türkiye’nin farklı şehirlerinde; yurt dışında ise <strong>Helsinki ve Berlin’de</strong> sergilendi. Sanatçı, kişisel sergilerin yanı sıra karma sergiler, sanat fuarları ve çeşitli kolektif projelerde de yer aldı.</>,<><strong>Feminist, ekolojist ve antimilitarist</strong> bir perspektifle çalışan Kızıldağ; doğayla, kentle, yolculuklarla ve farklı yaşam biçimleriyle kurduğu ilişkiyi üretiminin önemli kaynaklarından biri olarak görür. Kuş gözlemciliği ve solo yolculuklar sanat pratiğini besleyen deneyim alanları arasında yer alır. 2017 yılında on ay boyunca Latin Amerika’da tek başına seyahat etmiş, yolculuk boyunca üretmeyi sürdürmüştür.</>,<>Kızıldağ’ın çalışmaları, kişisel deneyim ile ortak belleğin, gündelik hayat ile doğanın ve bireysel hafıza ile yaşanılan coğrafyanın birbirine değdiği alanlarda şekillenir. Farklı malzeme ve anlatım biçimlerini deneyerek görsel ifade olanaklarını araştırmayı ve kişisel deneyimlerin taşıdığı hikâyeleri görünür kılmayı sürdürmektedir.</>];
  const aboutEn=[<>Dilara Kizildag is an artist and art educator based in Istanbul. <strong>She graduated from Marmara University, Department of Fine Arts Education, Major in Printmaking, in 2007.</strong> Since 2006, she has continued to work across different disciplines. Her work has been exhibited in Istanbul and various cities across Türkiye, as well as internationally in <strong>Helsinki and Berlin</strong>. Alongside solo exhibitions, Kizildag has participated in group exhibitions, art fairs, and various collective projects.</>,<>Working from a <strong>feminist, ecologist, and anti-militarist</strong> perspective, Kizildag considers her relationship with nature, the city, travel, and different ways of living to be among the key sources of her practice. Birdwatching and solo travel are also important fields of experience that inform her artistic work. In 2017, she travelled alone through Latin America for ten months, continuing to make work throughout the journey.</>,<>Kizildag’s practice takes shape at the points where personal experience meets collective memory, everyday life intersects with nature, and individual memory encounters the geography in which one lives. Through experimenting with different materials and forms of expression, she continues to explore the possibilities of visual language and to make visible the stories carried by personal experience.</>];
  return (
    <main className="about-page" id="main-content" lang={language}>
      <section className="about-intro" aria-labelledby="about-title">
        <nav className="about-nav" aria-label="Ana navigasyon">
          <LanguageSwitcher language={language} path="/about" /><a href={localHref("/",language)}>{en?"Home":"Ana Sayfa"}</a><a href={localHref("/gallery",language)}>{en?"Gallery":"Galeri"}</a><a href={localHref("/about",language)} aria-current="page">{en?"About":"Hakkında"}</a>
        <a href="https://asilyolculukgeridonmek.wordpress.com/" target="_blank" rel="noopener noreferrer">Blog</a></nav>

        <div className="about-layout">
          <p className="about-section-label">{en?"Biography":"Biyografi"}</p>
          <article className="about-biography">
            <h1 id="about-title">{en?"DILARA KIZILDAG":"DİLARA KIZILDAĞ"}</h1>
            <div className="about-copy">{(en?aboutEn:aboutTr).map((p,i)=><p key={i}>{p}</p>)}</div>
          </article>

          <figure className="about-portrait">
            <ResponsiveArtwork src="/art/dilara-about-portrait.webp" sizes="(max-width: 900px) calc(100vw - 32px), 28vw" alt={en?"Artist Dilara Kizildag writing in her notebook":"Ressam Dilara Kızıldağ defterine yazarken"} fetchPriority="high" />
          </figure>
        </div>
      </section>

      <figure className="about-feature-image">
        <ResponsiveArtwork
          src="/art/dilara-performance.webp"
          sizes="(max-width: 900px) calc(100vw - 32px), calc(100vw - 136px)"
          alt={en?"A black-and-white work bringing together different movements by Dilara Kizildag in nature":"Dilara Kızıldağ’ın doğada farklı hareketlerini bir araya getiren siyah beyaz çalışma"}
          loading="lazy"
          decoding="async"
        />
      </figure>

      <section className="about-story" id="hikayem" aria-labelledby="about-story-title">
        <div className="about-story-layout">
          <div className="about-story-content">
            <h2 id="about-story-title">{en?"MY STORY":"HİKÂYEM"}</h2>
            <div className="about-story-copy">{(en?storyEn:storyTr).map(p=><p key={p}>{p}</p>)}<p>{en?"I fill my artist’s journals on my travels.":"Sanatçı günlüklerimi yolculuklarda dolduruyorum."}<br /><strong>{en?"I make my home on the road.":"Evimi yolda yapıyorum."}</strong></p></div>
          </div>
        </div>
      </section>

      <section className="about-exhibitions" id="sergiler" aria-labelledby="about-exhibitions-title">
        <div className="about-exhibitions-layout">
          <p className="about-section-label">2006–2026</p>

          <div className="about-exhibitions-content">
            <header className="about-exhibitions-heading">
              <h2 id="about-exhibitions-title">{en?"EXHIBITIONS AND PROJECTS":"SERGİLER VE PROJELER"}</h2>
            </header>

            <div className="about-exhibitions-list">
              {(en?exhibitionsEn:exhibitions).map(([year, title, details, location, href]) => (
                <div className="about-exhibition-row" key={`${year}-${title}`}>
                  <span>{year}</span>
                  <span><cite>{displayExhibitionTitle(title)}</cite></span>
                  <span>{details}</span>
                  <span className="about-exhibition-location">
                    {location}
                    {href && (
                      <a className="about-exhibition-arrow" href={href} target="_blank" rel="noreferrer" aria-label={en?`Open the page about ${title}`:`${title} hakkında sayfayı aç`}>
                        <ExternalArrowIcon />
                      </a>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <EditorialSection tone="light" language={language} />

      <footer>
        <p className="footer-call">{en?"For an exhibition, project, or collaborative idea, please get in touch.":"Bir sergi, proje ya da ortak üretim fikri için benimle iletişime geçin."}</p>
        <div className="footer-info">
          <a href="mailto:dilaraartspace@gmail.com">dilaraartspace@gmail.com</a>
          <a href="https://www.google.com/maps/search/?api=1&amp;query=%C5%9Ei%C5%9Fli%2C%20%C4%B0stanbul" target="_blank" rel="noreferrer">{en?"Şişli, Istanbul":"Şişli, İstanbul"}</a>
          <a href="https://www.instagram.com/regresart/" target="_blank" rel="noreferrer">@regresart</a>
        </div>
        <div className="footer-base"><span>{en?"Dilara Kizildag":"Dilara Kızıldağ"}</span><span>© 2026</span></div>
      </footer>
    </main>
  );
}
