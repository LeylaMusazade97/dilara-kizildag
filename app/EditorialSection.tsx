import ResponsiveArtwork from "./ResponsiveArtwork";
import type { Language } from "./language";

const editorialCards = [
  {
    title: "Bir Sergiden Günümüze Yansıyanlar",
    description: "Dilara Kızıldağ’ın da yer aldığı “Kağıt İşler” kolektif sergisi, depremzedelere destek amacıyla dört sanatçıyı bir araya getirdi. Sergiden elde edilen gelirin bir kısmı depremzedelere bağışlandı.",
    href: "https://oggito.com/icerikler/bir-sergiden-gunumuze-yansiyanlar/68047",
    image: "/art/press-bir-sergiden.webp",
    alt: "Dilara Kızıldağ'ın kuşlar ve figürlerle oluşturduğu çalışması",
    position: "center 34%",
  },
  {
    title: "Git Üstüne Bir Şey Giy!",
    description: "Dilara Kızıldağ, Günseli Baki’nin K2 Güncel Sanat Merkezi’ndeki sergisinin “Hatırlama” bölümünde otoportresi ve metniyle yer aldı. Sergi, kadın bedeni, toplumsal bakış ve dayanışma temalarını odağına aldı.",
    href: "https://www.saridenizalti.com/gitustunebirseygiy",
    image: "/art/press-git-ustune.webp",
    alt: "Bir sergi mekânında eserleri inceleyen ziyaretçiler",
    position: "center",
  },
  {
    title: "Hayal ve Hakikat: Amargi’nin 10 Yılı",
    description: "Dilara Kızıldağ, İstanbul Modern’de gerçekleşen söyleşide Amargi’nin on yıllık yolculuğunu; kadın hareketi, dayanışma ve değişen toplumsal gerçeklikler üzerinden diğer katılımcılarla birlikte ele aldı.",
    href: "https://www.istanbulmodern.org/basin-bultenleri/hayal-ve-hakikat-sanatci-konusmalari",
    image: "/art/press-hayal-hakikat.webp",
    alt: "Hayal ve Hakikat sanatçı konuşmalarını izleyen katılımcılar",
    position: "center",
  },
  {
    title: "Konuşma Zamanı",
    description: "İstanbul Toplumsal Cinsiyet Müzesi tarafından düzenlenen dijital sergi, sanatçıların toplumsal cinsiyet, hafıza ve deneyim üzerine kurdukları görsel anlatıları bir araya getiriyor.",
    href: "https://konusmazamani.com/sanatcilar/dilara-kizildag",
    image: "/art/press-konusma-zamani.webp",
    alt: "Konuşma Zamanı dijital sergisinde yer alan sanatçı portreleri",
    position: "center top",
  },
];
const editorialCardsEn = [
  {...editorialCards[0],title:"Reflections from an Exhibition",description:"The collective exhibition “Paper Works”, which included Dilara Kızıldağ, brought together four artists in support of earthquake survivors. Part of the proceeds was donated to those affected by the earthquake.",alt:"Dilara Kızıldağ’s work featuring birds and figures"},
  {...editorialCards[1],title:"Go Get Dressed!",description:"Dilara Kızıldağ took part in the “Remembering” section of Günseli Baki’s exhibition at K2 Contemporary Art Center with a self-portrait and text. The exhibition focused on the female body, the social gaze, and solidarity.",alt:"Visitors viewing works in an exhibition space"},
  {...editorialCards[2],title:"Dream and Reality: Ten Years of Amargi",description:"In a talk at Istanbul Modern, Dilara Kızıldağ joined other participants in reflecting on Amargi’s ten-year journey through the women’s movement, solidarity, and shifting social realities.",alt:"Audience at the Dream and Reality artist talks"},
  {...editorialCards[3],title:"Time to Talk",description:"Organized by the Istanbul Museum of Gender, this digital exhibition brings together artists’ visual narratives on gender, memory, and experience.",alt:"Artist portraits featured in the Time to Talk digital exhibition"},
];

function ExternalArrowIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M7 25 25 7M11 7h14v14" />
    </svg>
  );
}

export default function EditorialSection({ tone = "dark", language = "tr" }: { tone?: "dark" | "light"; language?: Language }) {
  const cards=language==="en"?editorialCardsEn:editorialCards;
  return (
    <section className={`editorial editorial--${tone}`} aria-labelledby={`editorial-title-${tone}`}>
      <header className="editorial-heading">
        <p>{language==="en"?"Media":"Medya"}</p>
        <h2 id={`editorial-title-${tone}`}>{language==="en"?"PRESS COVERAGE":"BASIN YANSIMALARI"}</h2>
      </header>
      <div className="editorial-grid">
        {cards.map((card) => (
          <a className="editorial-card" href={card.href} target="_blank" rel="noreferrer" key={card.title}>
            <div className="editorial-card-image">
              <ResponsiveArtwork loading="lazy" decoding="async" src={card.image} sizes="(max-width: 620px) calc(100vw - 68px), (max-width: 1100px) 50vw, 25vw" alt={card.alt} style={{ objectPosition: card.position }} />
            </div>
            <div className="editorial-card-copy">
              <h3>{card.title}</h3>
              <span className="editorial-card-arrow"><ExternalArrowIcon /></span>
              <p>{card.description}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
