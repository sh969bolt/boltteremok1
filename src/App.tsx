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
      <img
        src="/111.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ opacity: 0.7 }}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-anthracite-950/80 via-anthracite-900/80 to-anthracite-800/80" />

      <div className="relative z-10 max-w-full mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="inline-block mb-6 px-4 py-2 border border-accent-500/30 rounded-full">
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
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);

  const timeSlots = [
    '15:00', '15:15', '15:30',
    '15:45', '16:00', '16:15', '16:30', 
  ];

  const services = [
    'Замена шин',
    'Балансировка колес',
    'Ремонт проколов',
  ];

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
  setIsSubmitting(true);

  const TELEGRAM_TOKEN = "8907762041:AAFWbJsQBhIN0RoSyQHPeT46zX8YuNNmi4c";
  const TELEGRAM_CHAT_ID = "6468221586";

  const message = `
🚗 **Новая заявка на шиномонтаж!**
👤 **Имя:** ${formData.name}
📞 **Телефон:** ${formData.phone}
🚘 **Автомобиль:** ${formData.carBrand || 'Не указан'}
📅 **Дата и время:** ${formData.date} в ${formData.time}
  `.trim();

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      })
    });

    if (response.ok) {
      setSubmitStatus('success');
      setBookedTimes([...bookedTimes, formData.time]);
      setFormData({ name: '', phone: '', carBrand: '', date: '', time: '' });
    } else {
      setSubmitStatus('error');
      alert('Ошибка при отправке.');
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
                  const isBooked = bookedTimes.includes(time);
                  const isSelected = formData.time === time;
                  return (
                    <button
                      key={time}
                      type="button"
                      disabled={isBooked}
                      onClick={() => setFormData({ ...formData, time })}
                      className={`py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isBooked
                          ? 'bg-anthracite-800 text-anthracite-500 opacity-50 line-through cursor-not-allowed'
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
    <section className="py-20 md:py-32 bg-anthracite-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mb-4">
            Отзывы клиентов
          </h2>
          <div className="w-24 h-1 bg-accent-500 mx-auto mb-6" />
          <p className="text-anthracite-400">Реальные отзывы с Яндекса</p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-4 min-h-[320px]"
            >
              <button
                onClick={prevSlide}
                className="flex-shrink-0 w-12 h-12 bg-anthracite-800 hover:bg-accent-500 rounded-full flex items-center justify-center transition-colors"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="flex-1 relative">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="bg-anthracite-800 border border-anthracite-700 rounded-2xl p-6 sm:p-8"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        fill={i < reviews[currentIndex].rating ? '#f97316' : 'none'}
                        stroke={i < reviews[currentIndex].rating ? '#f97316' : '#4a5568'}
                      />
                    ))}
                  </div>

                  <p className="text-lg sm:text-xl text-anthracite-100 mb-6 leading-relaxed">
                    "{reviews[currentIndex].text}"
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white text-lg">
                        {reviews[currentIndex].name}
                      </div>
                      <div className="text-anthracite-500 text-sm">
                        {reviews[currentIndex].date}
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-accent-500/20 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-accent-500" />
                    </div>
                  </div>
                </motion.div>
              </div>

              <button
                onClick={nextSlide}
                className="flex-shrink-0 w-12 h-12 bg-anthracite-800 hover:bg-accent-500 rounded-full flex items-center justify-center transition-colors"
                aria-label="Next review"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </motion.div>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-accent-500 w-8' : 'bg-anthracite-600'
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MapSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-20 md:py-32 bg-anthracite-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mb-4">
            Как нас найти
          </h2>
          <div className="w-24 h-1 bg-accent-500 mx-auto mb-6" />
          <p className="text-anthracite-400">Удобное расположение между Ногинском и Электросталью</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-anthracite-900 rounded-2xl overflow-hidden border border-anthracite-700">
            <div className="aspect-video sm:aspect-[16/10] relative">
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A94163eb603625ba8f495a15631af18941693c212f953ca940dca50bf44fd2f99&amp;source=constructor"
                width="100%"
                height="100%"
                frameBorder="0"
                className="absolute inset-0"
                title="Карта расположения шиномонтажа"
              />
            </div>

            <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <MapPin className="w-6 h-6 text-accent-500 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-white">г. Ногинск, д. Клюшниково 47а</div>
                  <div className="text-anthracite-400 text-sm">Рядом с АЗС Нефтьмагистраль</div>
                </div>
              </div>

              <a
                href="https://yandex.ru/maps/?rtext=~%D0%9D%D0%BE%D0%B3%D0%B8%D0%BD%D1%81%D0%BA%2C%20%D0%B4%D0%B5%D1%80%D0%B5%D0%B2%D0%BD%D1%8F%20%D0%9A%D0%BB%D1%8E%D1%88%D0%BD%D0%B8%D0%BA%D0%BE%D0%B2%D0%BE%2C%2047%D0%B0"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
              >
                Построить маршрут
                <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ContactsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-20 md:py-32 bg-anthracite-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mb-4">
            Контакты
          </h2>
          <div className="w-24 h-1 bg-accent-500 mx-auto mb-6" />
          <p className="text-anthracite-400">Свяжитесь с нами любым удобным способом</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-anthracite-800 border border-anthracite-700 rounded-2xl p-6 text-center hover:border-accent-500 transition-colors"
          >
            <div className="w-16 h-16 bg-accent-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-accent-500" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Телефон</h3>
            <a
              href="tel:+79296776505"
              className="text-2xl font-bold text-accent-500 hover:text-accent-400 transition-colors"
            >
              +7 (929) 677-65-05
            </a>
            <p className="text-anthracite-500 text-sm mt-2">с 8 до 17</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-anthracite-800 border border-anthracite-700 rounded-2xl p-6 text-center hover:border-accent-500 transition-colors"
          >
            <div className="w-16 h-16 bg-accent-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-accent-500" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Режим работы</h3>
            <div className="text-xl font-bold text-white mb-2">
              Пн-Вс: 08:00 - 17:00
            </div>
            <p className="text-anthracite-500 text-sm">Без выходных</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-anthracite-800 border border-anthracite-700 rounded-2xl p-6 text-center hover:border-accent-500 transition-colors"
          >
            <div className="w-16 h-16 bg-accent-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-accent-500" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Адрес</h3>
            <div className="text-lg font-bold text-white mb-2">
              г. Ногинск
            </div>
            <p className="text-anthracite-400 text-sm">д. Клюшниково 47а</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <a
            href="https://t.me/+dOSqqw0vXskwZWRi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-anthracite-800 hover:bg-accent-500 border border-anthracite-700 hover:border-accent-500 px-6 py-3 rounded-lg transition-all duration-300"
          >
            Telegram
          </a>
          <a
            href="https://www.youtube.com/channel/UCTT7OW4qsFJoY407ljlIPhA"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#ff0000]/10 hover:bg-[#ff0000]/20 border border-[#ff0000]/50 hover:border-[#ff0000] px-6 py-3 rounded-lg text-[#ff0000] transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,0,0,0.4),0_0_40px_rgba(255,0,0,0.2)]"
          >
            Наш YouTube-канал
          </a>
          <a
            href="https://vk.com/id12340511"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-anthracite-800 hover:bg-accent-500 border border-anthracite-700 hover:border-accent-500 px-6 py-3 rounded-lg transition-all duration-300"
          >
            VKontakte
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Footer({ onPrivacyClick }: { onPrivacyClick: () => void }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-anthracite-950 border-t border-anthracite-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-anthracite-500 text-sm flex items-center gap-4">
            <span>2026 ИП Шпагина А.А. Все права защищены.</span>
            <button
              onClick={onPrivacyClick}
              className="text-anthracite-500 hover:text-accent-500 underline transition-colors cursor-pointer bg-none border-none p-0"
            >
              Политика конфиденциальности
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-anthracite-400 hover:text-accent-500 transition-colors"
          >
            Наверх
            <ChevronRight className="w-4 h-4 rotate-[-90deg]" />
          </button>
        </div>
      </div>
    </footer>
  );
}

function PrivacyModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-anthracite-900 rounded-2xl border border-anthracite-700 w-full max-w-3xl max-h-[80vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-anthracite-900 border-b border-anthracite-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-black uppercase">Политика конфиденциальности</h2>
          <button
            onClick={onClose}
            className="text-anthracite-400 hover:text-white transition-colors p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 text-anthracite-300 leading-relaxed space-y-4 text-sm">
          <section>
            <h3 className="text-lg font-bold text-white mb-3">Политика в отношении обработки персональных данных</h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-white mb-2">1. Общие положения</h4>
                <p>Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006. № 152-ФЗ «О персональных данных» (далее — Закон о персональных данных) и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных, предпринимаемые ИП Шпагина Антонина Александровна (далее — Оператор).</p>
              </div>

              <div>
                <h4 className="font-bold text-white mb-2">1.1. Цель Оператора</h4>
                <p>Оператор ставит своей важнейшей целью и условием осуществления своей деятельности соблюдение прав и свобод человека и гражданина при обработке его персональных данных, в том числе защиты прав на неприкосновенность частной жизни, личную и семейную тайну.</p>
              </div>

              <div>
                <h4 className="font-bold text-white mb-2">1.2. Применение Политики</h4>
                <p>Настоящая политика Оператора в отношении обработки персональных данных (далее — Политика) применяется ко всей информации, которую Оператор может получить о посетителях веб-сайта https://shpaginavto.ru.</p>
              </div>
            </div>
          </section>

          <div className="border-t border-anthracite-700 pt-4">
            <h4 className="font-bold text-white mb-2">2. Основные понятия</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="font-bold text-white">Обработка персональных данных:</span> любое действие или совокупность действий с персональными данными, включая сбор, запись, систематизацию, накопление, хранение, уточнение, извлечение, использование, передачу, обезличивание, блокирование, удаление, уничтожение.</li>
              <li><span className="font-bold text-white">Оператор:</span> физическое или юридическое лицо, организующее и осуществляющее обработку персональных данных.</li>
              <li><span className="font-bold text-white">Персональные данные:</span> любая информация, относящаяся прямо или косвенно к определенному Пользователю.</li>
              <li><span className="font-bold text-white">Пользователь:</span> любой посетитель веб-сайта https://shpaginavto.ru.</li>
            </ul>
          </div>

          <div className="border-t border-anthracite-700 pt-4">
            <h4 className="font-bold text-white mb-2">3. Основные права и обязанности Оператора</h4>
            <p className="text-xs mb-2"><span className="font-bold text-white">Оператор имеет право:</span></p>
            <ul className="space-y-1 text-xs ml-4 list-disc">
              <li>Получать от субъекта персональных данных достоверную информацию и документы</li>
              <li>Продолжить обработку персональных данных при наличии оснований, указанных в Законе</li>
              <li>Самостоятельно определять меры для обеспечения выполнения обязанностей</li>
            </ul>
            <p className="text-xs mt-3 mb-2"><span className="font-bold text-white">Оператор обязан:</span></p>
            <ul className="space-y-1 text-xs ml-4 list-disc">
              <li>Предоставлять информацию об обработке персональных данных</li>
              <li>Организовывать обработку в соответствии с законодательством РФ</li>
              <li>Отвечать на обращения и запросы субъектов</li>
              <li>Публиковать эту Политику</li>
              <li>Принимать меры для защиты персональных данных</li>
            </ul>
          </div>

          <div className="border-t border-anthracite-700 pt-4">
            <h4 className="font-bold text-white mb-2">4. Основные права субъектов персональных данных</h4>
            <ul className="space-y-1 text-xs ml-4 list-disc">
              <li>Получать информацию об обработке своих персональных данных</li>
              <li>Требовать уточнения, блокирования или уничтожения данных</li>
              <li>Выдвигать условие предварительного согласия при обработке</li>
              <li>Отозвать согласие на обработку персональных данных</li>
              <li>Обжаловать в уполномоченный орган неправомерные действия Оператора</li>
            </ul>
          </div>

          <div className="border-t border-anthracite-700 pt-4">
            <h4 className="font-bold text-white mb-2">5. Цели обработки персональных данных</h4>
            <p className="text-xs mb-2">Для связи с клиентом, уточнения деталей и подтверждения записи на услуги автосервиса и шиномонтажа.</p>
            <p className="text-xs"><span className="font-bold text-white">Обрабатываемые данные:</span> номера телефонов, имя</p>
          </div>

          <div className="border-t border-anthracite-700 pt-4">
            <h4 className="font-bold text-white mb-2">6. Условия обработки персональных данных</h4>
            <ul className="space-y-1 text-xs ml-4 list-disc">
              <li>Обработка осуществляется с согласия субъекта персональных данных</li>
              <li>Обработка необходима для исполнения договора или контракта</li>
              <li>Обработка необходима для защиты законных интересов</li>
              <li>Обработка персональных данных, доступных для распространения</li>
            </ul>
          </div>

          <div className="border-t border-anthracite-700 pt-4">
            <h4 className="font-bold text-white mb-2">7. Безопасность персональных данных</h4>
            <p className="text-xs mb-2">Оператор обеспечивает сохранность персональных данных и принимает все возможные меры, исключающие доступ неуполномоченных лиц.</p>
            <p className="text-xs mb-2">Персональные данные Пользователя не будут переданы третьим лицам, кроме случаев исполнения законодательства или при наличии согласия.</p>
            <p className="text-xs">В случае выявления неточностей в персональных данных, Пользователь может актуализировать их, направив уведомление на адрес электронной почты 89036105441@mail.ru.</p>
          </div>

          <div className="border-t border-anthracite-700 pt-4">
            <h4 className="font-bold text-white mb-2">8. Отзыв согласия</h4>
            <p className="text-xs">Пользователь может в любой момент отозвать свое согласие на обработку персональных данных, направив Оператору уведомление по электронной почте на адрес 89036105441@mail.ru с пометкой «Отзыв согласия на обработку персональных данных».</p>
          </div>

          <div className="border-t border-anthracite-700 pt-4">
            <h4 className="font-bold text-white mb-2">9. Контактная информация</h4>
            <p className="text-xs">По вопросам, касающимся обработки персональных данных, Пользователь может обратиться к Оператору по электронной почте: 89036105441@mail.ru</p>
          </div>

          <div className="border-t border-anthracite-700 pt-4">
            <h4 className="font-bold text-white mb-2">10. Заключительные положения</h4>
            <p className="text-xs">В данном документе будут отражены любые изменения политики обработки персональных данных Оператором. Политика действует бессрочно до замены ее новой версией. Актуальная версия Политики расположена в сети Интернет по адресу https://shpaginavto.ru.</p>
          </div>
        </div>

        <div className="sticky bottom-0 bg-anthracite-900 border-t border-anthracite-700 p-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-accent-500 hover:bg-accent-600 text-white font-bold transition-colors"
          >
            Закрыть
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default App;
