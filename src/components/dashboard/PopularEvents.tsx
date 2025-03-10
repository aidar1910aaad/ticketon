"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchEvents } from "@/api/events/index";

interface Event {
  id: string;
  title: string;
  category: { name: string };
  startTime: string;
  venue: string;
  price?: string;
  imageUrl?: string;
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
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">🔥 Популярные события</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            onClick={() => router.push(`/dashboard/event/${event.id}`)}
            className="relative h-[350px] rounded-xl shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
            style={{
              backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2)), url(${event.imageUrl || "https://via.placeholder.com/400x200"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 p-4 flex flex-col justify-end">
              <h3 className="text-white text-lg font-bold">{event.title}</h3>
              <p className="text-gray-300 text-sm">{event.category?.name}</p>
              <p className="text-gray-400 text-xs">{new Date(event.startTime).toLocaleString()}</p>
              <p className="text-gray-400 text-xs">{event.venue}</p>
              {event.price && <p className="text-green-400 text-sm font-semibold mt-2">от {event.price} ₸</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
