import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#1B242C] text-white py-12">
      <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Колонка 1: Логотип + Описание */}
        <div>
          <Image src="/icons/ticketon-logo.svg" alt="Ticketon" width={180} height={40} />
          <p className="mt-4 text-gray-400">
            Ticketon — ваш онлайн-сервис для покупки билетов на концерты, театры, кино, спорт и другие мероприятия.
          </p>
          <p className="mt-2 text-gray-400 text-sm">
            Мы предоставляем удобный способ забронировать и оплатить билеты на лучшие события в Кыргызстане.
          </p>
        </div>

        {/* Колонка 2: Навигация */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Навигация</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="/events" className="hover:text-white">Афиша событий</Link></li>
            <li><Link href="/categories" className="hover:text-white">Категории</Link></li>
            <li><Link href="/how-to-buy" className="hover:text-white">Как купить билет?</Link></li>
            <li><Link href="/return-policy" className="hover:text-white">Правила возврата</Link></li>
          </ul>
        </div>

        {/* Колонка 3: Клиентская поддержка */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Клиентская поддержка</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="/help" className="hover:text-white">Помощь</Link></li>
            <li><Link href="/faq" className="hover:text-white">Частые вопросы</Link></li>
            <li><Link href="/terms" className="hover:text-white">Условия использования</Link></li>
            <li><Link href="/organizers" className="hover:text-white">Организаторам</Link></li>
          </ul>
        </div>

        {/* Колонка 4: Контакты */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Контакты</h3>
          <p className="text-gray-400">📞 <span className="font-semibold">+996 (312) 88-00-00</span> (Бишкек)</p>
          <p className="text-gray-400">📞 <span className="font-semibold">+996 (551) 88-00-00</span> (WhatsApp)</p>
          <p className="text-gray-400">📞 <span className="font-semibold">+996 (770) 88-00-00</span> (Кыргызстан)</p>
          <p className="text-gray-400 mt-2">✉️ <Link href="mailto:support@ticketon.kg" className="hover:text-white">support@ticketon.kg</Link></p>

          {/* Соцсети */}
          <div className="flex space-x-4 mt-4">
            <Link href="#"><Image src="/footer-icons/tg.svg" alt="Telegram" width={40} height={40} /></Link>
            <Link href="#"><Image src="/footer-icons/whatsapp.svg" alt="WhatsApp" width={40} height={40} /></Link>
            <Link href="#"><Image src="/footer-icons/instagram.svg" alt="Instagram" width={40} height={40} /></Link>
            <Link href="#"><Image src="/footer-icons/youtube.svg" alt="YouTube" width={40} height={40} /></Link>
          </div>
        </div>
      </div>

      {/* Копирайт */}
      <div className="text-center text-gray-500 text-sm mt-12">
        © {new Date().getFullYear()} Ticketon.kg. Все права защищены.
      </div>
    </footer>
  );
};

export default Footer;
