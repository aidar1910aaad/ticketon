import { Briefcase, Ticket, ShieldCheck, MessageCircle, Star } from "lucide-react";

const organizerInfo = [
  { icon: <Briefcase className="w-10 h-10 text-blue-600" />, title: "Продажа билетов", description: "Продавайте билеты на ваши мероприятия с удобной системой управления." },
  { icon: <Ticket className="w-10 h-10 text-green-600" />, title: "Электронные билеты", description: "Мы обеспечиваем безопасную и удобную выдачу электронных билетов." },
  { icon: <ShieldCheck className="w-10 h-10 text-yellow-600" />, title: "Гарантия безопасности", description: "Все транзакции проходят через надежные платежные системы." },
  { icon: <MessageCircle className="w-10 h-10 text-purple-600" />, title: "Поддержка организаторов", description: "Наша команда поможет вам с любыми вопросами и настройкой системы." },
  { icon: <Star className="w-10 h-10 text-red-600" />, title: "Маркетинговая поддержка", description: "Мы помогаем продвигать ваши мероприятия через рекламу и партнерства." }
];

export default function ForOrganizers() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-12 text-center bg-gray-50">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Организаторам</h1>
      <p className="text-gray-600 max-w-xl mb-10 text-lg">
        Сотрудничайте с нами для удобной продажи билетов, маркетинговой поддержки и надежных платежных решений.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {organizerInfo.map((item, index) => (
          <div key={index} className="flex flex-col items-center p-6 border rounded-xl shadow-lg bg-white transition hover:shadow-xl hover:scale-105 text-center">
            {item.icon}
            <h3 className="text-xl font-semibold text-gray-800 mt-4">{item.title}</h3>
            <p className="mt-2 text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}