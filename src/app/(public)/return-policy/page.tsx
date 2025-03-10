import { Info, ShieldCheck, AlertTriangle, RotateCcw, CheckCircle } from "lucide-react";

const refundSteps = [
  { icon: <Info className="w-10 h-10 text-blue-600" />, title: "Условия возврата", description: "Возврат билетов возможен в соответствии с правилами организатора мероприятия." },
  { icon: <ShieldCheck className="w-10 h-10 text-green-600" />, title: "Безопасность транзакций", description: "Мы гарантируем надежную обработку возвратов через безопасные платежные системы." },
  { icon: <AlertTriangle className="w-10 h-10 text-yellow-600" />, title: "Сроки возврата", description: "Возврат возможен не позднее чем за 48 часов до начала мероприятия." },
  { icon: <RotateCcw className="w-10 h-10 text-purple-600" />, title: "Процесс возврата", description: "Заполните заявку на возврат, и мы обработаем её в течение 5 рабочих дней." },
  { icon: <CheckCircle className="w-10 h-10 text-red-600" />, title: "Возврат средств", description: "Деньги поступят на ваш счёт в течение 7 рабочих дней после одобрения заявки." }
];

export default function RefundPolicy() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-12 text-center bg-gray-50">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Политика возврата</h1>
      <p className="text-gray-600 max-w-xl mb-10 text-lg">
        Если вам необходимо вернуть билет, пожалуйста, ознакомьтесь с нашими условиями и процедурой возврата.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {refundSteps.map((step, index) => (
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
