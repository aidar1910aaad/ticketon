import { ShieldCheck, FileText, AlertTriangle, CheckCircle } from "lucide-react";

const terms = [
  { icon: <ShieldCheck className="w-10 h-10 text-blue-600" />, title: "Конфиденциальность", description: "Мы гарантируем защиту ваших данных и соблюдение политики конфиденциальности." },
  { icon: <FileText className="w-10 h-10 text-green-600" />, title: "Права и обязанности", description: "Используя наш сервис, вы соглашаетесь с правилами и условиями пользования." },
  { icon: <AlertTriangle className="w-10 h-10 text-yellow-600" />, title: "Ограничения ответственности", description: "Мы не несем ответственности за отмену мероприятий или изменения их условий." },
  { icon: <CheckCircle className="w-10 h-10 text-red-600" />, title: "Безопасные платежи", description: "Все транзакции проходят через защищенные платежные системы." }
];

export default function TermsOfUse() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-12 text-center bg-gray-50">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Условия пользования</h1>
      <p className="text-gray-600 max-w-xl mb-10 text-lg">
        Пожалуйста, ознакомьтесь с основными правилами и условиями использования нашего сервиса.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {terms.map((term, index) => (
          <div key={index} className="flex flex-col items-center p-6 border rounded-xl shadow-lg bg-white transition hover:shadow-xl hover:scale-105 text-center">
            {term.icon}
            <h3 className="text-xl font-semibold text-gray-800 mt-4">{term.title}</h3>
            <p className="mt-2 text-gray-600">{term.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
