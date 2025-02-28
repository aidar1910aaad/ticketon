import React from "react";

export default function EventBanner() {
  return (
    <section className="container mx-auto p-4">
      <div className="relative bg-gray-900 text-white p-6 rounded-lg overflow-hidden">
        <img
          src="https://via.placeholder.com/1200x400"
          alt="Специальное событие"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10">
          <h2 className="text-3xl font-bold">Скидки на концерты до 50%</h2>
          <p className="mt-2 text-lg">Только до конца месяца!</p>
          <button className="mt-4 bg-yellow-500 text-gray-900 py-2 px-4 rounded hover:bg-yellow-400 transition">
            Узнать больше
          </button>
        </div>
      </div>
    </section>
  );
}
