import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Sparkles, Brain, Heart, BarChart3, X, Layers, Zap, Trophy, ArrowUpRight, Code2, Globe2, ShieldCheck, ZapIcon } from 'lucide-react';

const translations = {
  tr: {
    nav: { manifesto: "Vizyonumuz", works: "Labs", solutions: "Solutions", contact: "İletişim" },
    hero: {
      badge: "Nordic Tech & Innovation",
      title1: "Kodun Ötesinde,",
      title2: "Avrupa Standartlarında Yapay Zeka Mühendisliği.",
      desc: "Mercan Works, Estonya'nın dijital inovasyon kültürünü yapay zeka ile birleştiriyor. Jung psikolojisinden kompleks e-ticaret iş zekasına kadar, global ölçekte SaaS ve mobil çözümler üreten yeni nesil teknoloji stüdyosu."
    },
    vision: {
      title: "Kuzey Avrupa Disiplini, Global Vizyon",
      desc: "Teknoloji dünyasının kalbi Tallinn'den ilham alarak, veri gizliliğini (GDPR) ve etik kodlamayı merkeze koyuyoruz. Sadece yazılım üretmiyoruz; insan psikolojisine saygılı 'Huzurlu Teknoloji' (Calm Tech) ve işletmelere kârlılık katan 'Analitik Zeka' sistemleri inşa ediyoruz. MVP sürecinden Scale-up aşamasına kadar, Avrupa standartlarında mühendislik sunuyoruz."
    },
    visionBoxes: [
      { title: "Global & Remote", desc: "Sınırlara inanmayan, Estonya merkezli dijital göçebe kültürü.", icon: Globe2 },
      { title: "GDPR & Etik AI", desc: "Veri mahremiyetine ve insan onuruna saygılı şeffaf algoritmalar.", icon: ShieldCheck }
    ],
    features: [
      { title: "İş Zekası (BI) & Veri Madenciliği", desc: "Veri yığınlarını anlamlı stratejilere dönüştüren, rekabet avantajı sağlayan kurumsal paneller.", icon: BarChart3 },
      { title: "Özel Yapay Zeka Geliştirme", desc: "Şirketinize özel eğitilmiş LLM modelleri ve süreç otomasyonu (RPA) çözümleri.", icon: Code2 },
      { title: "Dijital Dönüşüm Danışmanlığı", desc: "Avrupa standartlarında dijitalleşme yol haritası ve teknoloji danışmanlığı.", icon: Sparkles }
    ],
    portfolio: { label: "Labs", title: "Deneysel Projeler", viewCase: "İncele" },
    solutions: { label: "Solutions", title: "Hizmetlerimiz" },
    modal: {
      challenge: "Zorluk",
      solution: "Çözüm",
      impact: "Etki",
      visit: "Bize Ulaşın"
    },
    cta: {
      title: "İşinizi Sınırların",
      titleAccent: "Ötesine Taşıyın.",
      desc: "Veri odaklı yaklaşımımızla e-ticaret ve dış ticaret operasyonlarınızı optimize ediyoruz. İster ürün tedariki ister stratejik danışmanlık ihtiyacınız olsun; Mercan Works ile global pazarda sağlam bir yer edinin.",
      button: "Bize Ulaşın"
    },
    projects: [
      {
       title: "ECOMEYE",
        subtitle: "E-Ticaret Zekası",
        desc: "E-ticaret operasyonlarındaki gizli giderleri ve kargo açıklarını yakalayan AI CFO.",
        challenge: ["E-ticaret yöneticileri, brüt ciroya odaklanırken 'görünmez giderler' nedeniyle net kârlarında %15-%20'ye varan kayıplar yaşamaktadır.", "Manuel takibi imkansız olan hatalı desi ölçümleri, ölü stok maliyetleri ve komisyon hataları nakit akışını bozmaktadır."],
        solution: ["Kargo entegrasyonu ile kesilen faturalardaki hatalı desi ölçümlerini otomatik tespit eder.", "Ürün bazlı net kârlılığı (Unit Economics) anlık hesaplar.", "Stok devir hızını analiz ederek 'Ölü Stokları' nakde çevirme stratejisi sunar."],
        impact: ["Pilot işletmelerde, sadece kargo kaçağı tespitiyle aylık ortalama %12 maliyet tasarrufu sağlandı.", "İşletme sahiplerine proaktif ve önleyici bir finansal vizyon kazandırıldı."],
        color: "from-emerald-500 to-cyan-600",
        image: "/ecomeye.webp",
        icon: <BarChart3 className="w-6 h-6" />,
        tech: ["FinTech", "Predictive Analytics", "Automation"],
        theme: "tech"
      },
      {
        title: "GÖLGE",
        subtitle: "Gölge Benlik Analizi",
        desc: "Jung psikolojisi tabanlı, uçtan uca şifreli kişisel farkındalık asistanı.",
        challenge: ["Mevcut mental sağlık uygulamaları genellikle yüzeysel olumlamalarla sınırlı kalmakta ve kullanıcının bilinçaltı kök sorunlarına inememektedir.", "Kullanıcıların en mahrem itiraflarını paylaşabileceği %100 güvenli ve yargısız bir dijital alan eksikliği bulunmaktadır."],
        solution: ["Carl Jung'un 'Gölge Benlik' teorisini işleyen özel bir LLM (Large Language Model) mimarisi geliştirdik.", "Kriz protokollerine sahip bu yapay zeka, kullanıcıyı teselli etmek yerine doğru sorularla yüzleştirir.", "Veriler, askeri düzeyde şifreleme ile korunur ve tamamen anonimdir."],
        impact: ["Kapalı beta testlerinde kullanıcıların %85'i, geleneksel yöntemlere göre daha hızlı bir duygusal rahatlama (Catharsis) yaşadığını bildirdi.", "Sektörde ilk kez 'Psikolojik Arketip Analizi' yapan bir AI modeli başarıyla uygulandı."],
        color: "from-sky-500 to-indigo-600",
        image: "/golge.webp",
        icon: <Brain className="w-6 h-6" />,
        tech: ["Psychometrics", "Generative AI", "Encryption"],
        theme: "dark"
      },
      {
        title: "MERCY AND DESTINY",
        subtitle: "Sosyal İyilik Platformu",
        desc: "Dijital toksisiteye karşı geliştirilen, lokasyon bazlı ve geçici içerikli 'İyilik' ağı.",
        challenge: ["Sosyal medya platformları, kullanıcıları bağımlı kılan dopamin döngüleri ve siber zorbalık üzerine kuruludur.", "İnsanlar, dijital kalabalıklar içinde yalnızlaşmakta ve çevrelerindeki gerçek 'iyilik' potansiyelini görememektedir."],
        solution: ["Kullanıcıların ayda sadece 1 fotoğraf hakkı vardır.", "Yüklenen 'İyilik' fotoğrafları, zamanla piksel piksel silinerek 'An'ın geçiciliğini' vurgular.", "Her paylaşım, kullanıcının 5-10km yarıçapındaki haritada anonim bir 'İyilik Pini' oluşturarak yerel topluluk bilincini artırır."],
        impact: ["Sosyal medya yorgunluğunu (Social Media Fatigue) ortadan kaldıran, rekabet yerine iş birliğini teşvik eden 'Yavaş Teknoloji' (Slow Tech) hareketi başlatıldı.", "Yerel topluluklarda aidiyet duygusunu %90 artırmayı hedefleyen bir MVP."],
        color: "from-rose-400 to-purple-500",
        image: "/mercy.webp",
        icon: <Heart className="w-6 h-6" />,
        tech: ["Social Engineering", "Anti-Dopamine", "Geo-Location"],
        theme: "light"
      }
    ]
  },
  en: {
    nav: { manifesto: "Our Vision", works: "Labs", solutions: "Solutions", contact: "Contact" },
    hero: {
      badge: "Nordic Tech & Innovation",
      title1: "Beyond Code,",
      title2: "European Standards in AI Engineering.",
      desc: "Mercan Works merges Estonia's digital innovation culture with artificial intelligence. From Jungian psychology to complex e-commerce business intelligence, we are a new-generation tech studio building global SaaS and mobile solutions."
    },
    vision: {
      title: "Northern European Discipline, Global Vision",
      desc: "Inspired by Tallinn, the heart of the tech world, we place data privacy (GDPR) and ethical coding at our core. We don't just build software; we build 'Calm Tech' that respects human psychology and 'Analytical Intelligence' systems that drive profitability. From MVP to Scale-up, we deliver engineering at European standards."
    },
    visionBoxes: [
      { title: "Global & Remote", desc: "A borderless, Estonia-based digital nomad culture.", icon: Globe2 },
      { title: "GDPR & Ethical AI", desc: "Transparent algorithms respecting data privacy and human dignity.", icon: ShieldCheck }
    ],
    features: [
      { title: "Business Intelligence (BI) & Data Mining", desc: "Enterprise dashboards transforming data piles into meaningful strategies for competitive advantage.", icon: BarChart3 },
      { title: "Custom AI Development", desc: "Custom-trained LLM models and robotic process automation (RPA) solutions for your company.", icon: Code2 },
      { title: "Digital Transformation Consultancy", desc: "Digitalization roadmap and technology consultancy at European standards.", icon: Sparkles }
    ],
    portfolio: { label: "Labs", title: "Experimental Projects", viewCase: "Review" },
    solutions: { label: "Solutions", title: "Our Services" },
    modal: {
      challenge: "The Challenge",
      solution: "The Solution",
      impact: "Impact",
      visit: "Contact Us"
    },
    cta: {
      title: "Take Your Business",
      titleAccent: "Beyond Borders.",
      desc: "Optimize your e-commerce and foreign trade operations with our data-driven approach. Whether you need product sourcing or strategic consultancy, secure a strong place in the global market with Mercan Works.",
      button: "Contact Us"
    },
    projects: [
      {
        title: "ECOMEYE",
        subtitle: "E-Commerce Intelligence",
        desc: "AI CFO catching hidden expenses and shipping discrepancies in e-commerce operations.",
        challenge: ["E-commerce managers focus on gross turnover while losing 15%-20% of net profit due to 'invisible expenses'.", "Manual tracking is impossible for wrong shipping dimensions, dead stock costs, and marketplace commission errors."],
        solution: ["Automatically detects wrong dimension measurements in invoices via shipping integration.", "Instantly calculates unit economics.", "Analyzes inventory turnover to provide strategies for turning 'Dead Stock' into cash."],
        impact: ["Pilot businesses achieved an average monthly cost saving of 12% just through shipping leakage detection.", "Business owners gained a proactive and preventive financial vision instead of end-of-month surprise tax and expense tables."],
        color: "from-emerald-500 to-cyan-600",
        image: "/ecomeye.webp",
        icon: <BarChart3 className="w-6 h-6" />,
        tech: ["FinTech", "Predictive Analytics", "Automation"],
        theme: "tech"
      },
      {
        title: "SHADOW",
        subtitle: "The Shadow Self AI",
        desc: "End-to-end encrypted personal awareness assistant based on Jungian psychology.",
        challenge: ["Existing mental health apps often stay limited to superficial affirmations and fail to reach the user's subconscious root issues.", "There's a lack of a 100% secure, non-judgmental digital space for intimate confessions."],
        solution: ["We developed a custom LLM architecture processing Carl Jung's 'Shadow Self' theory.", "This AI, equipped with crisis protocols, confronts the user with the right questions instead of just offering comfort.", "Data is protected by military-grade encryption and remains completely anonymous."],
        impact: ["In closed beta tests, 85% of users reported faster emotional relief (Catharsis) compared to traditional methods.", "An AI model performing 'Psychological Archetype Analysis' was successfully implemented for the first time in the industry."],
        color: "from-sky-500 to-indigo-600",
        image: "/golge.webp",
        icon: <Brain className="w-6 h-6" />,
        tech: ["Psychometrics", "Generative AI", "Encryption"],
        theme: "dark"
      },
      {
        title: "MERCY AND DESTINY",
        subtitle: "Social Goodness Platform",
        desc: "Location-based goodness network with ephemeral content, developed against digital toxicity.",
        challenge: ["Social media platforms are built on dopamine loops and cyberbullying that make users addicted.", "People are becoming lonely in digital crowds and failing to see the real 'goodness' potential around them."],
        solution: ["Users have only 1 photo right per month.", "Uploaded 'Goodness' photos pixelate and fade over time, emphasizing the 'transience of the moment'.", "Each post creates an anonymous 'Goodness Pin' on a 5-10km radius map, increasing local community awareness."],
        impact: ["The 'Slow Tech' movement was launched, eliminating social media fatigue and encouraging collaboration over competition.", "An MVP aimed at increasing the sense of belonging in local communities by 90%."],
        color: "from-rose-400 to-purple-500",
        image: "/mercy.webp",
        icon: <Heart className="w-6 h-6" />,
        tech: ["Social Engineering", "Anti-Dopamine", "Geo-Location"],
        theme: "light"
      }
    ]
  },
  de: {
    nav: { manifesto: "Unsere Vision", works: "Labs", solutions: "Solutions", contact: "Kontakt" },
    hero: {
      badge: "Nordic Tech & Innovation",
      title1: "Jenseits des Codes,",
      title2: "KI-Engineering nach europäischen Standards.",
      desc: "Mercan Works verbindet Estlands Kultur der digitalen Innovation mit künstlicher Intelligenz. Von Jung'scher Psychologie bis hin zu komplexer E-Commerce-Business-Intelligence sind wir ein Technologiestudio der neuen Generation, das globale SaaS- und Mobil-Lösungen entwickelt."
    },
    vision: {
      title: "Nordeuropäische Disziplin, Globale Vision",
      desc: "Inspiriert von Tallinn, dem Herzen der Technologiewelt, stellen wir Datenschutz (DSGVO) und ethische Programmierung ins Zentrum unseres Schaffens. Wir entwickeln nicht nur Software; wir erschaffen 'Calm Tech', der die menschliche Psychologie respektiert, sowie analytische Intelligenzsysteme, die die Profitabilität steigern. Vom MVP bis zum Scale-up liefern wir Engineering auf europäischem Spitzenniveau."
    },
    visionBoxes: [
      { title: "Global & Remote", desc: "Eine grenzenlose, in Estland ansässige digitale Nomadenkultur.", icon: Globe2 },
      { title: "DSGVO & Ethische KI", desc: "Transparente Algorithmen, die den Datenschutz und die menschliche Würde respektieren.", icon: ShieldCheck }
    ],
    features: [
      { title: "Business Intelligence (BI) & Data Mining", desc: "Unternehmens-Dashboards, die Datenmengen in aussagekräftige Strategien für Wettbewerbsvorteile verwandeln.", icon: BarChart3 },
      { title: "Maßgeschneiderte KI-Entwicklung", desc: "Speziell trainierte LLM-Modelle und Prozessautomatisierung (RPA) für Ihr Unternehmen.", icon: Code2 },
      { title: "Beratung zur digitalen Transformation", desc: "Roadmap zur Digitalisierung und Technologieberatung nach europäischen Standards.", icon: Sparkles }
    ],
    portfolio: { label: "Labs", title: "Experimentelle Projekte", viewCase: "Prüfen" },
    solutions: { label: "Solutions", title: "Unsere Dienstleistungen" },
    modal: {
      challenge: "Herausforderung",
      solution: "Lösung",
      impact: "Auswirkung",
      visit: "Kontaktieren Sie uns"
    },
    cta: {
      title: "Bringen Sie Ihr Geschäft",
      titleAccent: "über Grenzen hinweg.",
      desc: "Optimieren Sie Ihre E-Commerce- und Außenhandelsgeschäfte mit unserem datengesteuerten Ansatz. Ob Produktbeschaffung oder strategische Beratung – sichern Sie sich mit Mercan Works einen starken Platz auf dem globalen Markt.",
      button: "Kontaktieren Sie uns"
    },
    projects: [
      {
        title: "ECOMEYE",
        subtitle: "E-Commerce-Intelligenz",
        desc: "KI-CFO, der versteckte Kosten und Versandunstimmigkeiten im E-Commerce-Betrieb aufdeckt.",
        challenge: ["E-Commerce-Manager konzentrieren sich auf den Bruttoumsatz, während sie 15%-20% des Nettogewinns durch 'unsichtbare Kosten' verlieren.", "Manuelle Nachverfolgung ist bei falschen Versandmaßen, Lagerhüterkosten und Marktplatz-Provisionsfehlern unmöglich."],
        solution: ["Erkennt automatisch falsche Maßangaben in Rechnungen über die Versandintegration.", "Berechnet sofort die Unit Economics.", "Analysiert den Lagerumschlag, um Strategien zu liefern, wie 'totes Kapital' in Bargeld umgewandelt werden kann."],
        impact: ["Pilotunternehmen erzielten allein durch die Erkennung von Versandverlusten eine durchschnittliche monatliche Kostenersparnis von 12%.", "Geschäftsinhaber erhielten eine proaktive und präventive Finanzvision statt überraschender Steuer- und Kostentabellen am Monatsende."],
        color: "from-emerald-500 to-cyan-600",
        image: "/ecomeye.webp",
        icon: <BarChart3 className="w-6 h-6" />,
        tech: ["FinTech", "Predictive Analytics", "Automation"],
        theme: "tech"
      },
      {
        title: "SHADOW",
        subtitle: "Schatten-Selbst-Analyse",
        desc: "End-zu-End verschlüsselter persönlicher Bewusstseins-Assistent basierend auf Jung'scher Psychologie.",
        challenge: ["Bestehende Apps für mentale Gesundheit bleiben oft bei oberflächlichen Affirmationen stehen und erreichen nicht die unterbewussten Wurzelprobleme.", "Es fehlt an einem 100% sicheren, urteilsfreien digitalen Raum für intimste Geständnisse."],
        solution: ["Wir haben eine eigene LLM-Architektur entwickelt, die Carl Jungs Theorie vom 'Schatten-Selbst' verarbeitet.", "Diese KI, ausgestattet mit Krisenprotokollen, konfrontiert den Nutzer mit den richtigen Fragen, anstatt nur Trost zu spenden.", "Die Daten sind durch militärische Verschlüsselung geschützt und bleiben völlig anonym."],
        impact: ["In geschlossenen Betatests berichteten 85% der Nutzer von einer schnelleren emotionalen Erleichterung (Katharsis) im Vergleich zu herkömmlichen Methoden.", "Ein KI-Modell zur 'Psychologischen Archetypen-Analyse' wurde erstmals in der Branche erfolgreich implementiert."],
        color: "from-sky-500 to-indigo-600",
        image: "/golge.webp",
        icon: <Brain className="w-6 h-6" />,
        tech: ["Psychometrics", "Generative AI", "Encryption"],
        theme: "dark"
      },
      {
        title: "MERCY AND DESTINY",
        subtitle: "Plattform für soziales Wohlbefinden",
        desc: "Standortbasiertes Netzwerk für das Gemeinwohl mit flüchtigen Inhalten, entwickelt gegen digitale Toxizität.",
        challenge: ["Social-Media-Plattformen basieren auf Dopamin-Schleifen und Cybermobbing, die Nutzer süchtig machen.", "Menschen vereinsamen in digitalen Massen und erkennen das reale 'Güte'-Potenzial um sie herum nicht."],
        solution: ["Nutzer haben nur 1 Fotorecht pro Monat.", "Hochgeladene 'Güte'-Fotos verpixeln und verblassen mit der Zeit, was die 'Vergänglichkeit des Augenblicks' betont.", "Jeder Post erstellt einen anonymen 'Güte-Pin' auf einer Karte im Umkreis von 5-10km, was das Bewusstsein für die lokale Gemeinschaft stärkt."],
        impact: ["Die 'Slow Tech'-Bewegung wurde gestartet, die Social-Media-Müdigkeit eliminiert und Zusammenarbeit statt Wettbewerb fördert.", "Ein MVP, das darauf abzielt, das Zugehörigkeitsgefühl in lokalen Gemeinschaften um 90% zu steigern."],
        color: "from-rose-400 to-purple-500",
        image: "/mercy.webp",
        icon: <Heart className="w-6 h-6" />,
        tech: ["Social Engineering", "Anti-Dopamine", "Geo-Location"],
        theme: "light"
      }
    ]
  }
};

