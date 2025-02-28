import React, { useState } from "react";

export default function SubscriptionSection() {
  const [email, setEmail] = useState("");

  return (
    <section className="container mx-auto p-4 text-center">
      <h2 className="text-2xl font-semibold mb-2">Подпишитесь на новые события</h2>
      <p className="text-gray-600 mb-4">Получайте лучшие предложения прямо на почту!</p>
      <div className="flex justify-center gap-2">
        <input
          type="email"
          placeholder="Введите email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
          Подписаться
        </button>
      </div>
    </section>
  );
}
