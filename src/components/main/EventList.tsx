"use client";

import { useEffect, useState } from "react";
import { fetchEvents } from "@/api/events/index";
import { useRouter } from "next/navigation";

interface Event {
  id: string;
  title: string;
  startTime: string;
  venue: string;
  price: string;
  imageUrl: string;
}

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await fetchEvents();
      setEvents(data.slice(0, 6)); // Отображаем 6 событий
    } catch (error) {
      console.error("Ошибка загрузки событий:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyTicket = (eventId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth"); // 🔒 Перенаправляем на логин, если не авторизован
    } else {
      router.push(`/event/${eventId}/tickets`);
    }
  };

  return (
    <section className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">🎭 Афиша событий</h2>

      {loading ? (
        <p className="text-center text-gray-500">Загрузка событий...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all transform hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={event.imageUrl || "https://via.placeholder.com/400x250"}
                alt={event.title}
                className="w-full h-52 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
                <p className="text-gray-600">{new Date(event.startTime).toLocaleString()}</p>
                <p className="text-gray-500">{event.venue}</p>
                <p className="text-lg font-bold text-blue-700 mt-3">от {event.price}₸</p>
                <button
                  className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                  onClick={() => handleBuyTicket(event.id)}
                >
                  Купить билет
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