function App() {
  const [lang, setLang] = useState('tr');
  const t = translations[lang];

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const selectedProject = selectedProjectIndex !== null ? t.projects[selectedProjectIndex] : null;

  useEffect(() => {
    if (selectedProjectIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProjectIndex]);

  const handleEmailClick = () => {
    window.location.href = "mailto:info@mercanworks.com?subject=Inquiry for AI and Software Solutions";
  };

  const toggleLanguage = () => {
    const langs = ['tr', 'en', 'de'];
    const nextIdx = (langs.indexOf(lang) + 1) % langs.length;
    setLang(langs[nextIdx]);
  };

  return (
    <div className="min-h-screen bg-mercan-50 text-mercan-900 font-sans selection:bg-mercan-coral selection:text-white overflow-hidden">
      
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-mercan-coral to-mercan-teal transform origin-left z-50"
        style={{ scaleX }}
      />

      <nav className="fixed top-0 left-0 right-0 z-40 flex justify-center pt-6 px-4">
        <div className="glass-card px-4 md:px-6 py-3 rounded-full flex items-center space-x-4 md:space-x-8 shadow-xl border border-black/5 bg-white/70 backdrop-blur-md">
          <span className="font-display font-bold text-lg md:text-xl tracking-tighter text-mercan-900">
            MERCAN<span className="text-mercan-coral">.</span>
          </span>
          <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-400">
            <a href="#vision" className="hover:text-mercan-900 transition-colors">{t.nav.manifesto}</a>
            <a href="#labs" className="hover:text-mercan-900 transition-colors">{t.nav.works}</a>
            <a href="#solutions" className="hover:text-mercan-900 transition-colors">{t.nav.solutions}</a>
            <a href="#contact" className="hover:text-mercan-900 transition-colors">{t.nav.contact}</a>
          </div>
          <button 
            onClick={toggleLanguage}
            className="bg-mercan-900 hover:bg-black text-white px-4 py-1.5 rounded-full text-xs font-mono transition-all uppercase cursor-pointer"
          >
            {lang}
          </button>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-mercan-coral/20 rounded-full blur-[120px] animate-pulse-slow mix-blend-multiply" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-mercan-teal/20 rounded-full blur-[120px] animate-pulse-slow delay-1000 mix-blend-multiply" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 inline-flex items-center space-x-2 border border-black/5 rounded-full px-4 py-1.5 bg-white/50 backdrop-blur-sm shadow-sm"
          >
            <ZapIcon className="w-4 h-4 text-mercan-coral" />
            <span className="text-xs font-mono text-gray-500 tracking-wider uppercase">{t.hero.badge}</span>
          </motion.div>

          <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-7xl lg:text-8xl tracking-tight leading-tight md:leading-[1.1] mb-8 text-mercan-900 break-words">
            {t.hero.title1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-mercan-coral via-mercan-900 to-mercan-teal">
              {t.hero.title2}
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-500 font-light leading-relaxed">
            {t.hero.desc}
          </p>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-gray-300 to-transparent" />
        </motion.div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-32 relative z-10 border-t border-gray-100 bg-white/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2">
              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-8 text-mercan-900 break-words">{t.vision.title}</h2>
              <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed">
                {t.vision.desc}
              </p>
            </div>
            <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.visionBoxes.map((box, i) => (
                <div key={i} className="glass-card rounded-3xl flex flex-col p-8 bg-white/60">
                  <box.icon className="w-10 h-10 text-mercan-coral mb-6" />
                  <h4 className="font-display font-bold text-lg mb-2">{box.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{box.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <span className="text-mercan-coral font-mono text-sm tracking-wider uppercase">{t.solutions.label}</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mt-2 text-mercan-900 break-words">{t.solutions.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.features.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="glass-card p-8 rounded-2xl hover:shadow-lg transition-all group cursor-default bg-white/60"
              >
                <item.icon className="w-8 h-8 text-mercan-coral mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-display font-bold text-2xl mb-4 text-mercan-900">{item.title}</h3>
                <p className="text-gray-500 font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Labs Section */}
      <section id="labs" className="py-32 relative z-10 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-20"
          >
            <div>
              <span className="text-mercan-coral font-mono text-sm tracking-wider uppercase">{t.portfolio.label}</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mt-2 text-mercan-900 break-words">{t.portfolio.title}</h2>
            </div>
            <div className="hidden md:block w-32 h-px bg-gray-200 mb-4" />
          </motion.div>

          <div className="space-y-32">
            {t.projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`group relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={`relative aspect-[4/3] rounded-3xl overflow-hidden glass-card p-1 shadow-xl ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
                  <div className="absolute inset-4 rounded-2xl bg-white border border-gray-100 flex items-center justify-center overflow-hidden">
                    
                    {/* --- RESIM DUZELTMESI BURADA YAPILDI --- */}
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                    />
                    {/* ------------------------------------- */}

                  </div>
                </div>

                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 rounded-lg bg-gray-100 text-mercan-coral border border-gray-200">
                      {project.icon}
                    </div>
                    <span className="font-mono text-sm text-gray-500">{project.subtitle}</span>
                  </div>
                  
                  <h3 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl mb-6 text-mercan-900 group-hover:text-mercan-coral transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-8">
                    {project.tech.map((t, i) => (
                      <span key={i} className="px-3 py-1 rounded-full text-xs font-mono bg-gray-100 border border-gray-200 text-gray-600">
                        {t}
                      </span>
                    ))}
                  </div>

                  <button 
                    onClick={() => setSelectedProjectIndex(index)}
                    className="flex items-center space-x-2 text-mercan-900 hover:text-mercan-coral transition-colors group/btn font-medium cursor-pointer"
                  >
                    <span>{t.portfolio.viewCase}</span>
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center px-4"
          >
            <div className="absolute inset-0 bg-white/80 backdrop-blur-xl" onClick={() => setSelectedProjectIndex(null)} />
            <motion.div
              layoutId={`project-${selectedProjectIndex}`}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-card bg-white shadow-2xl rounded-3xl p-8 md:p-12 z-10"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.6 }}
            >
              <button onClick={() => setSelectedProjectIndex(null)} className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                <X className="w-5 h-5 text-gray-600" />
              </button>

              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 rounded-lg bg-gray-100 text-mercan-coral border border-gray-200">
                    {selectedProject.icon}
                  </div>
                  <span className="font-mono text-sm text-gray-500 uppercase tracking-wider">{selectedProject.subtitle}</span>
                </div>
                <h3 className="font-display font-bold text-4xl md:text-6xl text-mercan-900 mb-6 leading-tight">{selectedProject.title}</h3>
                <p className="text-xl text-gray-600 font-light leading-relaxed border-l-4 border-mercan-coral pl-6">{selectedProject.desc}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-left">
                <div className="p-6 bg-gray-50 rounded-2xl">
                   <div className="flex items-center space-x-2 mb-3 text-mercan-900 font-bold">
                      <Zap className="w-4 h-4 text-mercan-coral" />
                      <span>{t.modal.challenge}</span>
                   </div>
                   <ul className="text-sm text-gray-600 leading-relaxed space-y-2">
                     {selectedProject.challenge.map((item, idx) => (
                       <li key={idx} className="flex items-start"><span className="mr-2 text-mercan-coral">•</span>{item}</li>
                     ))}
                   </ul>
                </div>
                <div className="p-6 bg-gray-50 rounded-2xl">
                   <div className="flex items-center space-x-2 mb-3 text-mercan-900 font-bold">
                      <Layers className="w-4 h-4 text-mercan-coral" />
                      <span>{t.modal.solution}</span>
                   </div>
                   <ul className="text-sm text-gray-600 leading-relaxed space-y-2">
                     {selectedProject.solution.map((item, idx) => (
                       <li key={idx} className="flex items-start"><span className="mr-2 text-mercan-coral">•</span>{item}</li>
                     ))}
                   </ul>
                </div>
                <div className="p-6 bg-gray-50 rounded-2xl">
                   <div className="flex items-center space-x-2 mb-3 text-mercan-900 font-bold">
                      <Trophy className="w-4 h-4 text-mercan-coral" />
                      <span>{t.modal.impact}</span>
                   </div>
                   <ul className="text-sm text-gray-600 leading-relaxed space-y-2">
                     {selectedProject.impact.map((item, idx) => (
                       <li key={idx} className="flex items-start"><span className="mr-2 text-mercan-coral">•</span>{item}</li>
                     ))}
                   </ul>
                </div>
              </div>

              <div className="flex items-center justify-between pt-8 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((t, i) => (
                    <span key={i} className="px-3 py-1 rounded-full text-xs font-mono bg-white border border-gray-200 text-gray-500">{t}</span>
                  ))}
                </div>
                <button 
                  onClick={handleEmailClick}
                  className="px-6 py-3 bg-mercan-900 text-white rounded-full font-bold text-sm hover:bg-black transition-all cursor-pointer"
                >
                  {t.modal.visit}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="contact" className="py-32 relative z-10 overflow-hidden border-t border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-t from-mercan-coral/5 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-20">
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-7xl mb-8 text-mercan-900 break-words">
            {t.cta.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-mercan-coral to-mercan-violet">{t.cta.titleAccent}</span>
          </h2>
          <p className="text-xl text-gray-500 mb-12 font-light">{t.cta.desc}</p>
          <button 
            onClick={handleEmailClick}
            className="px-8 py-4 bg-mercan-coral text-white rounded-full font-bold text-lg hover:bg-mercan-900 transition-colors duration-300 shadow-[0_4px_14px_0_rgba(255,107,107,0.39)] hover:shadow-[0_6px_20px_rgba(255,107,107,0.23)] cursor-pointer"
          >
            {t.cta.button}
          </button>
        </div>
      </section>

      <footer className="py-12 border-t border-gray-200 relative z-10 bg-mercan-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            
            <div className="flex flex-col mb-4 md:mb-0">
               <div className="flex items-center space-x-2">
                 <span className="font-display font-bold text-xl tracking-tighter text-mercan-900">MERCAN<span className="text-mercan-coral">.</span></span>
               </div>
               
               {/* --- WISE ICIN GEREKLI SIRKET BILGISI ALANI --- */}
               <div className="mt-4 text-xs text-gray-500 font-mono leading-relaxed">
                 <p className="font-bold text-gray-800">MERCANWORKS OÜ</p>
                 <p>Harju maakond, Tallinn, Põhja-Tallinna linnaosa, Paavli tn 5a/1, 10412</p>
               </div>
               {/* ------------------------------------------- */}

            </div>

            <div className="flex flex-col items-end space-y-4">
              <div className="flex space-x-6 text-sm text-gray-500">
                 <a href="#" className="hover:text-mercan-coral transition-colors">LinkedIn</a>
                 <a href="#" className="hover:text-mercan-coral transition-colors">Instagram</a>
                 <a href="#" className="hover:text-mercan-coral transition-colors">Twitter</a>
              </div>
              <div className="text-xs text-gray-400 font-mono">
                © 2026 Mercan Works. {lang === 'tr' ? 'Tüm hakları saklıdır.' : lang === 'en' ? 'All rights reserved.' : 'Alle Rechte vorbehalten.'}
              </div>
            </div>
            
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;



