import { CreditCard, ShoppingCart, CheckCircle, Ticket, Globe } from "lucide-react";

const steps = [
  { icon: <Globe className="w-10 h-10 text-blue-600" />, title: "Выберите событие", description: "Просмотрите доступные мероприятия и выберите интересующее вас." },
  { icon: <ShoppingCart className="w-10 h-10 text-green-600" />, title: "Добавьте билеты в корзину", description: "Выберите места и добавьте билеты в корзину." },
  { icon: <CreditCard className="w-10 h-10 text-purple-600" />, title: "Оплатите онлайн", description: "Оплатите билеты с помощью банковской карты или электронного кошелька." },
  { icon: <CheckCircle className="w-10 h-10 text-yellow-600" />, title: "Подтверждение покупки", description: "После оплаты вы получите электронный билет на вашу почту." },
  { icon: <Ticket className="w-10 h-10 text-red-600" />, title: "Используйте билет", description: "Покажите электронный билет на входе мероприятия." }
];

export default function HowToBuy() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-12 text-center bg-gray-50">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Как купить билет?</h1>
      <p className="text-gray-600 max-w-xl mb-10 text-lg">
        Покупка билетов у нас – это просто и удобно. Следуйте этим шагам, чтобы получить билет на ваше любимое мероприятие.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center p-6 border rounded-xl shadow-lg bg-white transition hover:shadow-xl hover:scale-105 text-center">
            {step.icon}
            <h3 className="text-xl font-semibold text-gray-800 mt-4">{step.title}</h3>
            <p className="mt-2 text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}