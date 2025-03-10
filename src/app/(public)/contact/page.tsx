import { Phone, Mail, MapPin, Clock, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function ContactsPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-12 text-center bg-gray-100">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Свяжитесь с нами</h1>
      <p className="text-gray-600 max-w-xl mb-10 text-lg">
        Если у вас есть вопросы по покупке билетов или сотрудничеству, наша команда всегда готова помочь вам.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {/* Телефон */}
        <div className="flex flex-col items-center p-8 border rounded-xl shadow-lg bg-white transition hover:shadow-xl hover:scale-105">
          <Phone className="w-12 h-12 text-green-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800">Телефон</h3>
          <p className="mt-2 text-gray-600">+996 (312) 99-00-00</p>
          <p className="text-gray-600">+996 (555) 99-00-00 (WhatsApp)</p>
        </div>

        {/* Email */}
        <div className="flex flex-col items-center p-8 border rounded-xl shadow-lg bg-white transition hover:shadow-xl hover:scale-105">
          <Mail className="w-12 h-12 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800">Email</h3>
          <p className="mt-2">
            <Link href="mailto:info@ticketon.kg" className="text-blue-500 hover:underline text-lg">
              info@ticketon.kg
            </Link>
          </p>
        </div>

        {/* Адрес */}
        <div className="flex flex-col items-center p-8 border rounded-xl shadow-lg bg-white transition hover:shadow-xl hover:scale-105">
          <MapPin className="w-12 h-12 text-red-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800">Наш офис</h3>
          <p className="mt-2 text-gray-600">Кыргызстан, г. Ош, ул. Ленина, 25</p>
        </div>
      </div>

      {/* Дополнительная информация */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mt-12">
        {/* Время работы */}
        <div className="flex flex-col items-center p-8 border rounded-xl shadow-lg bg-white transition hover:shadow-xl hover:scale-105">
          <Clock className="w-12 h-12 text-yellow-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800">Время работы</h3>
          <p className="mt-2 text-gray-600">Пн-Пт: 09:00 - 18:00</p>
          <p className="text-gray-600">Сб-Вс: 10:00 - 16:00</p>
        </div>

        {/* Частые вопросы */}
        <div className="flex flex-col items-center p-8 border rounded-xl shadow-lg bg-white transition hover:shadow-xl hover:scale-105">
          <HelpCircle className="w-12 h-12 text-purple-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800">Часто задаваемые вопросы</h3>
          <p className="mt-2 text-gray-600">Ответы на самые популярные вопросы вы можете найти в нашем разделе помощи.</p>
          <Link href="/faq" className="mt-4 text-purple-500 font-semibold hover:underline">
            Перейти в FAQ
          </Link>
        </div>
      </div>
    </main>
  );
}