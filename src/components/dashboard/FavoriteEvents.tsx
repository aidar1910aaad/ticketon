"use client";

import { useState } from "react";

const FavoriteEvents = () => {
  const [favorites] = useState([
    { id: 1, name: "Фестиваль музыки", date: "20 мая 2025" },
    { id: 2, name: "Спектакль Гамлет", date: "5 июня 2025" },
  ]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Избранные события</h2>
      <ul>
        {favorites.map((event) => (
          <li key={event.id} className="p-2 border-b">
            <span className="font-semibold">{event.name}</span> – {event.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteEvents;
