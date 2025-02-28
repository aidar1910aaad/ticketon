"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchEvents } from "@/api/events/index";

interface Event {
  id: string;
  title: string;
  category: { name: string };
  startTime: string;
  venue: string; // Локация события
  price?: string; // Цена билета
}

export default function PopularEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const router = useRouter();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const eventsData = await fetchEvents();
      console.log("🔹 Загруженные события:", eventsData);
      setEvents(eventsData);
    } catch (error) {
      console.error("Ошибка загрузки событий:", error);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">🔥 Популярные события</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            onClick={() => router.push(`/dashboard/event/${event.id}`)}
            className="relative w-[250px] h-[400px] bg-gray-700 rounded-lg shadow-lg flex flex-col justify-end p-4 cursor-pointer transition-transform hover:scale-105"
            style={{
              backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7))",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h3 className="text-white text-lg font-bold">{event.title}</h3>
            <p className="text-gray-300 text-sm">{event.category?.name}</p>
            <p className="text-gray-400 text-xs">{event.startTime}</p>
            <p className="text-gray-400 text-xs">{event.venue}</p>
            {event.price && <p className="text-green-400 text-sm font-semibold">от {event.price} ₸</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
