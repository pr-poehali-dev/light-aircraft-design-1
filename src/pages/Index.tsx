import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/d11a414a-adce-458a-872f-85375a340234/files/e7330bf5-5c30-4a30-93f4-97f7fdc3a35b.jpg";
const BLUEPRINT_IMAGE = "https://cdn.poehali.dev/projects/d11a414a-adce-458a-872f-85375a340234/files/e2b16071-01bf-4455-8dd4-64266e6c8367.jpg";
const HANGAR_IMAGE = "https://cdn.poehali.dev/projects/d11a414a-adce-458a-872f-85375a340234/files/bf5efa72-77e6-407b-b63e-c64f10f974bb.jpg";

const NAV_LINKS = [
  { label: "О компании", href: "#about" },
  { label: "Проекты", href: "#projects" },
  { label: "Новости", href: "#news" },
  { label: "Вакансии", href: "#vacancies" },
  { label: "Контакты", href: "#contacts" },
];

const PROJECTS = [
  {
    code: "АК-1",
    name: "Первый пилотажный",
    desc: "Лёгкий двухместный самолёт для первоначального обучения пилотов. Максимальная скорость 240 км/ч, дальность 900 км.",
    year: "2019",
    status: "В эксплуатации",
    img: BLUEPRINT_IMAGE,
  },
  {
    code: "АК-3",
    name: "Многоцелевой",
    desc: "Четырёхместный самолёт для деловых перевозок и мониторинга. Крейсерская скорость 320 км/ч, потолок 4200 м.",
    year: "2022",
    status: "Серийное производство",
    img: HANGAR_IMAGE,
  },
  {
    code: "АК-5",
    name: "Перспективный",
    desc: "Скоростной однодвигательный самолёт с композитным планером. Расчётная скорость 420 км/ч, дальность 1400 км.",
    year: "2025",
    status: "Испытания",
    img: HERO_IMAGE,
  },
];

const NEWS = [
  {
    date: "18 МАЯ 2026",
    category: "Испытания",
    title: "АК-5 успешно завершил первый этап лётных испытаний",
    excerpt: "Самолёт подтвердил расчётные характеристики по скорости и манёвренности на высотах до 3500 метров.",
  },
  {
    date: "02 МАЯ 2026",
    category: "Производство",
    title: "Открыт новый цех сборки планеров из углеволокна",
    excerpt: "Площадь производственного корпуса составила 4200 кв.м. Введены в строй три линии автоматизированной выкладки.",
  },
  {
    date: "14 АПР 2026",
    category: "Партнёрство",
    title: "Подписано соглашение с авиационным учебным центром",
    excerpt: "Планируется поставка 12 самолётов АК-1 для подготовки пилотов гражданской авиации.",
  },
];

