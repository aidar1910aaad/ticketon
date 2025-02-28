import React from "react";

export default function EventFilters() {
  return (
    <section className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Фильтр событий</h2>
      <div className="flex flex-wrap gap-4">
        <select className="border p-2 rounded w-full md:w-auto">
          <option>Все категории</option>
          <option>Концерты</option>
          <option>Театр</option>
          <option>Спорт</option>
        </select>
        <input type="date" className="border p-2 rounded w-full md:w-auto" />
        <input type="number" placeholder="Макс. цена" className="border p-2 rounded w-full md:w-auto" />
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
          Применить
        </button>
      </div>
    </section>
  );
}
