import { useState, useEffect } from "react";

// ─── APP ICON SVG ───────────────────────────────────────────────────────────
function AppIcon({ size = 80, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={style}>
      <defs>
        <linearGradient id="iconBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2d1250" />
          <stop offset="100%" stopColor="#4a1078" />
        </linearGradient>
        <linearGradient id="letterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#f472b6" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Background rounded rect */}
      <rect width="100" height="100" rx="22" fill="url(#iconBg)" />
      {/* Subtle inner glow ring */}
      <rect width="100" height="100" rx="22" fill="none" stroke="rgba(192,132,252,0.3)" strokeWidth="1.5" />
      {/* Decorative small stars */}
      <circle cx="18" cy="20" r="1.2" fill="rgba(192,132,252,0.5)" />
      <circle cx="82" cy="78" r="1.5" fill="rgba(244,114,182,0.5)" />
      <circle cx="78" cy="22" r="1" fill="rgba(192,132,252,0.4)" />
      {/* Q letter */}
      <text
        x="28" y="66"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="58"
        fontWeight="600"
        fontStyle="italic"
        fill="url(#letterGrad)"
        filter="url(#glow)"
      >Q</text>
      {/* O letter — overlapping, offset */}
      <text
        x="46" y="72"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="46"
        fontWeight="300"
        fontStyle="italic"
        fill="url(#letterGrad)"
        opacity="0.92"
        filter="url(#glow)"
      >O</text>
      {/* Connecting flourish line */}
      <path
        d="M 52 42 Q 62 36 68 44"
        stroke="url(#letterGrad)" strokeWidth="1.2"
        fill="none" strokeLinecap="round" opacity="0.7"
      />
    </svg>
  );
}

// ─── DATA ───────────────────────────────────────────────────────────────────
const TAG_COLORS = ["#c084fc","#f472b6","#fb923c","#34d399","#60a5fa","#a78bfa","#f87171"];
function getTagColor(tag) {
  let h = 0;
  for (let c of tag) h = (h * 31 + c.charCodeAt(0)) % TAG_COLORS.length;
  return TAG_COLORS[h];
}

