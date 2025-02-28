import React from "react";

const events = [
  {
    id: 1,
    name: "Imagine Dragons – Mercury Tour",
    date: "10 апреля 2025",
    location: "Москва, ВТБ Арена",
    price: "от 3000₽",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 2,
    name: "Театральное шоу «Гамлет»",
    date: "15 мая 2025",
    location: "Санкт-Петербург, Александринский театр",
    price: "от 1500₽",
    image: "https://via.placeholder.com/300x200",
  },
];

export default function EventList() {
  return (
    <section className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Афиша событий</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={event.image} alt={event.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{event.name}</h3>
              <p className="text-gray-600">{event.date} | {event.location}</p>
              <p className="text-lg font-bold mt-2">{event.price}</p>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Купить билет
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
