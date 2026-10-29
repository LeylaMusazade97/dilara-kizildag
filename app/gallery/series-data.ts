export type AvailableSeries = "hortlak" | "defter" | "cam-alti" | "meyhane";
type Artwork = {
  src: string;
  title: string;
  background?: string;
  shape?: "round";
};
type SeriesContent = {
  label: string;
  labelEn: string;
  works: Artwork[];
  description?: string[];
  descriptionEn?: string[];
};

export const series: Record<AvailableSeries, SeriesContent> = {
  hortlak: {
    label: "Hortlak Şefkat İster",
    labelEn: "The Ghost Needs Compassion",
    works: [
      { src: "/art/hortlak-hayat-agaci.webp", title: "Hayat Ağacı Plasenta" },
      {
        src: "/art/hortlak-hayaletinin-tutundugu-yerde.webp",
        title: "Hayaletinin Tutunduğu Yerde",
      },
      {
        src: "/art/hortlak-sana-dokundugum-yer.webp",
        title: "Sana Dokunduğum Yer",
        shape: "round",
      },
      {
        src: "/art/hortlak-isimsiz.webp",
        title: "İsimsiz",
        shape: "round",
      },
      { src: "/art/hortlak-yersiz.webp", title: "Yersiz" },
      {
        src: "/art/hortlak-kendimle-koynumda.webp",
        title: "Kendimle Koynumda",
      },
      { src: "/art/hortlak-asli.webp", title: "Aslı" },
    ],
    description: [
      "“Usulüne göre gömülmeyen her şey hortlar.”",
      "Lacan",
      "Hortlak, yası tutulmamış deneyimleri, hakkıyla yapılmamış vedaları ve izlerini hâlâ taşıdığımız yaraları temsil eder. Geçmişimizin bir parçasıdır. Bir yerde, çoğu zaman bir evde bekler. Ancak hatırlandığı an, zamanını ve mekânını bırakır ve bakışlarını bize diker. Ona bakmamızı, şarkısını açık bir kalple dinlememizi ister.",
      "“Hortlak Şefkat İster” adlı resim serisiyle hatırlama, geri dönme, çağırma, yas tutma ve unutma biçimlerine odaklanıyorum. Hortlaklarımızı onurlandırmayı ve onlarla şefkatli bir göz teması kurmayı deniyor, aynı zamanda bu süreçte ortaya çıkabilecek benzersiz duyguları, engelleri ve olasılıkları kaydediyorum.",
      "Bu seri, 2015’ten bu yana üzerinde çalıştığım kâğıt işler ve bu kâğıt işlerden yola çıkılarak yeniden düzenlenmiş tuval üzeri yağlıboya eserlerden oluşmaktadır. Seri, ölüm ve hayatta kalma temalarını ele alan otobiyografik eser “Hatırlamadığınız Hortlaklar” ile başlıyor. Bu seriye birlikte bakma fikri beni çok heyecanlandırıyor.",
    ],
    descriptionEn: [
      "“Everything that is not properly buried returns as a ghost.”",
      "Lacan",
      "The ghost represents experiences that have not been mourned, farewells that were never properly made, and wounds whose traces we still carry. It is part of our past. It waits somewhere, often in a house. Yet the moment it is remembered, it leaves its own time and place and fixes its gaze upon us. It asks us to look at it and listen to its song with an open heart.",
      "Through the painting series “The Ghost Needs Compassion”, I focus on ways of remembering, returning, summoning, mourning, and forgetting. I try to honour our ghosts and meet their gaze with compassion, while recording the unique emotions, obstacles, and possibilities that may emerge through this process.",
      "This series consists of works on paper I have been developing since 2015, alongside oil paintings on canvas reworked from those pieces. The series begins with the autobiographical work “The Ghosts You Do Not Remember”, which explores themes of death and survival. The idea of looking at this series together excites me deeply.",
    ],
  },
  defter: {
    label: "Defterle Aramızda",
    labelEn: "Between the Notebook and Me",
    works: [
      {
        src: "/art/defter-asli-gibi.webp",
        title: "Aslı gibi",
        background: "#e8dfc6",
      },
      {
        src: "/art/defter-bazen-ben.webp",
        title: "Bazen ben",
        background: "#e5dcc2",
      },
      {
        src: "/art/defter-bir-ben-daha.webp",
        title: "Bir ben daha",
        background: "#e4dcc5",
      },
      {
        src: "/art/defter-bir-takim-benler.webp",
        title: "Bir takım “ben”ler",
        background: "#e5ddc3",
      },
      {
        src: "/art/defter-duydun-mu.webp",
        title: "Duydun mu?",
        background: "#eee4ca",
      },
      { src: "/art/defter-inan.webp", title: "İnan", background: "#e0dac2" },
      {
        src: "/art/defter-orada-duruyor-sustugum.webp",
        title: "Orada duruyor sustuğum",
        background: "#e8e0c8",
      },
      {
        src: "/art/defter-sesini-bul.webp",
        title: "Sesini bul",
        background: "#e7dec5",
      },
      { src: "/art/defter-ev.webp", title: "Ev", background: "#dfc8b2" },
    ],
    description: [
      "Defterlerim bu diyaloğun arşivi gibi. 2017’den beri tuttuğum bu defterlerde her sayfa bir zaman, bir yer, bir hâl… Anları saklamaktan çok, onlara tekrar dönmenin, onları yeniden yaşamanın mümkün olduğunu hatırlatıyor bana. Her çizim, bir yeniden karşılaşma. Defterde art arda sıralandıklarında başka, kendi başlarına başka şey anlatıyorlar. Her sayfayı bir şekilde bitirmeye çabalıyorum. Yarım kalmış, başlanıp vazgeçilmiş hiçbir sayfa kalmamalı diyorum. Böylece aylarca sırtımda taşıdığım bu defter gittikçe ağırlaşıyor, ağırlaştıkça birbirimize daha çok bağlanıyoruz. Ama elbette her defter bittiğinde bir veda sürecimiz ve yeni deftere başlama seremonimiz oluyor.",
      "Bu yolculuğu, Anadolu’nun hikâye anlatıcılarına benzetiyorum. Onlar da bir yerden bir yere gider, duraklarda hikâyeler toplar, sonra o hikâyeleri yeniden anlatırdı. Benim defterlerim de böyle duraklar gibi; her sayfa bir hikâye, her renk bir ses. Gördüklerimi, hissettiklerimi topluyor, sonra başka bir biçimde aktarıyorum.",
      "Anı durdurmak değil, onunla yeniden buluşmak istiyorum. Çünkü bakarken dönüştüğümü, çizerken yeniden kurulduğumu hissediyorum. İzleyiciye de bu dönüşümün kapısını aralamak istiyorum: kendi anına, kendi merakına, kendi hikâyesine geri dönmesi için.",
      "Defterlerimle kendi anlam dünyamı, evimi yolda kuruyorum.",
    ],
    descriptionEn: [
      "My notebooks are like an archive of this dialogue. In the journals I have kept since 2017, every page holds a time, a place, a state of being… Rather than preserving moments, they remind me that it is possible to return to and relive them. Every drawing is a renewed encounter. They tell one story when placed one after another in a notebook and another when viewed alone. I try to complete every page; no page should remain unfinished or abandoned. The notebook I carry on my back for months gradually grows heavier, and as it does, our bond becomes stronger. Yet every notebook ends with a farewell and a ritual of beginning a new one.",
      "I liken this journey to Anatolia’s storytellers. They too travelled from place to place, gathered stories at each stop, and retold them later. My notebooks are like those stopping points: every page is a story, every colour a voice. I collect what I see and feel, then convey it in another form.",
      "I make art not to stop a moment, but to meet it again. I feel myself changing as I look and rebuilding as I draw. I want to open that same door of transformation for the viewer, allowing them to return to their own moment, curiosity, and story.",
      "With my notebooks, I build my own world of meaning—my home—on the road.",
    ],
  },
  "cam-alti": {
    label: "Cam Altı",
    labelEn: "Reverse Glass",
    works: [
      { src: "/art/cam-alti-ejderha.webp", title: "Ejderha" },
      { src: "/art/cam-alti-minno.webp", title: "Ejderha ve Simurg" },
    ],
  },
  meyhane: {
    label: "Meyhane",
    labelEn: "“Meyhane” Series",
    works: [
      {
        src: "/art/gallery-meyhane-biz.webp",
        title: "Biz",
        background: "#efe5cf",
      },
      {
        src: "/art/gallery-meyhane-derinde.webp",
        title: "Derinde, uzakta, burda",
        background: "#e3dec5",
      },
      {
        src: "/art/gallery-meyhane-karsi-masa-a4.webp",
        title: "Karşı masa",
        background: "#e7e0c6",
      },
      {
        src: "/art/gallery-meyhane-karsi-masa-a5.webp",
        title: "Karşı masa",
        background: "#e3dbc1",
      },
      {
        src: "/art/gallery-meyhane-kokusu-var.webp",
        title: "Kokusu var",
        background: "#e8ddc4",
      },
      {
        src: "/art/gallery-meyhane-otoportre.webp",
        title: "Meyhaneli otoportre",
        background: "#e8e0c7",
      },
      {
        src: "/art/gallery-meyhane-meyve-tabagi.webp",
        title: "Meyve tabağı",
        background: "#e6dec5",
      },
      {
        src: "/art/gallery-meyhane-sofra-a5.webp",
        title: "Sofra",
        background: "#eae2c9",
      },
      {
        src: "/art/gallery-meyhane-sofra-a4.webp",
        title: "Sofra",
        background: "#eadbbe",
      },
      {
        src: "/art/gallery-meyhane-suda.webp",
        title: "Suda",
        background: "#f2e6ca",
      },
      {
        src: "/art/gallery-meyhane-dk027.webp",
        title: "İsimsiz",
        background: "#e4dbc5",
      },
    ],
    description: [
      "Bir meyhanede zaman başka türlü akar. Rakı yavaş yavaş içilir, meze acele edilmeden paylaşılır, muhabbet muhabbeti açtıkça konular ve bakışlar derinleşir.",
      "2016’dan beri meyhanelere defterimle gidiyorum. Bir masa seçiyor, kendi soframı kuruyor ve çiziyorum. Kâğıt üzerine suluboya ve kalemle çalışıyorum. Resimlerimle, zeytinyağının, rakının, mezelerin ve muhabbetin etrafında kurulan bu sofra kültürünün görsel hafızasını, oldukça kişisel ve samimi bir yerden oluşturuyorum. Müdavimlik müessesesi beni özellikle büyülüyor.",
      "Meyhane, benim kültürümde bir erkek mekânı olarak kodlanmış. Üniversite yıllarımın büyük kısmı annemin işlettiği meyhanede geçmiş olmasına rağmen, bir kadın olarak tek başına bir meyhaneye otururken hâlâ küçük bir gerilim yaşarım. Ama şuna güvenirim: meyhanelerde insanlar birbirlerine bakmazlar. Her masa kendi muhabbetine kapılır. Böylece görünmezleşirim ve kimsenin bakışının konusu olmadan işimi yaparım.",
      "Masaların birbirine uzaklığı, birinin diğerine doğru eğilişi, boşalan kadehler, bekleyen tabaklar, ışığın masa üzerinde dolaşması, bedenlerin birbirine yaklaşma biçimleri ve sohbetin görünmeyen hareketi defterimde yeni biçimler oluşturur. İnsanları tek tek portrelemekten çok, aralarındaki ilişkiyi ve masanın etrafında oluşan geçici dünyayı kaydederim.",
      "Meyhane kültürünün edebiyat ve sanat tarihinde de güçlü bir yeri var. Şairlerin, yazarların ve ressamların masaları yalnızca içki içilen değil; yazılan, çizilen, konuşulan ve birlikte düşünülen yerler olmuş. Ben bu geleneğe başka bir yerden, tek başına oturan bir kadın ressam olarak bakıyorum.",
      "Meyhane serisi Türkiye’de başladı ve hâlâ devam ediyor. Yunanistan, Lübnan ve başka coğrafyalarda da sürdürmek istiyorum. Bu coğrafyaların sofra ve sohbet kültürleri birbirine yakın ama aynı değil. Şu sorular beni heyecanlandırıyor: müdavimlik, bir aradalık ve yavaşlayan zaman, başka bir dilde nasıl kuruluyor, bana nasıl hissettiriyor? Bütün bunlar toplanınca defterim bana ne anlatacak?",
    ],
    descriptionEn: [
      "Time flows differently in a meyhane. Rakı is sipped slowly, meze is shared without haste, and as one conversation leads to another, subjects and perspectives deepen.",
      "Since 2016, I have been going to meyhanes with my notebook. I choose a table, lay my own spread, and draw. I work with watercolour and pen on paper. Through my paintings, I create a visual memory of this culture of the table, gathered around olive oil, rakı, meze, and conversation, from a deeply personal and intimate place. I am especially fascinated by the tradition of being a regular.",
      "In my culture, the meyhane is coded as a male space. Although I spent much of my university years in the meyhane my mother ran, I still feel a slight tension when I sit alone in one as a woman. But I trust in this: in meyhanes, people do not look at one another. Each table becomes absorbed in its own conversation. In this way, I become invisible and do my work without becoming the subject of anyone’s gaze.",
      "The distance between tables, the way one person leans towards another, glasses being emptied, waiting plates, light moving across the table, the ways bodies draw closer to one another, and the invisible movement of conversation create new forms in my notebook. Rather than making individual portraits of people, I record the relationships between them and the temporary world that forms around the table.",
      "Meyhane culture also has a strong place in the history of literature and art. The tables of poets, writers, and painters have been places not only for drinking, but also for writing, drawing, talking, and thinking together. I look at this tradition from another position, as a woman painter sitting alone.",
      "The “Meyhane” series began in Türkiye and is still ongoing. I would like to continue it in Greece, Lebanon, and other places too. Their cultures of the table and conversation are close to one another, but not the same. These questions excite me: how do being a regular, togetherness, and time slowing down take shape in another language, and how do they make me feel? When all of this comes together, what will my notebook tell me?",
    ],
  },
};