const VACANCIES = [
  { role: "Инженер-конструктор планера", dept: "Отдел конструирования", type: "Полная занятость" },
  { role: "Ведущий специалист по прочности", dept: "Отдел прочности и ресурса", type: "Полная занятость" },
  { role: "Инженер по лётным испытаниям", dept: "ЛИС", type: "Полная занятость" },
  { role: "Технолог по композитным материалам", dept: "Производство", type: "Полная занятость" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function AnimSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="font-body bg-white text-[#0a0a0a] min-h-screen">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="#"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="font-display font-semibold text-xl tracking-[0.15em] uppercase text-[#0a0a0a]"
          >
            Конструкторское бюро «А. Кеменова»
          </a>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="font-body text-sm tracking-widest uppercase text-gray-500 hover:text-[#0a0a0a] transition-colors duration-200"
              >
                {l.label}
              </button>
            ))}
          </div>
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map(l => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-left font-body text-sm tracking-widest uppercase text-gray-600 hover:text-[#0a0a0a] transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative h-screen min-h-[600px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Самолёт АвиаКБ" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 w-full">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-gray-500 mb-4 animate-[fadeUp_0.8s_ease-out_0.2s_both]">
            О компании
          </p>
          <div className="font-body font-light text-lg md:text-xl text-gray-700 max-w-xl mb-10 mt-4 animate-[fadeUp_0.8s_ease-out_0.4s_both] flex flex-col gap-3">
            <p>Конструкторское бюро «А. Кеменова» создано в 2020-м году.</p>
            <p>Основное направление деятельности — разработка и производство авиационной техники.</p>
            <p className="hidden md:block">В конструкторском бюро собрана команда квалифицированных специалистов в области проектирования, конструирования, производства и обслуживания летательных аппаратов.</p>
          </div>
          <div className="animate-[fadeUp_0.8s_ease-out_0.8s_both]">
            <button
              onClick={() => scrollTo("#projects")}
              className="inline-flex items-center gap-3 bg-[#0a0a0a] text-white font-body text-sm tracking-widest uppercase px-8 py-4 hover:bg-gray-800 transition-colors duration-200"
            >
              Наши проекты
              <Icon name="ArrowRight" size={16} />
            </button>
          </div>
        </div>
        <div className="absolute bottom-8 right-8 z-10 hidden md:flex flex-col items-center gap-2 animate-[fadeIn_1s_ease-out_1.2s_both]">
          <div className="w-px h-16 bg-gray-400/60" />
          <span className="font-body text-xs tracking-[0.3em] uppercase text-gray-400 [writing-mode:vertical-rl]">Прокрутите вниз</span>
        </div>
      </section>

      {/* STATS BAR */}
      <AnimSection>
        <div className="border-y border-gray-100 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: "17", label: "Лет в авиации" },
              { num: "3", label: "Модели в производстве" },
              { num: "84", label: "Самолёта выпущено" },
              { num: "12", label: "Стран эксплуатации" },
            ].map(s => (
              <div key={s.label} className="text-center md:text-left">
                <p className="font-display font-semibold text-4xl text-[#0a0a0a] tracking-tight">{s.num}</p>
                <p className="font-body text-xs text-gray-500 uppercase tracking-widest mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimSection>

      {/* ABOUT */}
      <section id="about" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <AnimSection>
            <div className="flex items-center gap-4 mb-16">
              <div className="w-8 h-px bg-[#0a0a0a]" />
              <span className="font-body text-xs tracking-[0.4em] uppercase text-gray-400">01 / О компании</span>
            </div>
          </AnimSection>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <AnimSection>
              <h2 className="font-display font-light text-4xl md:text-5xl uppercase leading-tight mb-8">
                Инженерная точность<br />
                <span className="font-semibold">в каждом решении</span>
              </h2>
              <p className="font-body font-light text-gray-600 text-lg leading-relaxed mb-6">
                АвиаКБ основано в 2009 году группой инженеров с опытом в военной и гражданской авиации. За 17 лет мы прошли путь от небольшого конструкторского коллектива до полноценного предприятия с собственным производством.
              </p>
              <p className="font-body font-light text-gray-600 leading-relaxed mb-10">
                Наши самолёты спроектированы и построены в России — от разработки концепции до серийного выпуска. Мы используем современные композитные материалы, цифровое моделирование и строгий контроль качества на каждом этапе.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  "Сертификация по нормам АП-23 и FAR-23",
                  "Собственное производство на площади 6 000 м²",
                  "Авторизованный технический центр",
                ].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-1 h-1 bg-[#0a0a0a] rounded-full mt-2 flex-shrink-0" />
                    <span className="font-body text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </AnimSection>
            <AnimSection>
              <div className="relative">
                <img src={HANGAR_IMAGE} alt="Производство АвиаКБ" className="w-full aspect-[4/3] object-cover" />
                <div className="absolute -bottom-4 -left-4 w-24 h-24 border-l-2 border-b-2 border-[#0a0a0a]" />
                <div className="absolute -top-4 -right-4 w-24 h-24 border-r-2 border-t-2 border-[#0a0a0a]" />
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-32 bg-[#f8f8f7]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimSection>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-[#0a0a0a]" />
              <span className="font-body text-xs tracking-[0.4em] uppercase text-gray-400">02 / Проекты</span>
            </div>
            <h2 className="font-display font-semibold text-4xl md:text-5xl uppercase leading-tight mb-16">
              Линейка<br />воздушных судов
            </h2>
          </AnimSection>
          <div className="grid md:grid-cols-3 gap-8">
            {PROJECTS.map(p => (
              <AnimSection key={p.code}>
                <div className="group bg-white border border-gray-100 hover:border-gray-300 transition-all duration-300 cursor-pointer overflow-hidden">
                  <div className="overflow-hidden aspect-[16/10]">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-display font-semibold text-2xl text-[#0a0a0a] tracking-wide">{p.code}</span>
                      <span className={`font-body text-xs tracking-widest uppercase px-3 py-1 ${
                        p.status === "Испытания"
                          ? "bg-amber-50 text-amber-700"
                          : p.status === "В эксплуатации"
                          ? "bg-green-50 text-green-700"
                          : "bg-blue-50 text-blue-700"
                      }`}>
                        {p.status}
                      </span>
                    </div>
                    <h3 className="font-display font-medium text-xl uppercase mb-3">{p.name}</h3>
                    <p className="font-body font-light text-gray-500 text-sm leading-relaxed mb-4">{p.desc}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="font-body text-xs text-gray-400 tracking-widest uppercase">Год: {p.year}</span>
                      <Icon name="ArrowUpRight" size={16} className="text-gray-400 group-hover:text-[#0a0a0a] transition-colors" />
                    </div>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section id="news" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <AnimSection>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-[#0a0a0a]" />
              <span className="font-body text-xs tracking-[0.4em] uppercase text-gray-400">03 / Новости</span>
            </div>
            <h2 className="font-display font-semibold text-4xl md:text-5xl uppercase mb-16">
              Последние события
            </h2>
          </AnimSection>
          <div className="flex flex-col divide-y divide-gray-100">
            {NEWS.map((n, i) => (
              <AnimSection key={i}>
                <div className="group py-8 flex flex-col md:flex-row md:items-start gap-4 md:gap-12 cursor-pointer hover:bg-gray-50 -mx-6 px-6 transition-colors duration-200">
                  <div className="md:w-36 flex-shrink-0">
                    <span className="font-body text-xs tracking-widest uppercase text-gray-400">{n.date}</span>
                  </div>
                  <div className="md:w-28 flex-shrink-0">
                    <span className="font-body text-xs tracking-widest uppercase text-gray-500 border border-gray-200 px-2 py-1">{n.category}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-medium text-xl uppercase mb-2 group-hover:text-gray-600 transition-colors">{n.title}</h3>
                    <p className="font-body font-light text-gray-500 text-sm leading-relaxed">{n.excerpt}</p>
                  </div>
                  <div className="flex-shrink-0 self-center hidden md:block">
                    <Icon name="ArrowRight" size={18} className="text-gray-300 group-hover:text-[#0a0a0a] group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* VACANCIES */}
      <section id="vacancies" className="py-32 bg-[#0a0a0a] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimSection>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-white/30" />
              <span className="font-body text-xs tracking-[0.4em] uppercase text-white/40">04 / Вакансии</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
              <h2 className="font-display font-semibold text-4xl md:text-5xl uppercase leading-tight">
                Строим команду<br />
                <span className="font-light">мечтателей</span>
              </h2>
              <p className="font-body font-light text-white/50 max-w-sm mt-4 md:mt-0 text-sm leading-relaxed">
                Мы ищем инженеров и специалистов, готовых создавать авиационную технику нового поколения.
              </p>
            </div>
          </AnimSection>
          <div className="flex flex-col divide-y divide-white/10">
            {VACANCIES.map((v, i) => (
              <AnimSection key={i}>
                <div className="group py-6 flex flex-col md:flex-row md:items-center gap-2 md:gap-0 cursor-pointer hover:bg-white/5 -mx-6 px-6 transition-colors duration-200">
                  <div className="flex-1">
                    <h3 className="font-display font-medium text-xl uppercase group-hover:text-white/70 transition-colors">{v.role}</h3>
                  </div>
                  <div className="md:w-64 flex-shrink-0">
                    <span className="font-body text-sm text-white/40">{v.dept}</span>
                  </div>
                  <div className="md:w-40 flex-shrink-0">
                    <span className="font-body text-xs tracking-widest uppercase text-white/30 border border-white/10 px-2 py-1">{v.type}</span>
                  </div>
                  <div className="md:w-12 flex-shrink-0 flex justify-end">
                    <Icon name="ArrowRight" size={16} className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all duration-200" />
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
          <AnimSection>
            <div className="mt-12">
              <button className="inline-flex items-center gap-3 border border-white/30 text-white font-body text-sm tracking-widest uppercase px-8 py-4 hover:bg-white hover:text-[#0a0a0a] transition-all duration-200">
                Отправить резюме
                <Icon name="Send" size={16} />
              </button>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <AnimSection>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-[#0a0a0a]" />
              <span className="font-body text-xs tracking-[0.4em] uppercase text-gray-400">05 / Контакты</span>
            </div>
            <h2 className="font-display font-semibold text-4xl md:text-5xl uppercase mb-16">Свяжитесь с нами</h2>
          </AnimSection>
          <div className="grid md:grid-cols-2 gap-16">
            <AnimSection>
              <div className="flex flex-col gap-10">
                {[
                  { icon: "MapPin", label: "Адрес", value: "г. Казань, ул. Авиастроительная, д. 1\nРеспублика Татарстан, 420036" },
                  { icon: "Phone", label: "Телефон", value: "+7 (843) 000-00-00" },
                  { icon: "Mail", label: "Электронная почта", value: "info@aviakb.ru" },
                  { icon: "Clock", label: "Часы работы", value: "Пн–Пт: 09:00 – 18:00\nСб–Вс: Выходной" },
                ].map(c => (
                  <div key={c.label} className="flex items-start gap-5">
                    <div className="w-10 h-10 border border-gray-200 flex items-center justify-center flex-shrink-0">
                      <Icon name={c.icon} size={18} className="text-gray-500" />
                    </div>
                    <div>
                      <p className="font-body text-xs tracking-widest uppercase text-gray-400 mb-1">{c.label}</p>
                      <p className="font-body text-gray-800 whitespace-pre-line leading-relaxed">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimSection>
            <AnimSection>
              <form className="flex flex-col gap-5" onSubmit={e => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="font-body text-xs tracking-widest uppercase text-gray-400">Имя</label>
                    <input
                      type="text"
                      placeholder="Иван Петров"
                      className="border border-gray-200 px-4 py-3 font-body text-sm focus:outline-none focus:border-[#0a0a0a] transition-colors bg-transparent"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-body text-xs tracking-widest uppercase text-gray-400">Телефон</label>
                    <input
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      className="border border-gray-200 px-4 py-3 font-body text-sm focus:outline-none focus:border-[#0a0a0a] transition-colors bg-transparent"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-body text-xs tracking-widest uppercase text-gray-400">Тема обращения</label>
                  <input
                    type="text"
                    placeholder="Запрос коммерческого предложения"
                    className="border border-gray-200 px-4 py-3 font-body text-sm focus:outline-none focus:border-[#0a0a0a] transition-colors bg-transparent"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-body text-xs tracking-widest uppercase text-gray-400">Сообщение</label>
                  <textarea
                    rows={5}
                    placeholder="Опишите ваш запрос..."
                    className="border border-gray-200 px-4 py-3 font-body text-sm focus:outline-none focus:border-[#0a0a0a] transition-colors bg-transparent resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#0a0a0a] text-white font-body text-sm tracking-widest uppercase py-4 hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center gap-3"
                >
                  Отправить сообщение
                  <Icon name="Send" size={16} />
                </button>
              </form>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display font-semibold text-lg tracking-[0.15em] uppercase">Конструкторское бюро «А. Кеменова»</span>
          <span className="font-body text-xs text-gray-400">© 2026 Конструкторское бюро лёгкой авиации. Все права защищены.</span>
          <div className="hidden md:flex gap-6">
            {NAV_LINKS.map(l => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="font-body text-xs tracking-widest uppercase text-gray-400 hover:text-[#0a0a0a] transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

    </div>
  );
}