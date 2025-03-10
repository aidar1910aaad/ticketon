import { LifeBuoy, MessageCircle, Mail, Phone, Globe } from "lucide-react";
import Link from "next/link";

const helpOptions = [
  { icon: <LifeBuoy className="w-10 h-10 text-blue-600" />, title: "Часто задаваемые вопросы", description: "Найдите ответы на самые распространенные вопросы.", link: "/faq" },
  { icon: <MessageCircle className="w-10 h-10 text-green-600" />, title: "Онлайн-чат", description: "Свяжитесь с нашим оператором в чате для мгновенной помощи.", link: "#" },
  { icon: <Mail className="w-10 h-10 text-purple-600" />, title: "Напишите нам", description: "Отправьте нам email, и мы ответим в ближайшее время.", link: "mailto:support@ticketon.kg" },
  { icon: <Phone className="w-10 h-10 text-yellow-600" />, title: "Горячая линия", description: "Позвоните нам по телефону для быстрой поддержки.", link: "tel:+996312990000" },
  { icon: <Globe className="w-10 h-10 text-red-600" />, title: "Посетите наш сайт", description: "Ознакомьтесь с нашими сервисами и услугами.", link: "/" }
];

export default function HelpPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-12 text-center bg-gray-50">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Центр помощи</h1>
      <p className="text-gray-600 max-w-xl mb-10 text-lg">
        Мы здесь, чтобы помочь вам. Выберите удобный способ связи или найдите ответ в разделе FAQ.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {helpOptions.map((option, index) => (
          <Link key={index} href={option.link} className="flex flex-col items-center p-6 border rounded-xl shadow-lg bg-white transition hover:shadow-xl hover:scale-105 text-center">
            {option.icon}
            <h3 className="text-xl font-semibold text-gray-800 mt-4">{option.title}</h3>
            <p className="mt-2 text-gray-600">{option.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