export const seriesOrder = Object.keys(series) as AvailableSeries[];

export const englishArtworkTitles: Record<string, string> = {
  "Hayat Ağacı Plasenta": "Tree of Life Placenta",
  "Hayaletinin Tutunduğu Yerde": "Where Your Ghost Holds On",
  "Sana Dokunduğum Yer": "Where I Touched You",
  İsimsiz: "Untitled",
  Yersiz: "Out of Place",
  "Kendimle Koynumda": "In My Bosom with Myself",
  Aslı: "Aslı",
  "Aslı gibi": "As It Is",
  "Bazen ben": "Sometimes Me",
  "Bir ben daha": "Another Me",
  "Bir takım “ben”ler": "A Set of Selves",
  "Duydun mu?": "Did You Hear?",
  İnan: "Believe",
  "Orada duruyor sustuğum": "What I Silenced Stands There",
  "Sesini bul": "Find Your Voice",
  Ev: "Home",
  Ejderha: "Dragon",
  "Ejderha ve Simurg": "Dragon and Simurgh",
  Biz: "Us",
  "Derinde, uzakta, burda": "Deep, Far Away, Here",
  "Karşı masa": "The Table Opposite",
  "Kokusu var": "It Has a Scent",
  "Meyhaneli otoportre": "Self-Portrait in a Meyhane",
  "Meyve tabağı": "Fruit Plate",
  Sofra: "The Table",
  Suda: "In Water",
};

