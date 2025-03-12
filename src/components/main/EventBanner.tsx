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

export default function EventBanner() {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    if (events.length > 1) {
      const interval = setInterval(() => {
        setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length);
      }, 5000); // Меняет событие каждые 5 секунд

      return () => clearInterval(interval);
    }
  }, [events]);

  const loadEvents = async () => {
    try {
      const data = await fetchEvents();
      setEvents(data);
    } catch (error) {
      console.error("Ошибка загрузки событий:", error);
    }
  };

  if (events.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center bg-gray-200 text-gray-500">
        Загрузка баннера...
      </div>
    );
  }

  const event = events[currentEventIndex];

  return (
    <section className="container mx-auto p-6">
      <div
        className="relative bg-gray-900 text-white rounded-lg overflow-hidden cursor-pointer"
        onClick={() => router.push(`/event/${event.id}`)}
      >
        <img
          src={event.imageUrl || "https://via.placeholder.com/1200x400"}
          alt={event.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center p-6">
          <h2 className="text-3xl font-bold">{event.title}</h2>
          <p className="mt-2 text-lg">{new Date(event.startTime).toLocaleString()}</p>
          <p className="mt-1 text-lg">{event.venue}</p>
          <p className="mt-2 text-xl font-semibold text-yellow-400">от {event.price}₸</p>
          <button
            className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
            onClick={(e) => {
              e.stopPropagation(); // Чтобы не срабатывал переход на `/event/${event.id}`
              router.push("/auth");
            }}
          >
            Подробнее
          </button>
        </div>
      </div>
    </section>
  );
}