// ─── DEFAULT POEMS ───────────────────────────────────────────────────────────
const defaultPoems = [
  {
    id: 1,
    title: "Mohinurim",
    content: "Yorug'dir zimiston tun,\nSen yonimda bor bo'lsang.\nSen bilan baxtim butun,\nBaxtiyorman sen kulsang.\n\n   Shirintoyim Mohinur,\n   Erkatoyim Mohinur,\n   Bu dunyoda men uchun\n   Nurli oyim Mohinur.\n\nJannat bog'idan tushgan\nTotli mevam o'zingsan.\nQirg'oqdan to'lib toshgan\nQuvnoq jilg'am o'zingsan.\n\n   Sho'x-shodonim Mohinur,\n   Bilimdonim Mohinur,\n   Yig'laganni yupatar\n   Mehribonim Mohinur.\n\nQora munchoq ko'zlaring -\nQuvonchi yuragimning.\nAsaldayin so'zlaring -\nRo'yobi tilagimning.\n\n   Qorako'zim Mohinur,\n   Shirinso'zim Mohinur.\n   Bor mehrimni sen uchun\n   Beray o'zim, Mohinur.\n\nSeni bag'rimga olsam,\nMehr chanqog'im bosilar.\nBir bora o'pib qo'ysam,\nO'ksik ko'nglim yozilar.\n\n   Qo'g'irchog'im Mohinur,\n   Ovunchog'im Mohinur.\n   Allohim in'om etgan\n   Mehr bulog'im Mohinur!\n\nFevral, 2017-yil.\nDilorom Yusupova",
    tags: ["farzand", "sevgi", "qiz"],
    date: "2017-02-01",
  },
  {
    id: 2,
    title: "Muhammadjonim",
    content: "Shirintoy bolajonim,\nQosh-kiprigi kamonim,\nMittiginam, polvonim,\nBolim, Muhammadjonim.\n\nSen bor-yo'g'im, bisotim,\nMazmunisan hayotim,\nAsalimsan, novvotim,\nJonim, Muhammadjonim.\n\nAlloh ne'mati turfa,\nYurakchang urib tursa-\nMen uchun shirin tuhfa!\nHadyam Muhammadjonim.\n\nDoim bag'rimni to'ldir,\nDard-g'amlarimni o'ldir,\nJannatda nur-toj qo'ndir,\nO'g'lim Muhammadjonim.\n\nMunosib bo'l ismingga,\nNafsingni sol izmingga,\nIlohim, kirgin mingga,\nBolam Muhammadjonim.\n\nAllohga chin qul bo'lgin,\nFarz ado etsang, kulgin!\nSunnatga amal qilgin,\nMo'min Muhammadjonim.\n\nNamozlarga bo'l polvon,\nMasjidlarda bo'l imom,\nYosh-qariga ber salom,\nSolih Muhammadjonim.\n\nBo'lgin hofizi Qur'on,\nHadislar o'rgan har on,\nBarchaga bo'l mehribon,\nOlim Muhammadjonim.\n\nBukilma sinovlardan,\nShaytondan, qurshovlardan,\nKibrlanma maqtovlardan,\nOqil Muhammadjonim.\n\nBo'lgin sen adolatli,\nNomusli, oriyatli,\nDoim mas'uliyatli,\nOdil Muhammadjonim.\n\nO'zbegimga o'g'lon bo'l,\nOilangga qalqon bo'l.\nDoimo sog'-omon bo'l,\nO'g'lon Muhammadjonim!\n\nNoyabr, 2019-yil.\nDilorom Yusupova",
    tags: ["farzand", "sevgi", "o'g'il", "duo"],
    date: "2019-11-01",
  },
  {
    id: 3,
    title: "Mustafo",
    content: "Mustafo, Mustafo,\nBolajonim Mustafo,\nKichkintoyim Mustafo,\nYoqimtoyim Mustafo.\nKo'z quvonchim ko'zlaring,\nQuvonchisan yuragim.\nYorug' bo'lsin yo'llaring,\nAllohimdan tilagim.\n\n\nMustafo, Mustafo,\nMo'min bolam Mustafo,\nOlim bolam Mustafo,\nQori bolam Mustafo.\nAllohim bergan ne'mat,\nUndan menga omonat.\nJajji qo'llaring menga\nTalpingani - shirin baxt.\n\n\nMustafo, Mustafo,\nSaxiy bolam Mustafo,\nPolvon bolam Mustafo,\nMard o'g'lonim Mustafo.\nRasulimga sen ummat,\nAmaling bo'lsin sunnat.\nSenga, bolam, abadiy\nHamroh bo'lsin saodat.\n\nAvgust, 2025-yil.\nDilorom Yusupova",
    tags: ["farzand", "sevgi", "o'g'il", "duo"],
    date: "2025-08-01",
  },
  {
    id: 4,
    title: "Ma'rifatni topmoq bir orzu...",
    content: "Ma'rifatni topmoq bir orzu,\nIzlash yo'li ko'p og'ir ekan.\nYurak-bag'ring tirnab o'tar u -\nAsli malham sen ko'rgan tikan...\n\nYo'l uzundek ko'rinar goho,\nUnda xorlik, unda mashaqqat:\nYiqilganing - topganing shifo,\nKo'rinsa-da ko'zga beshafqat.\n\nOrif bo'lish bo'lmaydi oson,\nYugurganing turganing kabi.\nAmalingga suyanganing on,\nSeni kutar keng jarlik tubi...\n\nSenga zarur birgina rajo,\nUndan o'zga davo yo'q asli.\nHar niyating keltirgan bajo\nXavf qilishga arziydi rosti.\n\nMa'rifatni topmoq bir orzu,\nUnda turfa to'siq bo'lar ham..\nIxlos bersa, bas, yo'qdir qayg'u -\nLatifimdan bebaho tuhfam...\n\n07.04.2024.\nDilorom Yusupova",
    tags: ["ma'rifat", "falsafa", "ixlos"],
    date: "2024-04-07",
  },
  {
    id: 5,
    title: "Bid'atlarga qoldi kunimiz...",
    content: "Shiddat bilan o'tar umrimiz,\nSavoblarsiz kunu tunimiz.\nGunoh ko'pu, yo'qdir uzrimiz,\nBid'atlarga qoldi kunimiz.\n\nKo'z tegishidan gumon qilib,\nQo'ydik shiftga isiriq ilib.\nOlsak edi «Chorqul»ni bilib,\nBid'atlarga qoldi kunimiz...\n\nKo'zmunchoqlar o'zi hayrondir:\n«Ko'zdan saqlashimiz yolg'ondir».\nQori bo'lgan ko'zdan omondir!\nBid'atlarga qoldi kunimiz...\n\nDaraxtlarga bog'lar lattalar,\nShirk keltirib yoshu-kattalar,\nBenamozlar, aqli kaltalar!\nBid'atlarga qoldi kunimiz...\n\nXoliq qolib maxluqdan so'rar,\nKelajagin folbinda ko'rar...\nIymonini kafanga o'rar!\nBid'atlarga qoldi kunimiz!\n\nShak-shubhasiz oxirgi zamon:\nZiyoratgoh bo'ldi shirk-maydon!\nZinalarni o'pibdi nodon...\nBid'atlarga qoldi  kunimiz...\n\nBu ishlardan bittasi mamnun,\nSen xor bo'lsang, bo'lmaydi mahzun!\nU - shaytondir, dushmaning mal'un.\nBid'atlarga qoldi kunimiz...\n\nRobbing qilgan sen uchun hitob,\nJavoningda turibdi Kitob,\nO'qi, tegar bag'ringga oftob!\nBid'atlarga qoldi  kunimiz...\n\nBerilganimizdek bid'atga,\nAmal qilsak edi sunnatga,\nBotmas edik tashvish, g'urbatga,\nBid'atlarga qoldi  kunimiz...\n\nHayotimiz qisqa yo uzun,\nVafot etsak erta yo bugun,\nNima qildik Oxirat uchun?!\nBid'atlarga qoldi kunimiz...\n\nGar umiding bo'lsa Jannatdan,\nFoydalangin imkoniyatdan,\nUyg'on, inson, endi g'aflatdan,\nBid'atlarga qoldi kunimiz!..\n\nOktyabr, 2019-yil.\nDilorom Yusupova",
    tags: ["din", "nasihat", "bid'at"],
    date: "2019-10-01",
  },
  {
    id: 6,
    title: "Yorim, turing, o'qiylik namoz...",
    content: "Har kun ayting: joynamozni yoz,\nAllohimga aytaylik dil roz.\nShunda ishlarimiz bo'lar soz,\nYorim, turing, o'qiylik namoz.\n\nTinglang, yangramoqdadir AZON,\nBenamozning qadri ham arzon,\nUmr o'tar, bo'lmasdan xazon,\nYorim, turing, o'qiylik namoz.\n\nTutqichimiz bermay g'aflatga,\nUlgurib qolaylik BAMDODga.\nBoylik teng kelolmas sunnatga,\nYorim, turing, o'qiylik namoz.\n\nYechaylik ko'ngildan kishanni,\nVaqtida ado etib PEShINni.\nRobbim oson qilsin ishimni,\nYorim, turing, o'qiylik namoz.\n\nNamozni unutmang ishda ham,\nO'qing ASR yozu qishda ham,\nTetik bo'ling yuz, yetmishda ham,\nYorim, turing, o'qiylik namoz.\n\nShOMni ortga surgan bebaxtdir,\nMeva-yu soyasiz daraxtdir,\nYuragi qulf, qalbi karaxtdir.\nYorim, turing, o'qiylik namoz.\n\nDilni yorishtiradi XUFTON,\nHatto zulmatni etar u tong,\nKuyib, kul bo'lsin mal'un shayton,\nYorim, turing, o'qiylik namoz.\n\nBeradi nur TAHAJJUDingiz,\nLazzatlanadi vujudingiz,\nHaqqa eltar har sujudingiz,\nYorim, turing, o'qiylik namoz.\n\nYo'llaylik salovat-u zikrlar,\nRohmanur-Rohiymga shukrlar,\nKunni yakunlaylik VITRla,\nYorim, turing, o'qiylik namoz.\n\nIbodatda to'kilur gunoh,\nNamozingizga bo'lay guvoh.\nIkki dunyo baxt bersin Alloh!\nYorim, turing, o'qiylik namoz...\n\nNoyabr, 2019-yil.\nDilorom Yusupova",
    tags: ["din", "namoz", "nasihat"],
    date: "2019-11-01",
  },
  {
    id: 7,
    title: "Volidamning qalbini tirnama qayg'u",
    content: "Volidamning qalbini tirnama qayg'u,\nMehribonim ko'zlarida ko'rmayin ko'zyosh!\nOnajon, bilmadim bu qandayin tuyg'u,\nG'amim arir tizzangizga qo'yganimda bosh?!\nZahmat chekib hech qachon nolimadingiz,\nQancha sabr beribdi sizga Allohim.\nBolam yesin, kiysin deb hech tinmadingiz,\nEndi onam, aslo g'am chekmang ilohim.\nOnaginam, bo'ling omon, umringiz bo'lsin daryo.\nMehribonim yor bo'lsin baxt ilohim ikki dunyo!\nInshaa Alloh bir kun birga jannatlarga kiramiz!\nOilamiz jam bo'lib, Baxt Saodat suramiz!\n\nMart, 2019-yil.\nDilorom Yusupova",
    tags: ["ona", "sevgi", "duo"],
    date: "2019-03-01",
  },
  {
    id: 8,
    title: "Dunyo",
    content: "Mo'jizalarga boy ekan,\nUchdan ikkisi soy ekan,\nTakrorlanmas saroy ekan.\nDum-dumaloq bino ekan,\nUning nomi dunyo ekan.\n\nBordir ajib sirlari,\nTarovatbaxsh yerlari,\nXushsurat adirlari.\nUlkan, go'zal mato ekan,\nUning nomi dunyo ekan.\n\nInsonlari zahmatkash,\nKuydirsa hamki otash,\nYashash-chun qilar kurash.\nBori: sinov - savdo ekan,\nUning nomi dunyo ekan.\n\nBir - biriga bo'lar suyanch,\nKelganida qayg'u quvonch,\nUlarga kuch berar ishonch.\nMuqarrar intiho ekan,\nUning nomi dunyo ekan.\n\nGoh alam, goho kulgu,\nBaxsh etar ekan tuyg'u.\nIchi to'la: mehr, qayg'u,\nSaodatdan sado ekan,\nUning nomi dunyo ekan.\n\nYigitlar oriyatli,\nQizlar mas'uliyatli\nBo'lishi mashaqqatli.\nBaxt kaliti - hayo ekan,\nUning nomi dunyo ekan!\n\nBir yomon otning qashqasi,\nUning yo'q yor-u oshnasi.\nTopilmas ekan boshqasi,\nYagona-yu tanho ekan,\nUning nomi dunyo ekan.\n\nGoh ko'rsatar iltifot,\nOqil olar mukofot,\nXudbinlar-chi talofat!\nBerari hadya, jazo ekan,\nUning nomi dunyo ekan.\n\nOch bemorning yo'q dorisi,\nBadavlatning yo'q vorisi.\nNolisang ham yo'q chorasi,\nBa'zida bevafo ekan,\nUning nomi dunyo ekan!\n\nGohida baxt, goh kulfat,\nAlmashadi nur - zulmat,\nTo'xtamas bir zumga vaqt.\nTinmay oqar daryo ekan,\nUning nomi dunyo ekan...\n\nDekabr, 2016-yil.\nDilorom Yusupova",
    tags: ["dunyo", "falsafa", "hayot"],
    date: "2016-12-01",
  },
  {
    id: 9,
    title: "Achchiq haqiqat",
    content: "Fikring bir chaqaga olmas insondan,\nMushkuldir jo'yali fikrni kutmoq.\nSo'z uchun og'izni benaf ochgandan,\nAfzaldir tilingni ichingga yutmoq.\n\nYaxshi bo'lsin, deya qilsang nasihat,\nYuzingga soladi kamchiliklaring.\nBoshiga tushganda bir kun musibat,\nVijdoni qiynalar, sezilib qadring.\n\nHaqiqat emasdir har shirin hayol,\nHayot ko'rsatar ba'zan uning aksini.\nHaqiqatga tik boqib, o'zing qo'lga ol,\nSimovlariga dosh berib, olgin ajrini.\n\nAtirgul chiroyi - bu shirin hayol,\nQo'lingga botgan tikan - achchiq haqiqat.\nQachon qiynalmagan hayotda inson?\nChiday olar bunga kuchlilar faqat!\n\nBu dunyo yolg'on-u haqiqatga boy,\nYuborma do'stga bo'lgan hisni o'ldirib.\nYolg'onga berilsang, bo'lar holing voy,\nDo'st achitib gapirar, dushman kuldirib!\n\nYanvar, 2017-yil.\nDilorom Yusupova",
    tags: ["haqiqat", "hayot", "falsafa"],
    date: "2017-01-01",
  },
  {
    id: 10,
    title: "Sabr",
    content: "Qiynaldim, deb aytmoqqa bormi haqimiz,\nXoliqimiz tarafdan sinov kelganda?\nCharchadim, deyolmaymiz sig'ib haddimiz,\nIsrofil farishta surni chalganda!\n\nSabrning bahosin so'ramang aslo,\nBu ilm ham yagona Rohmanga xosdir.\nJannatning kalitin bilamiz ammo:\nChiroyli sabr, ixlos, imon, namozdir.\n\nGoho yolg'izman, deya to'kamiz ko'zyosh,\nBizni o'zimizdek anglamas hech kim...\nQabrda-chi, qiynalganda yetarmi bardosh?\nSo'roq-javob fursatida yetmasa ilm...\n\nSavol bering doim o'z-o'zingizga:\nBugun o'lim kelsa tayyormikansiz?\nNazar tashlab qo'ying umr yo'lingizga,\nQancha savob-u, qancha gunoh qilgansiz?!\n\nBu savolga topsangiz ijobiy javob,\nTabriklayman sizni, taxtli ekansiz!\nGunohdan g'ururlanish, yuvilgan savob\nAgar bo'lmasa sizda, baxtli ekansiz!\n\nSavolingiz javobi bo'lsa yoqimsiz,\nKuyunmang, mahzun bo'lmang, hali bor imkon!\nG'afforning mag'firati, bilingki, cheksiz,\nIstig'for ayting tinmay, to tanda bor jon!\n\nAnglang, bardoshli inson - barchaga o'rnak,\nShayton qilsa vasvasa, u e'tiborsiz.\nUnga chin ixlosi-yu, imoni tirgak,\nQur'on o'qisa: tamom! Qalbi ozorsiz!\n\nAstag'firulloh, deya, Haqqa yolvoring,\nSabr-bardoshli bo'ling, kelsa musibat.\nGunoh-u savoblarni ajratib oling,\nYagona maqsad bo'lsin: abadiy Jannat!\n\n21.10.2019.\nDilorom Yusupova",
    tags: ["sabr", "din", "nasihat"],
    date: "2019-10-21",
  },
  {
    id: 11,
    title: "Tarbiya",
    content: "Go'zal fazilatlarni qilar mujassam\nTarbiya, ahloq, odob tushunchalari.\nBizlarga qilgan ne'mat Yaratgan Egam -\nInsoniyat bog'ining gulg'unchalari.\n\nFarzand tarbiyasiga qilib safarbar,\nIkki olam sarvari aytdilar: «Sizga\nEng yaxshi hadya haqda beraymi xabar?\nBu - siz bergan tarbiya farzandingizga».\n\nBu hadya bir murakkab mas'uliyatdir,\nUni talab etadi ilm va sabr.\nUni etolmasangiz chiroyli tortiq,\nO'zingizu bolangizga bo'ladi jabr!\n\nKo'rmay desangiz uning halokatini,\nIstasangiz ikki dunyo saodatini,\nNiyat qilgan bo'lsangiz Rob jannatini,\nO'rniga qo'ying farzand tarbiyatini!\n\n02.10.2019.\nDilorom Yusupova",
    tags: ["tarbiya", "farzand", "nasihat"],
    date: "2019-10-02",
  },
  {
    id: 12,
    title: "Yana onamga...",
    content: "Ming so'z kam, ba'zida bir so'z ko'p,\nOna so'zin ta'rif etmoqqa...\nFarzanding ko'zingga suqsa cho'p,\nKech... Onang qadriga yetmoqqa!\n\nBolangga berasan boringni,\nEsla onang yoqtirgan gulini...\nOnangga aytasan zoringni,\nBolang ko'rmas ko'zing suvini...\n\nKo'chada kimnidir ko'p kutsang,\nBilmaysan o'zingni tutishni.\nSabrli bo'lishni istasang,\nOnangdan o'rgangin kutishni!\n\nOna, onam, onajonginam...\nTuganmas mehringiz sog'indim...\nYoshlik xatolarim eslasam,\nAfsus-nadomatda og'rindim...\n\nQaydan siz oldingiz shuncha kuch?\nBor yukni ko'tarib o'zingiz...\nSizga o'xshay degan hayol puch,\nSizdek bo'lolmaydi qizingiz...\n\nEslar sizni har on yuragim,\nMehrga to'lami bag'ringiz?\nHayotda menga eng keragim,\nHech kim bosolmaydi o'rningiz!\n\nSentabr, 2019-yil.\nDilorom Yusupova",
    tags: ["ona", "sevgi", "nasihat"],
    date: "2019-09-01",
  },
  {
    id: 13,
    title: "Boylik...",
    content: "Qiziqmang boy bo'lishga,\nNe uchun kerak boylik?\nLahza qolsa o'lishga,\nKo'rinarmi chiroyli?\n\nAslida boylik nedir?\nBir qop kumush yo oltin,\nYoki puldir, tangadir,\nBalki baland uy g'ishtin?\n\nYevropacha kiyinish,\nQimmat mashina balki?\nYo obro'li joyda ish,\nYo mashhurlik shunchaki...\n\nAyb bo'lsa kambag'allik,\nG'ariblik bo'lsa nuqson,\nBoy bo'lmasmidi Buyuk,\nYo'lboshchi Komil Inson?\n\nAtigi bitta xurmo,\nKifoya ro'za uchun!\nShukr qildilar hatto\nYamoqli kiyim uchun!\n\nTosh bog'ladilar og'ir,\nYemaganlarida taom...\nJuda ham og'rigandir,\nEslang ovqat yegan on!\n\nO'ylang, loaqal bir nafas:\nNoshkurmiz qanchalar!\nXasad, bekor hoy-havas\nQalbimizni parchalar!\n\nNe qildik Alloh uchun?.\nBiz qandayin ummatmiz?\nZikr qildikmi bugun?\nDunyoda g'animatmiz!\n\nBo'laylik shokir, zokir,\nDuo qiling musulmon!\nBo'lishlik nasib etsin,\nQiyomat kuni shodon!\n\nAvgust, 2019-yil.\nDilorom Yusupova",
    tags: ["boylik", "din", "falsafa"],
    date: "2019-08-01",
  },
  {
    id: 14,
    title: "Pardalar",
    content: "Alloh in'om etdi aql, bilim, tafakkur,\nYumib ko'zlaringizni, qiling tasavvur:\nGo'yo bir maydondasiz, cheksiz, ulkan, keng,\nUni bo'ling hayolda ikki qismga teng.\nBiri o'ng tomoningiz, biri esa chap,\nParda bilan bezalgan har ikki taraf.\nChap tarafga tortilgan go'zal bir parda,\nU yerda o'ynashmoqda kimlardir narda.\nKimdir may ichar, kimdir sigaret chekar,\nKimdir o'yin-kulgu bilan vaqtin chog' etar.\nKimlar yig'ilib rosa qilishar g'iybat,\nHayolida go'yo bu shunchaki suhbat!\nKim dasturxon oldida, to'la noz-ne'mat,\nSherigi esa och, der: Bo'lsaydi ovqat.\nYigitlar yurishibdi quchoqda qizlar,\nBir qiz yonidan ketsa, boshqasin izlar.\nO'yin-kulgu, musiqa, kayf safo, sharob...\nO'zlari qilgan amallar go'yo beazob\nShiorlari : O'tar dunyo, quvna, \"yashab ol\" !\nBu o'tkinchi dunyoda o'ynab kulib qol!\nO'ng taraf parda oldi tamom o'zgacha:\nBa'zilar o'qimoqda namoz tonggacha.\nKim Qur'on o'qimoqda, kimdirlar kitob,\nKimdir yordam bermoqda do'stiga betob.\nBiri yupun kiyingan, qo'lda burda non,\nDeydi: \"Allohga shukr, buncha mehribon!\"\nO'ziga o'xshash g'arib kelsa yoniga,\nBo'lishadi, achinmay ochgan qorniga!\nKimdir Qur'on o'rgatmoqda yosh farzandiga,\nQoqilmasin dunyolarda, deb dilbandiga.\nShiorlari: Sof Islom! Qalblarda Alloh!\nAmallarini ko'rsatgan bir Rosululloh!\n... Ikki parda oldida turli odamlar,\nO'zgacha amallaru turfa qadamlar.\nKo'zingizga ko'ringani chapdagilar shod,\nZerikarli, mashaqqatli o'ngdagi hayot...\nKengaytiring tasavvurni, qarang yaxshiroq:\nKo'tarilsa chapdagi parda hoziroq,\nCheksiz olov chiqar go'zal parda ortidan,\nKimdir u yoq yugurgan, kim buyon qochgan.\nQutilishga urinar bor imkon qadar,\nAfsuski yugurishlar, dod-voy besamar.\nImkoniyat berilgan edi bariga!\nEndi esa kech, otash oldi qariga...\n...O'ng yon parda ortini endi ko'raylik:\nXushhavo, betakror joy, toza, chiroyli!\nShirin suvli anhorlar, ne'matlar tengsiz,\nGo'zal gullar, rayhonlar, daraxtlar cheksiz.\nBaland qasrlar, totli mevalar hil-hil,\nTariflashga u yerni ojiz qolar til.\nInsonlar mamnun juda, yurakda quvonch,\nBenaf ketmas ibodat, Allohga ishonch!\n\n...Go'zal ko'ringan parda - dunyo niqobi!\nO'sha niqob ortida - Do'zax azobi.\nMashaqqatli ko'ringan  - sirot mustaqim,\nMunavvar Jannat sovg'a, amal qilsa kim!\nOching ko'zlaringizni, tanlang yo'lingiz!\nShukr, Alloh deya ursin doim dilingiz!\nNatijani ko'rdingiz: mana ikki yo'l,\nYaxshilab o'ylab tanlang! O'NGmi yoki SO'L?!\n\nMay, 2019-yil.\nDilorom Yusupova",
    tags: ["din", "nasihat", "jannat", "do'zax"],
    date: "2019-05-01",
  },
  {
    id: 15,
    title: "Savollarim...",
    content: "O'ylasam, hayolimda savollar bisyor,\nInsonlar ne uchun buncha beqaror?\nYoddan chiqar bir zumda kechagi va'da,\nBalki shunga aytilar, hom sut emgan banda?!\nChehrasiga solingan niqob, ikki \"yuz\",\nTaslimmi yolg'onlarga hatto rostgo'y ko'z?\nMaqsadga yetmoq uchun shartmi yuz, ellik($)?\nRohatbaxshmi shunchalik laganbardorlik?\nYaratilgan-u loydan, kibr osmonda,\nQasr bilan maqtanganlar qaysi zamonda?\nQachonlardir tomchi suv, hozir kim bo'ldi?\nQaysi yurakda Xoliqqa muhabbat to'ldi?\nQani kimning beli ixlos bilan bukildi?\nSajdaga egilgan bosh o'qqa tutildi...\nQonga to'ldi masjiddek muqaddas dargoh!\nAllohni tanimas u qandayin gumroh?!\nRobbiga sajdada-ku jami mavjudot,\nNechun mudroq, g'aflatda, ongli odamzot?!\nRohman berdimi bizga ulkan bir imkon?\nFoydalang, inson, toki taningda bor jon!\nBilmaysanmi, G'afforda mag'firat cheksiz?\nShokir bo'l, ne'mat berdi, sarhadsiz, tengsiz!\nQalbimizda bo'lsa gar musaffo imon,\nInshaalloh Jannat bizga bo'ladi makon!\n\nMart, 2019-yil.\nDilorom Yusupova",
    tags: ["falsafa", "din", "hayot"],
    date: "2019-03-01",
  },
  {
    id: 16,
    title: "Murg'ak",
    content: "Astag'firulloh yo Rab,\nBu qandayin yomon hol,\nAlloh bergan umrni\nYo'q qilayotganlar bor?!\nJaholatning ayanchli,\nBo'lgan razil odati,\nQaytmoqdami qo'rqinchli\no'sha odat? G'alati...\nAybi bormidi tirik\nQabrga kirgan qizning?\nBag'ringda mitti yurak,\nU axir, sening jisming!\nQiz ekan deb homilam,\nOldirmoqchi bo'libdi!\nQalbi, aqli hom ekan,\nBag'ri toshga to'libdi!\nXoliq bergan ne'matni\nOldirishga kim bo'bsan?!\nAlloh yozgan hayotni\nTo'xtatishga kim bo'bsan?!\nBo'lmaganida buving,\nTug'mas edi otangni!\nSen bo'larmiding, buving\nOldirganda onangni?!\nBarcha buyuk shaxslarni\nFaqat tuqqan ayollar,\nOlim, shayxni, askarni\nEmizgan ham ayollar!\nSatrlarimni o'qib,\nKo'zingga keldimi nam?\nQIZ nomi avval kelgan\nO'g'ildan, QUR'ONda ham!\nFaxrlanib aytaman:\nMening QIZALOG'im bor!\nShukronalar qilaman,\nAxir qancha inson zor!\nBormi qizingiz sizning?\nChindan ekansiz baxtli!\nSizni qilsin ilohim\nJannatda toj-u taxtli!\n\nMart, 2019-yil.\nDilorom Yusupova",
    tags: ["qiz", "hayot", "nasihat"],
    date: "2019-03-01",
  },
  {
    id: 17,
    title: "Zilziladan qo'rqdingmi?",
    content: "Dunyoga kelib bir bor boshing sajda ko'rmadi,\nHar yoqqa borgan oyoq masjid tomon yurmadi.\nRuku qilmagan beling harom ishdan tolmadi,\nKo'zga yoshing kelmadi, zilziladan qo'rqdingmi?!\nBoyliging ko'p har yerga yetadi \"baqvat\" qo'ling,\nGunoh, harom, ma'siyatga botibdi o'ng-u so'ling.\nSo'kish, g'iybat, haqoratga biyron edi-ku tiling!\nQulflab qo'yilgan diling, zilziladan qo'rqdingmi?!\nBir shaharni to'ydirar bir oy yegan ovqating,\nHar kim havasla qarar \"Lasetti\" nomli oting,\nUying saroy, hashamat, qani bergan zakoting?\nQiziqtirmas mamoting, zilziladan qo'rqdingmi?\nKo'p gapni aytgan tiling aylanmaydi zikrga,\nShuncha ne'mat olding-u erinasan shukrga,\nHayolingga kelmas hech yordam berish faqirga.\nQo'shilmaysanmi fikrimga, zilziladan qo'rqdingmi?\nKo'zingni och ey inson, Alloh beribdi omad,\nHali imkon bor do'stim, aytib olgin shahodat.\nGunohlarni tark etib, savobni qilgin odat,\nBir kun bo'lar QIYOMAT... Eh zilziladan  qo'rqdingmi?!\n\nMart, 2019-yil.\nDilorom Yusupova",
    tags: ["din", "nasihat", "qiyomat"],
    date: "2019-03-01",
  },
  {
    id: 18,
    title: "Dardlarni unutib...",
    content: "Bir daraxt paydo bo'lur,\nDardlardan urug' eksang.\nKo'rimsiz bino bo'lur,\nAlamlardan g'isht tersang...\n\nNa bir rang bor, daraxtning,\nNa chiroy  poyasida,\nQoladi orzu, baxting\nBarglarning soyasida.\n\nAlamzadalik bo'lsa\nImorat poydevori,\nBino ulg'aysa, o'ssa,\nKo'payadi ozori.\n\nAchchiq, taxir mevalar\nAslo bermaydi huzur,\nBinodagi xonalar\nGohida titraydi zir.\n\nDardlar daraxti hatto\nKulishga izn bermas,\nBinoing yuzi aslo\nBaxt quyoshini ko'rmas.\n\nBu daraxtni qalbingdan\nSug'ur, qo'porib tashla!\nBinoning har g'ishtidan\nVoz kech, ko'zlaring yoshlab...\n\nYog'sa yurakka yomg'ir,\nOrtidan chiqar quyosh.\nMAQSADGA YETSANG, oxir\nKamalak ko'tarar bosh...\n\nIstig'fordan malham sur\nQalbing yara joyiga.\nBeto'xtov aytgin shkur\nHayoting chiroyiga!\n\nAna endi keldi vaqt:\nYuragingga urug' ek!\nAlloh va Nabiy (sollallohu alayhi vasallam)dan, faqat,\nBoshqalarga bo'lsin berk!\n\nQo'ygin endi hayotga,\nIxlos-la yangi qadam.\nIkki olamda baxtga\nErishgin yurib ildam...\n\nNoyabr, 2019-yil.\nDilorom Yusupova",
    tags: ["dard", "sabr", "umid"],
    date: "2019-11-01",
  },
  {
    id: 19,
    title: "Fasllar",
    content: "Aqlimizni shoshirar\nDunyo mo'jizalari,\nHayratimiz oshirar\nOlam hodisalari.\n\nYo'q edi besh oy oldin\nZaminimiz uzra qor.\nIssiq toydirib holdan,\nShabbodaga qildi zor.\n\nBugun ko'kdagi qoplar\nYerga qarab ochildi.\nHamma yoqqa barobar\nOppoq qorlar sochildi.\n\nYerni quchib parchalar\nTurishar bo'lib to'p-to'p.\nQorbo'ron payti ular\nBo'ladilar olmos to'p.\n\nHar yerda qorbobolar,\nGo'yo mahzun qarashar,\nBalki Quyoshdan nurin\nSochmasligin so'rashar...\n\nOlib nurin qo'liga,\nQuyosh yerni silaydi.\nQorboboning holiga\nSumalaklar yig'laydi.\n\nBahor esa uyalib,\nNe qilarin bilmaydi.\nTog' ortidan mo'ralab,\nMayingina jilmaydi.\n\nQish qor-ayozni yig'ib,\nKo'klamga o'rin berdi.\nBahor asta yoyilib,\nZaminga mehrin berdi.\n\nYerlar bo'lib maysazor,\nGullar ifor sochdilar.\nQurib yotgan daraxtlar\nBarg, kurtaklar ochdilar.\n\nO'qlar otmoqqa tayyor\nO'smali kamon qoshlar.\nQizlar bundan baxtiyor,\nYurishar terib toshlar.\n\nTerilgan toshlar tushib,\nDoshqozonda qaynaydi.\nSumalakni talashib,\nBolachalar yalaydi.\n\nKo'ksomsani shoshib yeb,\nKo'chaga yo'l olarlar.\nAxir, turibdi kutib\nOsmono'par varraklar...\n\nBularni ko'rib Bahor,\nQuyoshga mamnun kuldi.\nOftob unga javoban\nQulupnay sovg'a qildi.\n\nTaklif qildi zaminga\nQuyosh do'sti Yozni ham.\nGilos, o'rik, olchani\nBirga ko'rdilar baham.\n\nMay oyi tugamasdan,\nYoz ham keldi iljayib.\nBolalar shod, maktabda\nQolishgandi «qiynalib».\n\nBoshlandi yoz keliboq:\nCho'milishu sayohat.\nBolalarcha orzular:\n«Yoz bo'lsaydi hamma vaqt!»\n\nIsh qizg'in dalalarda,\nYog'in-sochin endi yo'q.\nBog'dagi hosillardan\nBog'bonlarning ko'ngli to'q.\n\nAvjida sayohatlar,\nOrom olish tog'larda.\nYoshu qari shod-xurram,\nHiyobonu bog'larda.\n\nQuyosh mamnun ishidan,\nNur sochar yana, yana...\nQochib bu «qilmish»idan,\nIzlaydi hamma pana.\n\nBarcha quyoshdan bezor:\n«Tugay qolsaydi yoz ham!\nQurib yotibdi yerlar,\nTurmas bir soat ham nam!»\n\nBu gapdan yoz arazlab,\nKetdi minib otiga.\nQuyosh oldi bekinib\nBulutlarning ortiga.\n\nKuz keldi hamma yoqqa\nShamollarin yeldirib.\nBulutlarni yig'latdi\nKelganini bildirib.\n\nXazonlarni daraxtdan,\nBitta-bitta yuladi.\nBulutlarning ortidan\nQuyosh ma'yus kuladi.\n\nDehqonlar shoshilgancha,\nDalaga olishar yo'l.\nBog'bonlar ham mehnatda,\nBog'larda mevalar mo'l.\n\nAvjida yig'im-terim,\nTo'xtamaydi bir zum ish.\nShoshilish zarur, axir,\nOldinda qahraton Qish...\n\n...Mana, yana o'sha tanish,\nQadrdon oq parchalar...\n«Qish keldi» deb shivirlab,\nTebranmoqda archalar...\n\nBu go'zallikni ta'rif\nEtmoqqa ojiz qalam.\nBo'lmaydi ado qilib\nQancha ta'riflasak ham...\n\nBaxtimizga Quyosh ham,\nTo'rt fasl ham bor bo'lsin.\nBahor, Yoz, Kuz, Qishda ham\nDillar baxtiyor bo'lsin!..\n\nDekabr, 2016-yil.\nDilorom Yusupova",
    tags: ["tabiat", "fasllar", "bahor"],
    date: "2016-12-01",
  },
  {
    id: 20,
    title: "Maqsad",
    content: "Solar edi tashvishga doim\nOrzular, hoy-havasim, baxtim.\nBu xayollar qamrardi o'yim,\nAngladim boy berganim vaqtim.\n\nHoy-havaslar erur o'tkinchi,\nHaqiqiy baxt ekan chin imon.\nO'tin izlab chiqqan o'tinchi,\nO'tin qolib gul uzsa, yomon...\n\nGul isi ko'p etadi sarmast,\nUzib, hidlab olar u rohat.\nYoddan chiqar asosiy maqsad:\nO'tin uchun atalgandi vaqt!\n\n...O'tdi bu kun, o'tar erta ham,\nHavasingiz ushaldi deylik,\nRohatdasiz, yurakda yo'q g'am,\nAmmo... Mangu bo'lmaysiz tirik!\n\nAnglab oling chin maqsadingiz,\nShayton so'zi kelmasin g'olib.\nIbodat-chun tug'ilgandik biz,\nGunoh ichra ketmaylik o'lib...\n\nKo'ngil uyi bo'ladi obod,\nImon bilan to'ldirsak uni.\nToat bo'lsa yashashdan murod,\nBo'lamiz shod Qiyomat kuni...\n\n...In Shaa Alloh...\n\nNoyabr, 2019-yil.\nDilorom Yusupova",
    tags: ["maqsad", "din", "hayot"],
    date: "2019-11-01",
  },
  {
    id: 21,
    title: "Uyqudagilar...",
    content: "Qornimiz to'q, ko'zimiz och,\nUstimiz but, qalb yalang'och!\n\nNolish oson, zikr qiyin,\nNafllardan afzal o'yin.\n\nYuzda havas, ko'zda hasad,\nIxlosi yo'q, jonsiz jasad...\n\nNamozda yo'q xushu, xuzu,\nFoniy boylik - yakka orzu.\n\nDunyo to'plab, horib tolmas,\nNafaqani yodga olmas.\n\nG'iybatlarga tillar burro,\nEsga kelmas goho duo.\n\nMa'siyatlar go'yo go'zal,\nNomahramlar \"shirin\", \"asal\".\n\nDilni bosdi g'ubor-u chang,\nTemir bo'lsa olardi zang...\n\nOrzu qilmay Haj, Umrani,\nNe qizig'i bor umrini?!\n\nOdatlanmas tilovatga,\nQanday yetar saodatga?!\n\nKunlar o'tar salovatsiz,\nInson o'ziga shafqatsiz...\n\nQalb ko'zlarda mudroq, uyqu,\nEgallagan benaf tuyg'u.\n\nOxiratga emas kafil,\nOdam nega buncha g'ofil?!\n\nBu ishlardan shoir hayron,\nBarchasidan dili vayron...\n\nDekabr, 2019-yil...\nDilorom Yusupova",
    tags: ["din", "nasihat", "g'aflat"],
    date: "2019-12-01",
  },
  {
    id: 22,
    title: "Soxtalar",
    content: "\"Yuz\"ingiz ham oshib ketdi ikkitadan,\nTillaringizda biyron-biyron \"paxtalar\"\nQiyofangizda jam inson olti qit'adan,\nNiqoblaringiz buncha ko'p, ey soxtalar?\n\nAmaldorni ko'rsatasiz \"Okam - u\" deb,\nAmalidan tushsa-chi, \"Kim ekan bu?\" deb.\nZaharni ham tutqazasiz \"Malham - bu\" deb,\nNiqoblaringiz buncha ko'p, ey soxtalar?\n\nQaysi mavzu bo'lmasin, siz xabardor,\nQolishmaysiz oqimdan aslo, zinhor,\n\"Do'st\"ingizni g'iybatlarda etasiz xor,\nNiqoblaringiz buncha ko'p, ey soxtalar?\n\nBa'zingizga \"Laganbardor\" so'zi kamdir,\nGo'zal so'zingiz misoli arzon shamdir.\nYuzingizda yosh g'am emas, hasaddandir,\nNiqoblaringiz buncha ko'p, ey soxtalar?\n\nNomahramlar qo'lingizdan ichsa sharbat,\nMahramingiz sizsiz yolg'iz cheksa zahmat,\nSevgingizni ataysizmi \"Chin muhabbat\"?\nNiqoblaringiz buncha ko'p, ey soxtalar?\n\nBir zamonlar o'tgan edi odil Umar,\nQilichdek so'z ila jaholatni kesar.\nUning xislatidan sizda bormi asar,\nNiqoblaringiz buncha ko'p, ey soxtalar?\n\nDo'sti uchun tirgak doim, tashvish, g'amda,\nAbu Bakrningdek mehr qani kimda?!\nKo'ngilda yo'q shirin so'zlar faqat tilda,\nNiqoblaringiz buncha ko'p, ey soxtalar?\n\nBu ishlarni yoqlamaydi mukammal din,\nMing soxtadan afzal emasmi bitta chin?\nTashlang soxta niqoblarni, kelmay o'lim,\nNiqoblaringiz buncha ko'p, ey soxtalar?..\n\n...Soxtalardan to'ydim, Rosulimni sog'indim...\n\nFevral, 2020.\nDilorom Yusupova",
    tags: ["nasihat", "ijtimoiy", "soxta"],
    date: "2020-02-01",
  },
  {
    id: 23,
    title: "Kulcha (Qo'shiq-ertak)",
    content: "Qadim o'tgan zamonda\nChol-kampir bo'lgan ekan.\nBir kuni chol kampirga:\n\"Kulcha pishir\", degan ekan.\n\nKampir solib yog', suv, un,\nKulchani pishiribdi,\nKeyin sovushi uchun\nDerazaga qo'yibdi.\n\nZerikib ketib Kulcha,\nDumalab ketibdi,\nDumalab u bir zumda\nDarvozaga yetibdi.\n\nKulcha ortga qaramay,\nQochib ketaveribdi.\nShunda uning yo'lidan\nKuchuk chiqib qolibdi.\n\nKuchuk tili osilib:\n\"Men seni yeyman\", debdi.\nKulcha juda shoshilib,\nQo'shig'ini aytibdi:\n\n\"Men kulchaman, kulchaman,\nGo'yo to'lin oychaman,\nAgar yemoqchi bo'lsang,\nMen uzoqqa qochaman\".\n\nTezda qochib ketibdi,\nBu gal uning yo'lidan\nMushuk chiqib qolibdi,\nUning qorni och ekan.\n\nMushuk labini yalab:\n\"Men seni yeyman\", debdi.\nKulcha mushukka qarab,\nQo'shig'ini aytibdi:\n\n\"Men kulchaman, kulchaman,\nGo'yo to'lin oychaman,\nAgar yemoqchi bo'lsang,\nMen uzoqqa qochaman\"\n\nQutilib mushukdan ham,\nSichqondan ham qochibdi.\nKim yemoqchi bo'lsa ham,\nQo'shiq aytib, shoshibdi.\n\nQochib yurib o'tloqqa,\nU dumalab ketibdi.\nKeyin bir qizaloqqa\nKulchavoy duch kelibdi.\n\nQizcha kulchani qo'lga\nKo'tarib olibdi,\nYeb qo'ymasdan uyiga\nUni olib ketibdi.\n\nKulcha qarasa, o'sha,\nChol-kampir uyi ekan.\nBechora kampir esa,\nQidirib yurgan ekan.\n\nKulchani olib kampir,\nQizga rahmat aytibdi.\nChol nasibasi oxir,\nO'z-o'ziga qaytibdi.\n\nHar kimning nasibasi,\nO'ziga atalarkan.\nQancha \"dumalamasin\",\nAxiyri o'zi yerkan...\n\nTo'g'ri xulosa chiqar,\nBolajonim, sen bundan.\nAlloh doim rizq berar,\nQuruq qolmaysan undan.\n\nYoqqan bo'lsa ertagim,\nMen bundan juda shodon.\nEndi yotib uhlagin,\nShu bilan ertak tamom.\n\n18.02.2020.\nDilorom Yusupova",
    tags: ["ertak", "bola", "nasihat"],
    date: "2020-02-18",
  },
  {
    id: 24,
    title: "Rangsiz gul",
    content: "Baytulloh atrofi bo'lmasa gavjum,\nMahzun bo'lar ekan musulmon ko'ngli.\nMayli, kichik jussa bilan bo'lsa ham\nTo'ldirmoq istarkan muborak yerni.\n\nIbodatin doim masjidda qilgan\nMo'min yuragida rangsiz, nursiz gul.\nGo'yo qalbdagi uyi huvillab qolgan,\nMasjid eshigiga osilganda qulf...\n\nYetishni o'rgandik har ne'mat qadriga,\nBu ham bir sinoving, bu ham bir xayring.\nKa'ba firoqida, masjid hajrida\nKuyganlarga bordir berajak ajring...\n\n26.03.2020.\nDilorom Yusupova",
    tags: ["din", "masjid", "ibodat"],
    date: "2020-03-26",
  },
  {
    id: 25,
    title: "Ramazonim, xush kelding!",
    content: "Ro'zadorga xushxabar,\nMo'minga qalqon bo'lding.\nIntizor qilib oylar\nRamazonim xush kelding!\n\nNuzuli ilk oyati Qur'on\nSenda bo'ldi begumon.\nSensan sababi Rayyon,\nRamazonim xush kelding!\n\nMujassam senda ajr,\nMing oydan yaxshi xayr,\nFazli laylatul qadr,\nRamazonim xush kelding!\n\nQalblarda surur, iymon,\nAllohdan bo'ldi imkon,\nZanjirband mal'un shayton,\nRamazonim xush kelding!\n\nHaq seni qildi ne'mat,\nYomg'irday yog'di rahmat.\nSen-la baxtiyor ummat,\nRamazonim xush kelding!\n\nRo'za - shifo va toat,\nIkkisi jam ayni vaqt.\nSen - dunyoda saodat,\nRamazonim xush kelding!\n\nNafsimizga qul edik,\nTinmay noz-ne'mat yedik,\nYana bo'lsaydi dedik...\nRamazonim xush kelding!\n\nO'rgatding qanoatga,\nBerildik tilovatga,\nDil to'ldi halovatga,\nRamazonim xush kelding!\n\nOrttirib itoatni,\nShukr va qanoatni,\nTark etdik adovatni,\nRamazonim xush kelding!\n\nRo'zadorlarga Rahmon\nOchur eshigin Rayyon.\nSenda naf ko'p, yo'q ziyon,\nRamazonim xush kelding!\n\nSen - Robbimdan oyatsan,\nRosulimdan sunnatsan.\nAfsus juda oz vaqtsan...\nRamazonim xush kelding!\n\n5 - Ramazon, 1441.\n28-aprel, 2020.\nDilorom Yusupova",
    tags: ["ramazon", "din", "ro'za"],
    date: "2020-04-28",
  },
  {
    id: 26,
    title: "Ona tilim",
    content: "Qoldirgandir asrlarni ortda izing,\nO'rxun-Enasoydagi mavj, to'lqin - o'zing,\nQalblarni zabt etib kelgan kuy-u sozing,\nVatanimning quyoshisan, ona tilim.\n\nAjdodlarni avlodlarga tanitgan - sen,\nMoziy-kelajak ko'prigin yaratgan - sen,\nO'zbek nomin dunyolarga taratgan - sen,\nO'tmish hayot sirdoshisan, ona tilim.\n\nNavoiyni sulton qilding she'riyatda,\nMashrab qalbining otashi sen-la xatda,\nBobur seni unutmadi o'zga taxtda,\nShoh-u gado dildoshisan, ona tilim.\n\nKo'z o'ngimizda namoyon \"O'tkan kunlar\",\nSen-la jadid ahli ochdi qalbin tunlar.\n\"Qutlug' qon\"lar oqqandan so'ng o'chgan unlar,\nShahidlarning ko'zyoshisan, ona tilim.\n\nMerosingni yo'q qilmoqqa tutindilar,\nBag'ring tilib, bo'zlatmoqqa botindilar,\nIldizingni yondirmoqqa urindilar,\nSen xalqimning bardoshisan, ona tilim.\n\nTaqdirda bor ekan, keldi kunlar masrur,\nDavlat tili maqomini olding, shkur,\nButun xalqim yuragida quvonch, g'urur,\nSaodatning yo'ldoshisan, ona tilim.\n\nNecha asrlar osha sen topding kamol,\nBundan keyin aslo, tilim, topma zavol,\nDunyo borki, hamroh bo'lsin hurlik, iqbol,\nDuolarim tilmochisan, ona tilim!\n\n21.10.2020.\nDilorom Yusupova",
    tags: ["ona til", "vatan", "millat"],
    date: "2020-10-21",
  },
  {
    id: 27,
    title: "Asalning ozi...",
    content: "Har ishda bo'lsin me'yor,\nShirin asalning ozi.\nKam sayrasa qush agar,\nYoqimlidir ovozi!\n\nHidlash yoqimli gulni,\nRostdir go'zal ekani.\nUzishga shoshma uni,\nBalki bordir tikani...\n\nMaydalab yog'sa yomg'ir,\nXush yoqadi ko'ngilga.\nVayron qilishga qodir,\nAylansa gar u selga!\n\nSovqotganingda panoh,\nQuyoshning iliq tafti.\nKuydirmasin bo'l ogoh,\nUning otashin kafti!\n\nUy qancha katta bo'lsa,\nKamayib borar mehr.\nG'aribning qorni to'ysa,\nUning boyiganidir...\n\nIntilib samolarga,\nYiqilib qolma nogoh!\nG'arib, bechoralarga\nIbrat-la tashla nigoh...\n\nArimas g'am uyingdan,\nHayotdan noliyversang.\nSen baxtiyorsan chindan,\nO'z rizqing ME'YOR bilsang!\n\n2016.\nDilorom Yusupova",
    tags: ["me'yor", "hayot", "falsafa"],
    date: "2016-01-01",
  },
  {
    id: 28,
    title: "Javhar",
    content: "Aqlim yo yuragim, qaysi biri haq?\nBiriga yon bossam, ko'nmaydi biri...\nBilmagan edimmi haqni avvalroq,\nRuhimda ekan bu taraddud siri.\n\nShunday aqliy, hissiy savollar bari\nYagona nuqtada toparkan tinim:\nHam aqling, ham qalbing ruhing asari\nIymon qarshisida rozi bo'lar jim.\n\nInsonning javhari iymondir beshak,\nTug'ilgan u bilan, o'zligi unda.\nIslom bu fitratdir, Islomdir tirgak,\nSaodatning jami topilar bunda.\n\n21.11.2022.\nDilorom Yusupova",
    tags: ["iymon", "aql", "qalb"],
    date: "2022-11-21",
  },
  {
    id: 29,
    title: "\"Sizga juda oz ilm berilgandir\" (17:85)",
    content: "Bizni yaratib Alloh, qildi ko'p e'zoz,\nYashashdan maqsaddir ibodat, namoz,\nMukammal ilm bir 'Aliym Zotga xos,\n\"Ilm berilgandir sizga juda oz!\"\n\nNe'matlari cheksiz U Razzoq Zotning,\nTa'mi achchiq, shirin dunyo, hayotning,\nEgallolmaysiz aslo jamin sabotning,\n\"Ilm berilgandir sizga juda oz!\"\n\nTilu dildagi shukrim bo'lsa ham fido,\nNe'matlarni sanab etolmam ado.\nBotinu zohirni biladi Hudo,\n\"Ilm berilgandir sizga juda oz!\"\n\nUlardan bittasi aql-idrokdir,\nFahm-farosat, bilim, tasavvur, fikr,\nTilingiz qiynalmay aytadi zikr,\n\"Ilm berilgandir sizga juda oz!\"\n\nShu aqldan ishlaydi faqat to'rt foiz,\nUndan balandlamoqqa odamzot ojiz!\nFaqat Allohning ilmi cheksizdir, cheksiz!\n\"Ilm berilgandir sizga juda oz!\"\n\nShunday ekan, yo'l bo'lsin kibrlanishga,\nOlqishlar-u maqtovdan faxrlanishga!\nInson yakka erishmas hech qaysi ishga,\n\"Ilm berilgandir sizga juda oz!\"\n\nSamolyot-u vertolyot, samo raketasi,\nGlobus, poyezd, hatto yer xaritasi -\nAlloh bergan ozgina ilm natijasi!\n\"Ilm berilgandir sizga juda oz!\"\n\nSo'nggi modeldagi mobil telefon,\nKompyuterlaringiz ishlaydi har on,\nRobotlar xizmatda, lek unda yo'q ong!\n\"Ilm berilgandir sizga juda oz!\"\n\nSuvda suzgan kemalar - Robbimdan oyat,\nRadio to'lqinlari hayratli g'oyat,\nLek e'tibor bermaydi hech insoniyat:\n\"Ilm berilgandir sizga juda oz!\"\n\nShuncha taraqqiyot bilimingiz bilan,\nPaydo bo'lgan ozgina ilmingiz bilan,\nRuku qilmaysiz nega belingiz bilan?!\n\"Ilm berilgandir sizga juda oz!\" (17:85)\n\nNoyabr, 2019-yil\nDilorom Yusupova",
    tags: ["ilm", "din", "Qur'on"],
    date: "2019-11-01",
  },
  {
    id: 30,
    title: "Sog'inch",
    content: "Har dam to'lib-toshsa sog'inchu alam,\nTo'kib sol dardingni yolg'iz Allohga.\nMuborak u yerga yetmasa qadam,\nMalhamdir, salavot Rosulullohga...\n\nYupun bo'lsa egnim, yonmaydi dilim,\nShukr-la to'ldirgum ochqagan qornim.\nTomchilab qoldi bu ko'zdagi selim,\nTilak uchun fido bo'lsaydi borim...\n\nXumorni bosolmas suratlar jonsiz,\nQorachiqda yo'q u qubbaning aksi.\nNahot hayot o'tar muborak onsiz,\nGiryon etib ko'zni yashil rang bahsi?\n\nNasib bo'larmikan afzal mingtadan\nQalb, ruh va tanani bog'lagan sujud?\nYo'llar olisligi shunchaki sabab,\nLoyiq emas balki gunohkor vujud...\n\n24.02.2023.\nDilorom Yusupova",
    tags: ["sog'inch", "ibodat", "Ka'ba"],
    date: "2023-02-24",
  },
];

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [splash, setSplash] = useState(true);
  const [poems, setPoems] = useState(() => {
    try { const s = localStorage.getItem("qalb_oromi"); return s ? JSON.parse(s) : defaultPoems; }
    catch { return defaultPoems; }
  });
  const [view, setView] = useState("list");
  const [selected, setSelected] = useState(null);
  const [filterTag, setFilterTag] = useState(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ title: "", content: "", tags: "" });
  const [editId, setEditId] = useState(null);
  const [toast, setToast] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // all | favorites
  const [favorites, setFavorites] = useState(() => {
    try { const s = localStorage.getItem("qalb_favs"); return s ? JSON.parse(s) : []; }
    catch { return []; }
  });

  useEffect(() => {
    const t = setTimeout(() => setSplash(false), 2600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    try { localStorage.setItem("qalb_oromi", JSON.stringify(poems)); } catch {}
  }, [poems]);

  useEffect(() => {
    try { localStorage.setItem("qalb_favs", JSON.stringify(favorites)); } catch {}
  }, [favorites]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2200); };

  const allTags = [...new Set(poems.flatMap(p => p.tags))];
  const filtered = poems.filter(p => {
    if (activeTab === "favorites" && !favorites.includes(p.id)) return false;
    if (filterTag && !p.tags.includes(filterTag)) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) &&
        !p.content.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const toggleFav = (id) => setFavorites(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);

  const openRead = (poem) => { setSelected(poem); setView("read"); };
  const openEdit = (poem) => {
    setForm({ title: poem.title, content: poem.content, tags: poem.tags.join(", ") });
    setEditId(poem.id); setView("write");
  };
  const openNew = () => { setForm({ title: "", content: "", tags: "" }); setEditId(null); setView("write"); };

  const savePoem = () => {
    if (!form.title.trim() || !form.content.trim()) return;
    const tags = form.tags.split(",").map(t => t.trim()).filter(Boolean);
    if (editId) {
      setPoems(prev => prev.map(p => p.id === editId ? { ...p, title: form.title, content: form.content, tags } : p));
      if (selected?.id === editId) setSelected(prev => ({ ...prev, title: form.title, content: form.content, tags }));
      showToast("She'r yangilandi ✨");
      setView(editId ? "read" : "list");
      if (editId) setSelected(prev => ({ ...prev, title: form.title, content: form.content, tags }));
    } else {
      const newPoem = { id: Date.now(), title: form.title, content: form.content, tags, date: new Date().toISOString().slice(0, 10) };
      setPoems(prev => [newPoem, ...prev]);
      showToast("She'r saqlandi 🌸");
      setView("list");
    }
  };

  const deletePoem = (id) => {
    setPoems(prev => prev.filter(p => p.id !== id));
    setFavorites(prev => prev.filter(x => x !== id));
    setView("list"); showToast("She'r o'chirildi");
  };

  // ── SPLASH ────────────────────────────────────────────────────────────────
  if (splash) return (
    <div style={S.splashRoot}>
      <div style={S.splashContent}>
        <div style={S.splashIconWrap}>
          <AppIcon size={100} />
          <div style={S.splashGlow} />
        </div>
        <div style={S.splashTitle}>Qalb oromi</div>
        <div style={S.splashSub}>She'rlaringiz uchun joy</div>
        <div style={S.splashDots}>
          <span style={{ ...S.dot, animationDelay: "0s" }} />
          <span style={{ ...S.dot, animationDelay: "0.2s" }} />
          <span style={{ ...S.dot, animationDelay: "0.4s" }} />
        </div>
      </div>
      <div style={S.splashDev}>Anthropic Claude tomonidan yaratildi</div>
    </div>
  );

  // ── MAIN ──────────────────────────────────────────────────────────────────
  return (
    <div style={S.root}>
      {/* BG */}
      <div style={S.bgGrad} />
      <div style={S.bgOrbs}>
        <div style={{ ...S.orb, width: 260, height: 260, top: -80, right: -80, background: "radial-gradient(circle, rgba(147,51,234,0.18) 0%, transparent 70%)" }} />
        <div style={{ ...S.orb, width: 180, height: 180, bottom: 80, left: -60, background: "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)" }} />
      </div>

      {/* TOAST */}
      {toast && <div style={S.toast}>{toast}</div>}

      {/* ── LIST ── */}
      {view === "list" && (
        <div style={S.screen}>
          {/* Header */}
          <div style={S.appBar}>
            <div style={S.appBarLeft}>
              <AppIcon size={36} style={{ borderRadius: 10 }} />
              <div>
                <div style={S.appName}>Qalb oromi</div>
                <div style={S.appSub}>{poems.length} ta she'r</div>
              </div>
            </div>
            <button style={S.fab} onClick={openNew}>＋</button>
          </div>

          {/* Search */}
          <div style={S.searchWrap}>
            <span style={S.searchIcon}>🔍</span>
            <input style={S.searchInput} placeholder="She'r qidirish..." value={search} onChange={e => setSearch(e.target.value)} />
            {search && <button style={S.clearBtn} onClick={() => setSearch("")}>✕</button>}
          </div>

          {/* Tabs */}
          <div style={S.tabs}>
            {["all", "favorites"].map(t => (
              <button key={t} style={{ ...S.tab, ...(activeTab === t ? S.tabActive : {}) }} onClick={() => setActiveTab(t)}>
                {t === "all" ? "Barcha she'rlar" : "❤️ Sevimlilar"}
              </button>
            ))}
          </div>

          {/* Tag chips */}
          {allTags.length > 0 && (
            <div style={S.tagScroll}>
              <button style={{ ...S.chip, ...(filterTag === null ? S.chipActive : {}) }} onClick={() => setFilterTag(null)}>Barchasi</button>
              {allTags.map(tag => (
                <button key={tag} style={{ ...S.chip, ...(filterTag === tag ? { background: getTagColor(tag) + "33", borderColor: getTagColor(tag), color: getTagColor(tag) } : {}) }} onClick={() => setFilterTag(filterTag === tag ? null : tag)}>
                  #{tag}
                </button>
              ))}
            </div>
          )}

          {/* Cards */}
          <div style={S.cardList}>
            {filtered.length === 0 && (
              <div style={S.empty}>
                <div style={{ fontSize: 52, marginBottom: 14 }}>✦</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, color: "rgba(233,213,255,0.6)" }}>
                  {poems.length === 0 ? "Birinchi she'ringizni\nyozing..." : "She'r topilmadi"}
                </div>
              </div>
            )}
            {filtered.map((poem, i) => (
              <div key={poem.id} style={{ ...S.card, animationDelay: `${i * 0.06}s` }} onClick={() => openRead(poem)}>
                <div style={S.cardTop}>
                  <div style={S.cardDate}>{poem.date}</div>
                  <button style={S.favBtn} onClick={e => { e.stopPropagation(); toggleFav(poem.id); }}>
                    {favorites.includes(poem.id) ? "❤️" : "🤍"}
                  </button>
                </div>
                <div style={S.cardTitle}>{poem.title}</div>
                <div style={S.cardPreview}>{poem.content.split("\n").slice(0, 2).join("\n")}{poem.content.split("\n").length > 2 ? "…" : ""}</div>
                {poem.tags.length > 0 && (
                  <div style={S.cardTagRow}>
                    {poem.tags.slice(0, 3).map(t => (
                      <span key={t} style={{ ...S.cardTagPill, background: getTagColor(t) + "22", color: getTagColor(t), border: `1px solid ${getTagColor(t)}55` }}>#{t}</span>
                    ))}
                  </div>
                )}
                <div style={S.cardArrow}>›</div>
              </div>
            ))}
            <div style={{ height: 24 }} />
          </div>
        </div>
      )}

      {/* ── READ ── */}
      {view === "read" && selected && (
        <div style={S.screen}>
          <div style={S.navBar}>
            <button style={S.navBack} onClick={() => setView("list")}>‹</button>
            <div style={S.navTitle}>She'r</div>
            <button style={S.navFav} onClick={() => toggleFav(selected.id)}>
              {favorites.includes(selected.id) ? "❤️" : "🤍"}
            </button>
          </div>
          <div style={S.readBody}>
            <div style={S.readMeta}>{selected.date}</div>
            <h1 style={S.readTitle}>{selected.title}</h1>
            <div style={S.readDivider} />
            <pre style={S.readContent}>{selected.content}</pre>
            {selected.tags.length > 0 && (
              <div style={{ ...S.cardTagRow, marginTop: 24 }}>
                {selected.tags.map(t => (
                  <span key={t} style={{ ...S.cardTagPill, background: getTagColor(t) + "22", color: getTagColor(t), border: `1px solid ${getTagColor(t)}55` }}>#{t}</span>
                ))}
              </div>
            )}
          </div>
          <div style={S.actionBar}>
            <button style={S.actionEdit} onClick={() => openEdit(selected)}>✏️  Tahrirlash</button>
            <button style={S.actionDel} onClick={() => deletePoem(selected.id)}>🗑️</button>
          </div>
        </div>
      )}

      {/* ── WRITE ── */}
      {view === "write" && (
        <div style={S.screen}>
          <div style={S.navBar}>
            <button style={S.navBack} onClick={() => setView(editId ? "read" : "list")}>‹</button>
            <div style={S.navTitle}>{editId ? "Tahrirlash" : "Yangi she'r"}</div>
            <div style={{ width: 36 }} />
          </div>
          <div style={S.writeBody}>
            <div style={S.fieldGroup}>
              <div style={S.fieldLabel}>SARLAVHA</div>
              <input style={S.fieldInput} placeholder="She'r nomi..." value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
            </div>
            <div style={S.fieldGroup}>
              <div style={S.fieldLabel}>SHE'R MATNI</div>
              <textarea style={S.fieldTextarea} placeholder="She'ringizni bu yerga yozing..." value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={11} />
            </div>
            <div style={S.fieldGroup}>
              <div style={S.fieldLabel}>TEGLAR <span style={{ opacity: 0.4, fontSize: 10 }}>(vergul bilan)</span></div>
              <input style={S.fieldInput} placeholder="sevgi, bahor, orzular..." value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} />
            </div>
            <button
              style={{ ...S.saveBtn, opacity: (!form.title.trim() || !form.content.trim()) ? 0.45 : 1 }}
              disabled={!form.title.trim() || !form.content.trim()}
              onClick={savePoem}
            >Saqlash</button>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Nunito:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
        body { background: #0f0720; }
        input, textarea, button { font-family: 'Nunito', sans-serif; }
        input::placeholder, textarea::placeholder { color: rgba(240,230,255,0.25); }
        input:focus, textarea:focus { outline: none; border-color: rgba(192,132,252,0.5) !important; }
        ::-webkit-scrollbar { width: 3px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: rgba(192,132,252,0.3); border-radius: 10px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100% { opacity:0.3; transform:scale(0.8); } 50% { opacity:1; transform:scale(1); } }
        @keyframes splashIn { from { opacity:0; transform:scale(0.85) translateY(10px); } to { opacity:1; transform:scale(1) translateY(0); } }
        @keyframes toastIn { from { opacity:0; transform:translateX(-50%) translateY(8px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }
        @keyframes glowPulse { 0%,100% { opacity:0.4; transform:scale(1); } 50% { opacity:0.8; transform:scale(1.15); } }
      `}</style>
    </div>
  );
}

// ─── STYLES ──────────────────────────────────────────────────────────────────
const S = {
  // Splash
  splashRoot: {
    minHeight: "100vh", display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    background: "linear-gradient(160deg, #0f0720 0%, #1e0b3a 50%, #0f0720 100%)",
    fontFamily: "'Nunito', sans-serif",
  },
  splashContent: { display: "flex", flexDirection: "column", alignItems: "center", animation: "splashIn 0.7s cubic-bezier(.34,1.56,.64,1) both" },
  splashIconWrap: { position: "relative", marginBottom: 28 },
  splashGlow: {
    position: "absolute", inset: -20, borderRadius: "50%",
    background: "radial-gradient(circle, rgba(192,132,252,0.3) 0%, transparent 70%)",
    animation: "glowPulse 2s ease infinite",
  },
  splashTitle: {
    fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 600,
    color: "#e9d5ff", letterSpacing: 2, marginBottom: 8, textAlign: "center",
  },
  splashSub: { fontSize: 13, color: "rgba(233,213,255,0.45)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 48 },
  splashDots: { display: "flex", gap: 8 },
  dot: { width: 7, height: 7, borderRadius: "50%", background: "#c084fc", display: "inline-block", animation: "pulse 1.2s ease infinite" },
  splashDev: { position: "absolute", bottom: 24, fontSize: 11, color: "rgba(233,213,255,0.2)", letterSpacing: 1 },

  // Root
  root: { minHeight: "100vh", background: "#0f0720", fontFamily: "'Nunito', sans-serif", color: "#f0e6ff", position: "relative", overflowX: "hidden", maxWidth: 480, margin: "0 auto" },
  bgGrad: { position: "fixed", inset: 0, background: "linear-gradient(160deg, #0f0720 0%, #1e0b3a 60%, #0f0720 100%)", zIndex: 0 },
  bgOrbs: { position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" },
  orb: { position: "absolute", borderRadius: "50%" },
  screen: { position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", flexDirection: "column" },

  // Toast
  toast: {
    position: "fixed", bottom: 30, left: "50%", transform: "translateX(-50%)",
    background: "rgba(192,132,252,0.95)", color: "#1a0a2e", padding: "10px 26px",
    borderRadius: 30, fontWeight: 700, fontSize: 14, zIndex: 9999,
    animation: "toastIn 0.3s ease", boxShadow: "0 4px 24px rgba(192,132,252,0.45)", whiteSpace: "nowrap",
  },

  // AppBar
  appBar: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "16px 20px 14px",
    background: "rgba(15,7,32,0.9)", backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(192,132,252,0.12)",
    position: "sticky", top: 0, zIndex: 50,
  },
  appBarLeft: { display: "flex", alignItems: "center", gap: 12 },
  appName: { fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: "#e9d5ff", letterSpacing: 0.5 },
  appSub: { fontSize: 11, color: "rgba(233,213,255,0.35)", marginTop: 1 },
  fab: {
    width: 38, height: 38, borderRadius: 12,
    background: "linear-gradient(135deg, #9333ea, #ec4899)",
    border: "none", color: "#fff", fontSize: 22, lineHeight: 1,
    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: "0 3px 14px rgba(147,51,234,0.5)",
  },

  // Search
  searchWrap: {
    margin: "14px 16px 0", display: "flex", alignItems: "center",
    background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(192,132,252,0.15)",
    borderRadius: 14, padding: "0 14px",
  },
  searchIcon: { fontSize: 14, marginRight: 8, opacity: 0.5 },
  searchInput: {
    flex: 1, background: "none", border: "none", padding: "11px 0",
    color: "#f0e6ff", fontSize: 14, outline: "none",
  },
  clearBtn: { background: "none", border: "none", color: "rgba(240,230,255,0.4)", cursor: "pointer", fontSize: 14, padding: "4px" },

  // Tabs
  tabs: { display: "flex", margin: "14px 16px 0", gap: 8 },
  tab: {
    flex: 1, padding: "9px 0", borderRadius: 12, border: "1.5px solid rgba(192,132,252,0.15)",
    background: "transparent", color: "rgba(240,230,255,0.45)", fontSize: 13, fontWeight: 600, cursor: "pointer",
    transition: "all 0.2s",
  },
  tabActive: { background: "rgba(192,132,252,0.15)", borderColor: "rgba(192,132,252,0.45)", color: "#e9d5ff" },

  // Tags
  tagScroll: {
    display: "flex", overflowX: "auto", gap: 8, padding: "12px 16px",
    scrollbarWidth: "none", msOverflowStyle: "none",
  },
  chip: {
    flexShrink: 0, padding: "5px 14px", borderRadius: 20,
    border: "1.5px solid rgba(192,132,252,0.25)", background: "transparent",
    color: "rgba(240,230,255,0.5)", fontSize: 12, fontWeight: 600, cursor: "pointer",
  },
  chipActive: { background: "rgba(192,132,252,0.2)", borderColor: "#c084fc", color: "#c084fc" },

  // Card list
  cardList: { flex: 1, overflowY: "auto", padding: "8px 16px 0" },
  card: {
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(192,132,252,0.15)",
    borderRadius: 18, padding: "18px 18px 14px", marginBottom: 12, cursor: "pointer",
    position: "relative", animation: "fadeUp 0.4s ease both",
    transition: "border-color 0.2s, background 0.2s",
  },
  cardTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  cardDate: { fontSize: 10, color: "rgba(240,230,255,0.3)", letterSpacing: 1 },
  favBtn: { background: "none", border: "none", cursor: "pointer", fontSize: 16, padding: 0 },
  cardTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: "#e9d5ff", marginBottom: 8 },
  cardPreview: { fontSize: 13, color: "rgba(240,230,255,0.5)", lineHeight: 1.65, whiteSpace: "pre-line", fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif" },
  cardTagRow: { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 },
  cardTagPill: { fontSize: 11, fontWeight: 700, padding: "2px 10px", borderRadius: 10 },
  cardArrow: { position: "absolute", right: 18, top: "50%", transform: "translateY(-50%)", fontSize: 22, color: "rgba(192,132,252,0.3)" },

  // Empty
  empty: { textAlign: "center", padding: "80px 20px", animation: "fadeUp 0.5s ease" },

  // NavBar
  navBar: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "14px 16px",
    background: "rgba(15,7,32,0.9)", backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(192,132,252,0.12)",
    position: "sticky", top: 0, zIndex: 50,
  },
  navBack: { background: "none", border: "none", color: "#c084fc", fontSize: 30, cursor: "pointer", lineHeight: 1, padding: "0 4px", width: 36 },
  navTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: "#e9d5ff" },
  navFav: { background: "none", border: "none", cursor: "pointer", fontSize: 18, width: 36, textAlign: "right" },

  // Read
  readBody: { flex: 1, overflowY: "auto", padding: "28px 24px 100px", animation: "fadeUp 0.35s ease" },
  readMeta: { fontSize: 11, color: "rgba(240,230,255,0.3)", letterSpacing: 1, marginBottom: 10 },
  readTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: 30, fontWeight: 600, color: "#e9d5ff", lineHeight: 1.25 },
  readDivider: { height: 1, background: "linear-gradient(90deg, rgba(192,132,252,0.5), transparent)", margin: "20px 0" },
  readContent: { fontFamily: "'Cormorant Garamond', serif", fontSize: 18, lineHeight: 2.1, color: "rgba(240,230,255,0.82)", whiteSpace: "pre-wrap", fontStyle: "italic", fontWeight: 300 },

  // Action bar
  actionBar: {
    position: "sticky", bottom: 0,
    display: "flex", gap: 10, padding: "12px 16px 20px",
    background: "rgba(15,7,32,0.95)", borderTop: "1px solid rgba(192,132,252,0.12)",
  },
  actionEdit: {
    flex: 1, background: "linear-gradient(135deg, #9333ea, #ec4899)",
    border: "none", borderRadius: 14, padding: "13px", color: "#fff",
    fontSize: 15, fontWeight: 700, cursor: "pointer",
    boxShadow: "0 3px 16px rgba(147,51,234,0.4)",
  },
  actionDel: {
    width: 50, background: "rgba(244,114,182,0.1)",
    border: "1.5px solid rgba(244,114,182,0.3)", borderRadius: 14,
    color: "#f472b6", fontSize: 18, cursor: "pointer",
  },

  // Write
  writeBody: { flex: 1, overflowY: "auto", padding: "24px 20px 40px", animation: "fadeUp 0.35s ease" },
  fieldGroup: { marginBottom: 20 },
  fieldLabel: { fontSize: 10, fontWeight: 700, color: "rgba(192,132,252,0.55)", letterSpacing: 1.5, marginBottom: 8 },
  fieldInput: {
    width: "100%", background: "rgba(255,255,255,0.05)",
    border: "1.5px solid rgba(192,132,252,0.2)", borderRadius: 14,
    padding: "13px 16px", color: "#f0e6ff", fontSize: 15,
    transition: "border-color 0.2s",
  },
  fieldTextarea: {
    width: "100%", background: "rgba(255,255,255,0.05)",
    border: "1.5px solid rgba(192,132,252,0.2)", borderRadius: 14,
    padding: "14px 16px", color: "#f0e6ff", fontSize: 17,
    fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
    lineHeight: 1.9, resize: "none", transition: "border-color 0.2s",
  },
  saveBtn: {
    width: "100%", marginTop: 8,
    background: "linear-gradient(135deg, #9333ea, #ec4899)",
    border: "none", borderRadius: 16, padding: "15px",
    color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer",
    boxShadow: "0 4px 20px rgba(147,51,234,0.45)",
    transition: "opacity 0.2s",
  },
};