// Existing per-artwork technique facts from gallery-wall.tsx; missing facts stay absent.
export const knownTechniques: Record<string, { tr: string; en: string }> = {
  "/art/hortlak-hayat-agaci.webp": {
    "tr": "Karışık teknik",
    "en": "Mixed media"
  },
  "/art/hortlak-hayaletinin-tutundugu-yerde.webp": {
    "tr": "Karışık teknik",
    "en": "Mixed media"
  },
  "/art/hortlak-sana-dokundugum-yer.webp": {
    "tr": "Karışık teknik",
    "en": "Mixed media"
  },
  "/art/hortlak-yersiz.webp": {
    "tr": "Karışık teknik",
    "en": "Mixed media"
  },
  "/art/hortlak-kendimle-koynumda.webp": {
    "tr": "Karışık teknik",
    "en": "Mixed media"
  },
  "/art/hortlak-isimsiz.webp": {
    "tr": "Karışık teknik",
    "en": "Mixed media"
  },
  "/art/cam-alti-minno.webp": {
    "tr": "Cam altı boyama tekniği",
    "en": "Reverse glass painting"
  },
  "/art/cam-alti-ejderha.webp": {
    "tr": "Cam altı boyama tekniği",
    "en": "Reverse glass painting"
  },
  "/art/defter-asli-gibi.webp": {
    "tr": "Kağıt üzerine karışık teknik",
    "en": "Mixed media on paper"
  },
  "/art/defter-bazen-ben.webp": {
    "tr": "Kağıt üzerine suluboya",
    "en": "Watercolour on paper"
  },
  "/art/defter-duydun-mu.webp": {
    "tr": "Kağıt üzerine suluboya ve artline kalem",
    "en": "Watercolour and fineliner on paper"
  },
  "/art/defter-inan.webp": {
    "tr": "Kağıt üzerine karışık teknik",
    "en": "Mixed media on paper"
  },
  "/art/defter-orada-duruyor-sustugum.webp": {
    "tr": "Kağıt üzerine artline kalem ve mürekkep",
    "en": "Fineliner and ink on paper"
  },
  "/art/defter-sesini-bul.webp": {
    "tr": "Kağıt üzerine mürekkep ve artline kalem",
    "en": "Ink and fineliner on paper"
  },
  "/art/gallery-meyhane-biz.webp": {
    "tr": "Kağıt üzerine karışık teknik",
    "en": "Mixed media on paper"
  },
  "/art/gallery-meyhane-derinde.webp": {
    "tr": "Kağıt üzerine suluboya",
    "en": "Watercolour on paper"
  },
  "/art/gallery-meyhane-karsi-masa-a4.webp": {
    "tr": "Kağıt üzerine suluboya",
    "en": "Watercolour on paper"
  },
  "/art/gallery-meyhane-kokusu-var.webp": {
    "tr": "Kağıt üzerine suluboya ve artline kalem",
    "en": "Watercolour and fineliner on paper"
  },
  "/art/gallery-meyhane-otoportre.webp": {
    "tr": "Kağıt üzerine suluboya ve artline kalem",
    "en": "Watercolour and fineliner on paper"
  },
  "/art/gallery-meyhane-sofra-a4.webp": {
    "tr": "Kağıt üzerine suluboya ve artline kalem",
    "en": "Watercolour and fineliner on paper"
  }
};
