import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Phone,
  MapPin,
  Clock,
  Star,
  ChevronLeft,
  ChevronRight,
  Send,
  Calendar,
  Car,
  User,
  X,
  Download,
  ArrowLeft,
} from 'lucide-react';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/evakuator" element={<EvakuatorPage />} />
    </Routes>
  );
}

function MainPage() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showCookieNotice, setShowCookieNotice] = useState(false);

  useEffect(() => {
    const isCookieAccepted = localStorage.getItem('shpagin_cookie_accepted');
    if (!isCookieAccepted) {
      const timer = setTimeout(() => setShowCookieNotice(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('shpagin_cookie_accepted', 'true');
    setShowCookieNotice(false);
  };

  return (
    <div className="min-h-screen bg-anthracite-900 text-white font-sans relative">
      <HeroSection onPrivacyClick={() => setShowPrivacy(true)} />
      <BookingSection onPrivacyClick={() => setShowPrivacy(true)} />
      <ReviewsSection />
      <MapSection />
      <ContactsSection />
      <Footer onPrivacyClick={() => setShowPrivacy(true)} />
      <PrivacyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />

      {/* Всплывающее уведомление о Cookies */}
      <AnimatePresence>
        {showCookieNotice && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md bg-anthracite-950 border border-anthracite-700 p-4 rounded-xl shadow-2xl z-50 backdrop-blur-md bg-opacity-95"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-xs text-anthracite-300 leading-relaxed">
                Мы используем файлы cookie и сторонние скрипты для правильной работы карт и формы записи. Оставаясь на сайте, вы соглашаетесь с нашей{' '}
                <button
                  onClick={() => setShowPrivacy(true)}
                  className="text-accent-500 hover:text-accent-400 underline inline bg-none border-none p-0 cursor-pointer"
                >
                  политикой конфиденциальности
                </button>
                .
              </p>
              <button
                onClick={handleAcceptCookies}
                className="w-full sm:w-auto px-5 py-2 bg-accent-500 hover:bg-accent-600 text-white text-xs font-bold rounded-lg transition-colors flex-shrink-0"
              >
                ОК
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function HeroSection({ onPrivacyClick }: { onPrivacyClick: () => void }) {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-12">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat md:bg-fixed"
        style={{
          backgroundImage: 'url("/111.jpg")',
          opacity: 0.6
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-anthracite-950/80 via-anthracite-900/80 to-anthracite-800/80" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="inline-block mb-6 px-4 py-2 border border-accent-500/30 rounded-full bg-anthracite-900/40 backdrop-blur-sm">
            <span className="text-accent-500 font-medium text-sm tracking-wider uppercase">Ногинск, Клюшниково 47а</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight mb-6"
        >
          Шиномонтаж
          <span className="block text-accent-500 text-3xl sm:text-4xl md:text-5xl lg:text-6xl my-2">&</span>
          <Link
            to="/evakuator"
            className="block text-accent-500 hover:text-white transition-all duration-300 hover:scale-110 inline-block cursor-pointer hover:drop-shadow-[0_0_24px_rgba(249,115,22,0.9)]"
          >
            эвакуатор
          </Link>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg sm:text-xl text-anthracite-300 max-w-2xl mx-auto mb-10"
        >
          Полный комплекс услуг по эвакуации транспорта и шиномонтажу. Честные цены, мастера с огромным опытом, гарантия на все работы.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex flex-col lg:flex-row items-center justify-center gap-4 flex-wrap">
            <a
              href="tel:+79296776505"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-accent-500 hover:bg-accent-600 text-white font-bold text-base px-6 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-accent-500/25"
            >
              Позвонить в шиномонтаж (8-17)
              <Phone className="w-5 h-5" />
            </a>
            <a
              href="tel:+79999879820"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#ff5722] hover:bg-[#e64a19] text-white font-bold text-base px-6 py-4 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Вызвать эвакуатор 24/7
              <Phone className="w-5 h-5" />
            </a>
            <a
              href="/evakuator.vcf"
              download="evakuator.vcf"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-base px-6 py-4 rounded-lg border border-zinc-700 transition-all duration-300 transform hover:scale-105"
            >
              Сохранить контакт эвакуатора
              <Download className="w-5 h-5 text-accent-500" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto"
        >
          {[
            { number: '35+', label: 'Лет опыта' },
            { number: '50000+', label: 'Довольных клиентов' },
            { number: '8-17', label: 'Работаем без выходных' },
            { number: '100%', label: 'Гарантия' },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-accent-500 mb-1">
                {item.number}
              </div>
              <div className="text-xs sm:text-sm text-anthracite-400 uppercase tracking-wider">
                {item.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function BookingSection({ onPrivacyClick }: { onPrivacyClick: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    carBrand: '',
    date: '',
    time: '',
    serviceType: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [globalBookedSlots, setGlobalBookedSlots] = useState<string[]>([]);

  const timeSlots = ['15:00', '15:15', '15:30', '15:45', '16:00', '16:15', '16:30'];
  const services = ['Замена шин', 'Балансировка колес', 'Ремонт проколов'];
  const BACKEND_URL = 'https://shpaginavto.ru/booking.php';

  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const response = await fetch(BACKEND_URL);
        if (response.ok) {
          const data = await response.json();
          setGlobalBookedSlots(data);
        }
      } catch (error) {
        console.error('Ошибка получения занятых слотов:', error);
      }
    };

    fetchBookedSlots();
    const interval = setInterval(fetchBookedSlots, 30000);
    return () => clearInterval(interval);
  }, [formData.date]);

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayName = date.toLocaleDateString('ru-RU', { weekday: 'short' });
      const dayDate = date.getDate();
      const month = date.toLocaleDateString('ru-RU', { month: 'short' });
      dates.push({
        value: date.toISOString().split('T')[0],
        label: `${dayName}, ${dayDate} ${month}`,
      });
    }
    return dates;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.date || !formData.time) {
      alert('Пожалуйста, выберите дату и время записи!');
      return;
    }

    setIsSubmitting(true);

    const TELEGRAM_TOKEN = "8907762041:AAFWbJsQBhIN0RoSyQHPeT46zX8YuNNmi4c";
    const TELEGRAM_CHAT_ID = "939290757";

    const message = `
🚗 **Новая заявка на шиномонтаж!**
👤 **Имя:** ${formData.name}
📞 **Телефон:** ${formData.phone}
🚘 **Автомобиль:** ${formData.carBrand || 'Не указан'}
🛠 **Услуга:** ${formData.serviceType || 'Не указана'}
📅 **Дата и время:** ${formData.date} в ${formData.time}
    `.trim();

    try {
      const backendResponse = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: formData.date, time: formData.time })
      });

      const backendResult = await backendResponse.json();

      if (backendResult.status === 'success') {
        const tgResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'Markdown'
          })
        });

        if (tgResponse.ok) {
          setSubmitStatus('success');
          setGlobalBookedSlots([...globalBookedSlots, `${formData.date}_${formData.time}`]);
          setFormData({ name: '', phone: '', carBrand: '', date: '', time: '', serviceType: '' });
        } else {
          setSubmitStatus('error');
          alert('Запись зафиксирована, но возникли проблемы с уведомлением в Telegram. Мастер свяжется с вами.');
        }
      } else {
        alert('К сожалению, это время только что забронировал другой клиент. Пожалуйста, выберите другое время.');
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section id="booking" className="py-20 md:py-32 bg-anthracite-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mb-4">
            Запись на сервис
          </h2>
          <div className="w-24 h-1 bg-accent-500 mx-auto mb-6" />
          <p className="text-anthracite-400 max-w-2xl mx-auto">
            Выберите удобное время и оставьте заявку. Мы перезвоним для подтверждения записи.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto bg-anthracite-900 rounded-2xl p-6 sm:p-8 md:p-10 border border-anthracite-700"
        >
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-green-900/30 border border-green-700 rounded-lg text-green-400 text-center"
            >
              Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.
            </motion.div>
          )}

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-anthracite-300 mb-2">Ваше имя</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-anthracite-500" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Иван"
                  className="w-full bg-anthracite-800 border border-anthracite-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-anthracite-500 focus:outline-none focus:border-accent-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-anthracite-300 mb-2">Телефон</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-anthracite-500" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  placeholder="+7 (999) 999-99-99"
                  className="w-full bg-anthracite-800 border border-anthracite-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-anthracite-500 focus:outline-none focus:border-accent-500"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-anthracite-300 mb-2">Марка автомобиля</label>
            <div className="relative">
              <Car className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-anthracite-500" />
              <input
                type="text"
                value={formData.carBrand}
                onChange={(e) => setFormData({ ...formData, carBrand: e.target.value })}
                required
                placeholder="Toyota Camry"
                className="w-full bg-anthracite-800 border border-anthracite-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-anthracite-500 focus:outline-none focus:border-accent-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-anthracite-300 mb-2">
                <Calendar className="inline w-4 h-4 mr-1" /> Дата
              </label>
              <select
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                className="w-full bg-anthracite-800 border border-anthracite-700 rounded-lg px-4 py-3 text-white focus:outline-none appearance-none cursor-pointer"
              >
                <option value="">Выберите дату</option>
                {generateDates().map((date) => (
                  <option key={date.value} value={date.value}>{date.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-anthracite-300 mb-2">
                <Clock className="inline w-4 h-4 mr-1" /> Время
              </label>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((time) => {
                  const slotKey = `${formData.date}_${time}`;
                  const isBooked = globalBookedSlots.includes(slotKey);
                  const isSelected = formData.time === time;
                  return (
                    <button
                      key={time}
                      type="button"
                      disabled={!formData.date || isBooked}
                      onClick={() => setFormData({ ...formData, time })}
                      className={`py-2 rounded-lg text-sm font-medium transition-all ${
                        isBooked
                          ? 'bg-anthracite-850 text-anthracite-600 line-through cursor-not-allowed opacity-40'
                          : !formData.date
                          ? 'bg-anthracite-800 text-anthracite-600 cursor-not-allowed opacity-50'
                          : isSelected
                          ? 'bg-accent-500 text-white'
                          : 'bg-anthracite-800 text-white border border-anthracite-700 hover:border-accent-500'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-anthracite-300 mb-2">Тип услуги</label>
            <select
              value={formData.serviceType}
              onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
              required
              className="w-full bg-anthracite-800 border border-anthracite-700 rounded-lg px-4 py-3 text-white focus:outline-none appearance-none cursor-pointer"
            >
              <option value="">Выберите услугу</option>
              {services.map((service) => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent-500 hover:bg-accent-600 disabled:bg-anthracite-700 text-white font-bold text-lg py-4 rounded-lg transition-all flex items-center justify-center gap-3"
          >
            {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
            <Send className="w-5 h-5" />
          </button>
        </motion.form>
      </div>
    </section>
  );
}

function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    {
      name: 'Арзу Аскерова',
      rating: 5,
      text: 'Отличные ребята, хорошо работают, не только меняют резину, но и чистят и выправляют диски, говорят о проблемных местах, все исправляют и спокойно едешь, они ещё просиликонили стык резины с диском, чтобы колеса не спускали',
      date: '9 ноября 2025',
    },
    {
      name: 'Сергей Ф.',
      rating: 5,
      text: 'Отличный шиномонтаж! Всегда быстро и качественно меняю здесь резину. Мастера работают аккуратно, диски целые, балансировка идеальная. Рекомендую!',
      date: '7 ноября 2025',
    },
    {
      name: 'Виктория Македонская',
      rating: 5,
      text: 'Отличный шиномантажный сервис. Специалисты своего дела. Быстро и качественно. Спасибо за работу.',
      date: '21 октября 2025',
    },
    {
      name: 'Григорич Григорич',
      rating: 5,
      text: 'Профессионалы. Больше 20 лет, только у Валеры.',
      date: '25 апреля 2024',
    },
    {
      name: 'Александр О.',
      rating: 5,
      text: 'Спасибо ребята огромное!!! Переобуваюсь постоянно и только у них!!! Всем советую рекомендую!!! Качественно и приемлемо!!!',
      date: '13 апреля 2024',
    },
    {
      name: 'Роман',
      rating: 5,
      text: 'Лучший шиномонтаж на 2 города',
      date: '8 декабря 2023',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-anthracite-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black uppercase mb-4">Отзывы клиентов</h2>
          <div className="w-24 h-1 bg-accent-500 mx-auto" />
        </div>
        <div className="max-w-4xl mx-auto bg-anthracite-800 p-6 sm:p-8 rounded-2xl border border-anthracite-700">
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5" fill="#f97316" stroke="#f97316" />
            ))}
          </div>
          <p className="text-lg text-anthracite-100 mb-6">"{reviews[currentIndex].text}"</p>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-white">{reviews[currentIndex].name}</div>
              <div className="text-anthracite-500 text-sm">{reviews[currentIndex].date}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)} className="w-10 h-10 bg-anthracite-700 rounded-full flex items-center justify-center">←</button>
              <button onClick={() => setCurrentIndex((prev) => (prev + 1) % reviews.length)} className="w-10 h-10 bg-anthracite-700 rounded-full flex items-center justify-center">→</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MapSection() {
  return (
    <section className="py-20 bg-anthracite-950">
      <div className="max-w-7xl mx-auto px-4 text-center mb-12">
        <h2 className="text-3xl font-black uppercase mb-4">Как нас найти</h2>
        <div className="w-24 h-1 bg-accent-500 mx-auto mb-6" />
        <div className="max-w-5xl mx-auto bg-anthracite-900 rounded-2xl overflow-hidden border border-anthracite-700">
          <div className="aspect-video relative">
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A94163eb603625ba8f495a15631af18941693c212f953ca940dca50bf44fd2f99&source=constructor"
              width="100%" height="100%" frameBorder="0" className="absolute inset-0" title="Карта"
            />
          </div>
          <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-accent-500" />
              <div className="text-left">
                <div className="font-semibold text-white">г. Ногинск, д. Клюшниково 47а</div>
                <div className="text-anthracite-400 text-sm">Рядом с АЗС Нефтьмагистраль</div>
              </div>
            </div>
            <a href="https://yandex.ru/maps/?rtext=~55.845946,38.423984" target="_blank" rel="noopener noreferrer" className="bg-accent-500 px-6 py-3 rounded-lg font-semibold">Построить маршрут</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactsSection() {
  return (
    <section className="py-20 bg-anthracite-900">
      <div className="max-w-4xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
        <div className="bg-anthracite-800 p-6 rounded-2xl border border-anthracite-700">
          <Phone className="w-8 h-8 text-accent-500 mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">Телефон</h3>
          <a href="tel:+79296776505" className="text-xl font-bold text-accent-500">+7 (929) 677-65-05</a>
        </div>
        <div className="bg-anthracite-800 p-6 rounded-2xl border border-anthracite-700">
          <Clock className="w-8 h-8 text-accent-500 mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">Режим работы</h3>
          <div className="text-lg font-bold text-white">Пн-Вс: 08:00 - 17:00</div>
        </div>
        <div className="bg-anthracite-800 p-6 rounded-2xl border border-anthracite-700">
          <MapPin className="w-8 h-8 text-accent-500 mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">Адрес</h3>
          <div className="text-base font-bold text-white">Ногинск, Клюшниково 47а</div>
        </div>
      </div>
    </section>
  );
}

function Footer({ onPrivacyClick }: { onPrivacyClick: () => void }) {
  return (
    <footer className="bg-anthracite-950 border-t border-anthracite-800 py-8 text-center sm:text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-anthracite-500 text-sm flex flex-wrap gap-4 justify-center">
          <span>© 2026 ИП Шпагина А.А. Все права защищены.</span>
          <button onClick={onPrivacyClick} className="text-anthracite-500 hover:text-accent-500 underline cursor-pointer">Политика конфиденциальности</button>
        </div>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-anthracite-400 hover:text-accent-500">Наверх ↑</button>
      </div>
    </footer>
  );
}

function PrivacyModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div onClick={(e) => e.stopPropagation()} className="bg-anthracite-900 rounded-2xl border border-anthracite-700 w-full max-w-3xl max-h-[80vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6 border-b border-anthracite-700 pb-4">
          <h2 className="text-xl font-black uppercase">Политика конфиденциальности</h2>
          <button onClick={onClose} className="text-anthracite-400 hover:text-white"><X className="w-6 h-6" /></button>
        </div>
        <div className="text-sm text-anthracite-300 space-y-4">
          <p className="font-bold">1. Общие положения</p>
          <p>Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006. № 152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по обеспечение безопасности персональных данных, предпринимаемые ИП Шпагина Антонина Александровна.</p>
          <p>Политика применяется ко всей информации, которую Оператор может получить о посетителях веб-сайта https://shpaginavto.ru. Данные собираются исключительно для подтверждения записи на услуги автосервиса.</p>
          <p className="font-bold">2. Контактная информация</p>
          <p>По любым вопросам пользователи могут обратиться по электронной почте: 89036105441@mail.ru.</p>
        </div>
      </div>
    </div>
  );
}

function EvakuatorPage() {
  return (
    <div className="min-h-screen bg-anthracite-900 text-white font-sans">
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        <img
          src="/111.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ opacity: 0.4 }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-anthracite-950/85 via-anthracite-900/80 to-anthracite-800/75" />

        <Link
          to="/"
          className="absolute top-6 left-6 z-20 inline-flex items-center gap-2 text-anthracite-300 hover:text-white bg-anthracite-900/60 hover:bg-anthracite-800/80 border border-anthracite-700 hover:border-accent-500 backdrop-blur-sm px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          На главную
        </Link>

        <div className="relative z-10 text-center px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-4"
          >
            <div className="inline-block px-4 py-2 border border-accent-500/30 rounded-full bg-anthracite-900/40 backdrop-blur-sm">
              <span className="text-accent-500 font-medium text-sm tracking-wider uppercase">Круглосуточно, без выходных</span>
            </div>
          </motion.div>

<motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight mb-4"
          >
            Эвакуатор в Ногинске
            <span className="block text-accent-500">круглосуточно 24/7</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg sm:text-xl text-anthracite-300 mb-12"
          >
            Быстрая подача от 20 минут: Электросталь · Горьковское шоссе · Клюшниково
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto"
          >
            <a
              href="tel:+79999879820"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-accent-500 hover:bg-accent-600 text-white font-black text-lg px-8 py-5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-accent-500/40 uppercase tracking-wide"
            >
              <Phone className="w-6 h-6" />
              Вызвать эвакуатор
            </a>
        <a
              href="/evakuator.vcf"
              download="evakuator.vcf"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-anthracite-800 hover:bg-anthracite-700 text-white font-black text-lg px-8 py-5 rounded-xl border border-anthracite-600 hover:border-accent-500 transition-all duration-300 hover:scale-105 uppercase tracking-wide"
            >
              <Download className="w-6 h-6 text-accent-500" />
              Сохранить контакт
           </a>
          </div>
        </motion.div>