import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Sparkles, Brain, Heart, BarChart3, X, Layers, Zap, Trophy, ArrowUpRight } from 'lucide-react';

const translations = {
  tr: {
    nav: { manifesto: "Manifesto", works: "İşler", contact: "İletişim" },
    hero: {
      badge: "Dijital Etkileşimin Geleceği",
      title1: "Dijital",
      title2: "Simya",
      desc: "Mercan Works, karmaşık iş süreçlerini modern teknolojilerle basitleştirir. Stratejik veri analitiği ve kullanıcı deneyimi odaklı yaklaşımımızla dijital potansiyelinizi açığa çıkarıyoruz."
    },
    features: [
      { title: "Stratejik Veri", desc: "Veri odaklı kararlar ile belirsizliği ortadan kaldırıyoruz.", icon: BarChart3 },
      { title: "İnsan Odaklı", desc: "Teknoloji insan içindir. Kullanıcı deneyimini merkeze alıyoruz.", icon: Heart },
      { title: "Geleceğe Hazır", desc: "Yapay zeka entegrasyonu ile yarına bugünden hazır olun.", icon: Sparkles }
    ],
    portfolio: { label: "Portfolyo", title: "Seçili İşler", viewCase: "İncele" },
    modal: {
      challenge: "Zorluk",
      solution: "Çözüm",
      impact: "Etki",
      visit: "Canlı Siteyi Gör"
    },
    cta: {
      title: "Gelişmeye",
      titleAccent: "Hazır mısınız?",
      desc: "Bir sonraki büyük fikrinizi hayata geçirelim.",
      button: "Bize Ulaşın"
    },
    projects: [
      {
        title: "Gölge",
        subtitle: "İçsel Farkındalık Analitiği",
        desc: "Kullanıcıların kendi psikolojik süreçlerini analiz edebilecekleri, içsel farkındalık odaklı derinlikli bir analiz uygulaması.",
        challenge: "Geleneksel günlük uygulamaları pasiftir ve zihinsel sağlık için aksiyon alınabilir veriler sunmaz.",
        solution: "Duygu durum kalıplarını zaman içinde analiz eden ve duygusal yörüngeleri görselleştiren yapay zeka destekli bir motor geliştirdik.",
        impact: ["Günlük kullanıcı tutma oranında %40 artış", "'Yeni ve Dikkat Çekici' bölümünde öne çıktı", "1 milyondan fazla günlük girişi işlendi"],
        color: "from-sky-500 to-indigo-600",
        icon: <Brain className="w-6 h-6" />,
        tech: ["AI Analysis", "Psychometrics", "React Native"],
        theme: "dark"
      },
      {
        title: "Mercy and Destiny",
        subtitle: "Yavaş Sosyal Medya",
        desc: "Nezaket ve etik etkileşim odaklı, insan ruhunu yormayan sosyal platform. Slow social media akımının öncüsü.",
        challenge: "Sosyal medyadaki toksisite ve dopamin odaklı döngüler kullanıcıların zihinsel sağlığına zarar veriyor.",
        solution: "Düşünceli yanıtları ödüllendiren ve sonsuz kaydırmayı sınırlayan 'Yavaş Mod' etkileşim modeli.",
        impact: ["Betada sıfır siber zorbalık vakası", "Ortalama oturum süresi 3 dakika arttı", "Topluluk 10 bin organik kullanıcıya ulaştı"],
        color: "from-rose-400 to-purple-500",
        icon: <Heart className="w-6 h-6" />,
        tech: ["Ethical UX", "Community", "Node.js"],
        theme: "light"
      },
      {
        title: "EcomEye",
        subtitle: "Stratejik İş Zekası",
        desc: "E-ticaret dünyası için veri analitiği ve pazar takibi sağlayan, stratejik bir iş zekası aracı.",
        challenge: "E-ticaret yöneticileri veri içinde boğuluyor ancak rakip fiyatlandırması konusunda aksiyon alınabilir bilgiden yoksun.",
        solution: "Gerçek zamanlı veri çekme ve fiyatlandırma stratejileri öneren tahmine dayalı analitik paneli.",
        impact: ["Pilot müşterilerde %15 gelir artışı", "Analiz süresini %90 azalttı", "Günlük 50 binden fazla SKU takibi"],
        color: "from-emerald-500 to-cyan-600",
        icon: <BarChart3 className="w-6 h-6" />,
        tech: ["Big Data", "Analytics", "Dashboard"],
        theme: "tech"
      }
    ]
  },
  en: {
    nav: { manifesto: "Manifesto", works: "Works", contact: "Contact" },
    hero: {
      badge: "Future of Digital Interaction",
      title1: "Digital",
      title2: "Alchemy",
      desc: "Mercan Works simplifies complex business processes with modern technologies. We unlock your digital potential with our strategic data analytics and user experience-oriented approach."
    },
    features: [
      { title: "Strategic Data", desc: "We eliminate uncertainty with data-driven decisions.", icon: BarChart3 },
      { title: "Human Centric", desc: "Technology is for people. We put user experience at the center.", icon: Heart },
      { title: "Future Ready", desc: "Be ready for tomorrow today with AI integration.", icon: Sparkles }
    ],
    portfolio: { label: "Portfolio", title: "Selected Works", viewCase: "View Case Study" },
    modal: {
      challenge: "The Challenge",
      solution: "The Solution",
      impact: "Key Impact",
      visit: "Visit Live Site"
    },
    cta: {
      title: "Ready to",
      titleAccent: "Evolve?",
      desc: "Let's bring your next big idea to life.",
      button: "Contact Us"
    },
    projects: [
      {
        title: "Gölge",
        subtitle: "Inner Awareness Analytics",
        desc: "An in-depth analysis application focused on inner awareness where users can analyze their own psychological processes.",
        challenge: "Traditional journaling apps are passive and lack actionable insights for mental well-being.",
        solution: "We developed an AI-driven engine that analyzes sentiment patterns over time, visualizing emotional trajectories.",
        impact: ["40% increase in daily user retention", "Featured in 'New & Noteworthy'", "Processed 1M+ journal entries"],
        color: "from-sky-500 to-indigo-600",
        icon: <Brain className="w-6 h-6" />,
        tech: ["AI Analysis", "Psychometrics", "React Native"],
        theme: "dark"
      },
      {
        title: "Mercy and Destiny",
        subtitle: "Slow Social Media",
        desc: "A social platform focused on kindness and ethical interaction that does not tire the human soul. Pioneer of the slow social media movement.",
        challenge: "Social media toxicity and dopamine-driven engagement loops harm user mental health.",
        solution: "A 'Slow Mode' interaction model that rewards thoughtful responses and limits doom-scrolling.",
        impact: ["Zero cyberbullying incidents in beta", "Avg. session time increased by 3 mins", "Community grew to 10k organic users"],
        color: "from-rose-400 to-purple-500",
        icon: <Heart className="w-6 h-6" />,
        tech: ["Ethical UX", "Community", "Node.js"],
        theme: "light"
      },
      {
        title: "EcomEye",
        subtitle: "Strategic Business Intelligence",
        desc: "A strategic business intelligence tool providing data analytics and market tracking for the e-commerce world.",
        challenge: "E-commerce managers drown in data but starve for actionable insights on competitor pricing.",
        solution: "Real-time scraper and predictive analytics dashboard that suggests pricing strategies.",
        impact: ["15% revenue uplift for pilot clients", "Reduced analysis time by 90%", "Tracking 50k+ SKUs daily"],
        color: "from-emerald-500 to-cyan-600",
        icon: <BarChart3 className="w-6 h-6" />,
        tech: ["Big Data", "Analytics", "Dashboard"],
        theme: "tech"
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
    window.location.href = "mailto:info@mercanworks.com?subject=Project Inquiry";
  };

  return (
    <div className="min-h-screen bg-mercan-50 text-mercan-900 font-sans selection:bg-mercan-coral selection:text-white overflow-hidden">
      
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-mercan-coral to-mercan-teal transform origin-left z-50"
        style={{ scaleX }}
      />

      <nav className="fixed top-0 left-0 right-0 z-40 flex justify-center pt-6 px-4">
        <div className="glass-card px-6 py-3 rounded-full flex items-center space-x-8 shadow-xl border border-black/5 bg-white/70 backdrop-blur-md">
          <span className="font-display font-bold text-xl tracking-tighter text-mercan-900">
            MERCAN<span className="text-mercan-coral">.</span>
          </span>
          <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-500">
            <a href="#about" className="hover:text-mercan-900 transition-colors">{t.nav.manifesto}</a>
            <a href="#projects" className="hover:text-mercan-900 transition-colors">{t.nav.works}</a>
            <a href="#contact" className="hover:text-mercan-900 transition-colors">{t.nav.contact}</a>
          </div>
          <button 
            onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
            className="bg-mercan-900 hover:bg-black text-white px-4 py-1.5 rounded-full text-xs font-mono transition-all uppercase cursor-pointer"
          >
            {lang === 'tr' ? 'EN' : 'TR'}
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
            <Sparkles className="w-4 h-4 text-mercan-coral" />
            <span className="text-xs font-mono text-gray-500 tracking-wider uppercase">{t.hero.badge}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display font-bold text-6xl md:text-8xl lg:text-9xl tracking-tight leading-[0.9] mb-8 text-mercan-900"
          >
            {t.hero.title1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-mercan-coral via-mercan-900 to-mercan-teal">
              {t.hero.title2}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-gray-500 font-light leading-relaxed"
          >
            {t.hero.desc}
          </motion.p>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-gray-300 to-transparent" />
        </motion.div>
      </section>

      <section id="about" className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
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

      <section id="projects" className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-20"
          >
            <div>
              <span className="text-mercan-coral font-mono text-sm tracking-wider uppercase">{t.portfolio.label}</span>
              <h2 className="font-display font-bold text-5xl mt-2 text-mercan-900">{t.portfolio.title}</h2>
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
                    {project.theme === 'dark' && (
                      <div className="relative w-full h-full flex items-center justify-center bg-slate-50">
                         <div className="absolute w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
                         <div className="relative z-10 w-24 h-24 rounded-full border border-indigo-500/20 flex items-center justify-center bg-white shadow-sm">
                           <div className="w-16 h-16 rounded-full bg-indigo-500/10" />
                         </div>
                      </div>
                    )}
                    {project.theme === 'light' && (
                      <div className="relative w-full h-full flex items-center justify-center bg-rose-50/30">
                        <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-b from-rose-500/5 to-transparent" />
                        <div className="font-display text-4xl text-rose-300 tracking-widest opacity-50 uppercase">{lang === 'tr' ? 'HUZUR' : 'SERENITY'}</div>
                      </div>
                    )}
                    {project.theme === 'tech' && (
                      <div className="relative w-full h-full flex items-center justify-center bg-[radial-gradient(#10b98115_1px,transparent_1px)] [background-size:16px_16px]">
                         <div className="flex gap-2 items-end h-24">
                            <div className="w-8 bg-emerald-500/20 h-12 rounded-t-sm" />
                            <div className="w-8 bg-emerald-500/40 h-20 rounded-t-sm" />
                            <div className="w-8 bg-emerald-500/60 h-16 rounded-t-sm" />
                         </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 rounded-lg bg-gray-100 text-mercan-coral border border-gray-200">
                      {project.icon}
                    </div>
                    <span className="font-mono text-sm text-gray-500">{project.subtitle}</span>
                  </div>
                  
                  <h3 className="font-display font-bold text-4xl mb-6 text-mercan-900 group-hover:text-mercan-coral transition-colors duration-300">
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
                <h2 className="font-display font-bold text-4xl md:text-6xl text-mercan-900 mb-6">{selectedProject.title}</h2>
                <p className="text-xl text-gray-600 font-light leading-relaxed border-l-4 border-mercan-coral pl-6">{selectedProject.desc}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="p-6 bg-gray-50 rounded-2xl">
                   <div className="flex items-center space-x-2 mb-3 text-mercan-900 font-bold">
                      <Zap className="w-4 h-4 text-mercan-coral" />
                      <span>{t.modal.challenge}</span>
                   </div>
                   <p className="text-sm text-gray-600 leading-relaxed">{selectedProject.challenge}</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-2xl">
                   <div className="flex items-center space-x-2 mb-3 text-mercan-900 font-bold">
                      <Layers className="w-4 h-4 text-mercan-coral" />
                      <span>{t.modal.solution}</span>
                   </div>
                   <p className="text-sm text-gray-600 leading-relaxed">{selectedProject.solution}</p>
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
                  {t.cta.button}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="contact" className="py-32 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-mercan-coral/5 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-20">
          <h2 className="font-display font-bold text-5xl md:text-7xl mb-8 text-mercan-900">
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
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span className="font-display font-bold text-xl tracking-tighter text-mercan-900">MERCAN<span className="text-mercan-coral">.</span></span>
          </div>
          <div className="flex space-x-6 text-sm text-gray-500">
             <a href="#" className="hover:text-mercan-coral transition-colors">LinkedIn</a>
             <a href="#" className="hover:text-mercan-coral transition-colors">Instagram</a>
             <a href="#" className="hover:text-mercan-coral transition-colors">Twitter</a>
          </div>
          <div className="mt-4 md:mt-0 text-xs text-gray-400 font-mono">
            © 2026 Mercan Works. {lang === 'tr' ? 'Tüm hakları saklıdır.' : 'All rights reserved.'}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;