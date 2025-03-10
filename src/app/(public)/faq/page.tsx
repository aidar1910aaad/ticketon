"use client"

import { ChevronDown, Info, HelpCircle } from "lucide-react";
import { useState } from "react";

const faqs = [
  { question: "Как купить билет?", answer: "Вы можете выбрать мероприятие, добавить билет в корзину и оформить заказ онлайн." },
  { question: "Как оплатить билет?", answer: "Мы принимаем банковские карты, электронные кошельки и другие способы оплаты." },
  { question: "Можно ли вернуть билет?", answer: "Возврат билетов возможен согласно правилам организатора мероприятия." },
  { question: "Где найти купленный билет?", answer: "Все купленные билеты доступны в вашем личном кабинете на сайте." },
  { question: "Как связаться с поддержкой?", answer: "Вы можете написать нам на email или позвонить по телефону, указанному на сайте." },
  { question: "Можно ли купить билет в рассрочку?", answer: "Да, некоторые мероприятия позволяют оформить билет в рассрочку." },
  { question: "Как поменять дату билета?", answer: "Изменение даты возможно, если это предусмотрено организатором события." },
  { question: "Какие скидки доступны?", answer: "Мы предлагаем скидки для студентов, пенсионеров и групповых покупок." },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-12 text-center bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="max-w-4xl w-full p-6 bg-white shadow-lg rounded-xl">
        <div className="flex items-center justify-center mb-6">
          <HelpCircle className="w-10 h-10 text-indigo-600 mr-3" />
          <h1 className="text-4xl font-extrabold text-gray-800">Часто задаваемые вопросы</h1>
        </div>
        <p className="text-gray-600 text-lg mb-10">
          Здесь вы найдете ответы на самые популярные вопросы о билетах, оплате и возвратах.
        </p>

        <div className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-lg bg-gray-50 shadow-md p-5 transition hover:bg-gray-100 cursor-pointer" onClick={() => setOpenIndex(openIndex === index ? null : index)}>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Info className="w-5 h-5 text-indigo-500 mr-2" /> {faq.question}
                </h3>
                <ChevronDown className={`w-6 h-6 text-gray-600 transition-transform ${openIndex === index ? "rotate-180" : ""}`} />
              </div>
              {openIndex === index && <p className="mt-2 text-gray-600 text-left">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}