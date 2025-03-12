import React, { useState } from "react";

export default function SubscriptionSection() {
  const [email, setEmail] = useState("");

  return (
    <section className="container mx-auto p-6 text-center mb-10">
      <h2 className="text-2xl font-semibold mb-2 text-gray-900">Подпишитесь на новые события</h2>
      <p className="text-gray-600 mb-4">Получайте лучшие предложения прямо на почту!</p>
      
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-2 max-w-lg mx-auto">
        <input
          type="email"
          placeholder="Введите email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg w-full sm:w-2/3 focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          Подписаться
        </button>
      </div>
    </section>
  );
}
