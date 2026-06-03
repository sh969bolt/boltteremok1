import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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
  X
} from 'lucide-react';

function App() {
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <div className="min-h-screen bg-anthracite-900 text-white font-sans">
      <HeroSection onPrivacyClick={() => setShowPrivacy(true)} />
      <BookingSection onPrivacyClick={() => setShowPrivacy(true)} />
      <ReviewsSection />
      <MapSection />
      <ContactsSection />
      <Footer onPrivacyClick={() => setShowPrivacy(true)} />
      <PrivacyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
    </div>
  );
}

function HeroSection({ onPrivacyClick }: { onPrivacyClick: () => void }) {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Кастомный фон с эффектом параллакса для десктопов */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat md:bg-fixed"
        style={{
          backgroundImage: 'url("/111.jpg")',
          opacity: 0.6
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-anthracite-950/80 via-anthracite-900/80 to-anthracite-800/80" />

      <div className="relative z-10 max-w-full mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
          <span className="block text-accent-500">эвакуатор</span>
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
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+79296776505"
              className="inline-flex items-center gap-3 bg-accent-500 hover:bg-accent-600 text-white font-bold text-lg px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-accent-500/25"
            >
              Позвонить в шиномонтаж с 8 до 17
              <Phone className="w-5 h-5" />
            </a>
            <a
              href="tel:+79999879820"
              className="w-full md:w-auto inline-flex items-center gap-3 bg-white hover:bg-white/90 text-[#ff5722] font-bold text-lg px-8 py-4 rounded-lg border border-[#ff5722] transition-all duration-300 transform hover:scale-105"
            >
              Вызвать эвакуатор КРУГЛОСУТОЧНО
              <Phone className="w-5 h-5" />
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

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-anthracite-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-anthracite-600 rounded-full mt-2" />
        </div>
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

  const timeSlots = [
    '15:00', '15:15', '15:30',
    '15:45', '16:00', '16:15', '16:30', 
  ];

  const services = [
    'Замена шин',
    'Балансировка колес',
    'Ремонт проколов',
  ];

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
    const TELEGRAM_CHAT_ID = "6468221586";

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
              <label className="block text-sm font-medium text-anthracite-300 mb-2">
                Ваше имя
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-anthracite-500" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Иван"
                  className="w-full bg-anthracite-800 border border-anthracite-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-anthracite-500 focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-anthracite-300 mb-2">
                Телефон
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-anthracite-500" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  placeholder="+7 (999) 999-99-99"
                  className="w-full bg-anthracite-800 border border-anthracite-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-anthracite-500 focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-anthracite-300 mb-2">
              Марка автомобиля
            </label>
            <div className="relative">
              <Car className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-anthracite-500" />
              <input
                type="text"
                value={formData.carBrand}
                onChange={(e) => setFormData({ ...formData, carBrand: e.target.value })}
                required
                placeholder="Toyota Camry"
                className="w-full bg-anthracite-800 border border-anthracite-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-anthracite-500 focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-anthracite-300 mb-2">
                <Calendar className="inline w-4 h-4 mr-1" />
                Дата
              </label>
              <select
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                className="w-full bg-anthracite-800 border border-anthracite-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors appearance-none cursor-pointer"
              >
                <option value="">Выберите дату</option>
                {generateDates().map((date) => (
                  <option key={date.value} value={date.value}>
                    {date.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-anthracite-300 mb-2">
                <Clock className="inline w-4 h-4 mr-1" />
                Время
              </label>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((time) => {
                  const slotKey = `${formData.date}_${time}`;
                  const isBooked = globalBookedSlots.includes(slotKey);
                  const isSelected = formData.time === time;
                  const isTimeDisabled = !formData.date || isBooked;

                  return (
                    <button
                      key={time}
                      type="button"
                      disabled={isTimeDisabled}
                      onClick={() => setFormData({ ...formData, time })}
                      className={`py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isBooked
                          ? 'bg-anthracite-850 text-anthracite-600 border border-anthracite-800 line-through cursor-not-allowed opacity-40'
                          : !formData.date
                          ? 'bg-anthracite-800 text-anthracite-600 border border-anthracite-800 cursor-not-allowed opacity-50'
                          : isSelected
                          ? 'bg-accent-500 text-white border border-accent-500'
                          : 'bg-anthracite-800 text-white border border-anthracite-700 hover:border-accent-500 hover:bg-anthracite-700'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
              <input type="hidden" value={formData.time} required />
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-anthracite-300 mb-2">
              Тип услуги
            </label>
            <select
              value={formData.serviceType}
              onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
              required
              className="w-full bg-anthracite-800 border border-anthracite-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500 transition-colors appearance-none cursor-pointer"
            >
              <option value="">Выберите услугу</option>
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent-500 hover:bg-accent-600 disabled:bg-anthracite-700 text-white font-bold text-lg py-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-accent-500/25 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Отправка...
              </>
            ) : (
              <>
                Отправить заявку
                <Send className="w-5 h-5" />
              </>
            )}
          </button>

          <p className="text-center text-anthracite-500 text-sm mt-4">
            Нажимая кнопку, вы соглашаетесь с{' '}
            <button
              type="button"
              onClick={onPrivacyClick}
              className="text-accent-500 hover:text-accent-400 underline transition-colors cursor-pointer bg-none border-none p-0"
            >
              политикой конфиденциальности
            </button>
          </p>
        </motion.form>
      </div>
    </section>
  );
}

function ReviewsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
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
      date: '218 октября 2025',
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
      date: '113 апреля 2024',
    },
    {
      name: 'Роман',
      rating: 5,
      text: 'Лучший шиномонтаж на 2 города',
      date: '8 декабря 2023',
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (