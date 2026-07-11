import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Download, Clock, MapPin, ShieldCheck, Truck } from 'lucide-react';

export default function TowTruckPage() {
  // Функция для генерации и скачивания vCard контакта ШпагинАвто
  const downloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Эвакуатор ШпагинАвто (Ногинск)
TEL;TYPE=CELL;TYPE=PREF:+79XXXXXXXXX
ADR;TYPE=WORK:;;ул. Клюшникова, д. 47;Ногинск;;;Россия
URL:https://shpaginavto.ru
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'shpaginavto_evakuator.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-screen bg-neutral-950 text-white font-sans selection:bg-orange-500 selection:text-white">
      {/* Главный экран / Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 border-b border-neutral-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.1),transparent_50%)]" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-500 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
          >
            <Truck className="w-4 h-4" /> Быстрый Ногинский Эвакуатор
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6"
          >
            Вызвать эвакуатор <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">
              быстро и круглосуточно
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto mb-10"
          >
            Оперативная помощь на дорогах Ногинска и Горьковского шоссе. Подача от 15-20 минут. Работаем 24/7 без выходных.
          </motion.p>

          {/* Блок целевых действий (СТА) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a 
              href="tel:+79XXXXXXXXX" // Замени на реальный номер ШпагинАвто
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-orange-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Phone className="w-5 h-5 animate-pulse" />
              Позвонить эвакуатору
            </a>

            <button 
              onClick={downloadVCard}
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 font-medium px-8 py-4 rounded-xl transition-all"
            >
              <Download className="w-5 h-5 text-orange-500" />
              Сохранить контакт в телефон
            </button>
          </motion.div>
        </div>
      </section>

      {/* Преимущества / Ключевые фишки */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            whileHover={{ y: -4 }}
            className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-900"
          >
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Подача 15–30 мин</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Собственный транспорт на базе дежурит на ключевых развязках Горьковского шоссе, обеспечивая мгновенный выезд.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -4 }}
            className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-900"
          >
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Ногинск и пригород</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Базируемся по адресу: ул. Клюшникова, 47. Прекрасно знаем местность, подаем спецтехнику без навигационных задержек.
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -4 }}
            className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-900"
          >
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Безопасная погрузка</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Опытные водители и надежное импортное оборудование гарантируют полную сохранность автомобиля на всех этапах транспортировки.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Информационный блок для SEO-оптимизации */}
      <section className="py-12 px-4 bg-neutral-900/20 border-t border-neutral-900 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs text-neutral-500 uppercase tracking-widest mb-3">Гео-привязка и Яндекс.Карты</p>
          <p className="text-sm text-neutral-400 italic">
            «ШпагинАвто» — профессиональная помощь автовладельцам. Наша основная база находится в г. Ногинск, ул. Клюшникова, д. 47. При заказе услуги вы можете оставить отзыв на Яндекс Карты прямо со своего смартфона и получить персональную скидку на месте!
          </p>
        </div>
      </section>
    </div>
  );
}