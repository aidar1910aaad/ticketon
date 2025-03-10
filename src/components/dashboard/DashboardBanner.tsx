"use client";

import { useEffect, useState } from "react";
import { fetchEvents } from "@/api/events/index";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Event {
  id: string;
  title: string;
  imageUrl?: string; // ✅ API возвращает `imageUrl`
}

const months = ["Февраль", "Март", "Апрель", "Май", "Июнь"];
const filters = ["Сегодня", "Завтра", "Выходные", "Неделя"];

export default function DashboardBanner() {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % events.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [events]);

  const loadEvents = async () => {
    try {
      const eventsData = await fetchEvents();
      console.log("🔹 Загруженные события:", eventsData);
      setEvents(eventsData);
    } catch (error) {
      console.error("Ошибка загрузки событий:", error);
    }
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + events.length) % events.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % events.length);
  };

  const handleImageError = (eventId: string) => {
    setImageError((prev) => ({ ...prev, [eventId]: true }));
  };

  return (
    <div className="bg-blue-600 text-white p-6 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold">Афиша событий</h1>

      {/* Фильтры */}
      <div className="flex flex-wrap gap-3 mt-4">
        {months.map((month) => (
          <button key={month} className="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg text-sm hover:bg-gray-300">
            {month}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 mt-2">
        {filters.map((filter) => (
          <button key={filter} className="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg text-sm hover:bg-gray-300">
            {filter}
          </button>
        ))}
      </div>

      {/* Слайдер событий */}
      {events.length > 0 ? (
        <div className="relative mt-6 flex items-center justify-center">
          <button onClick={handlePrev} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
            <ChevronLeft size={24} className="text-gray-800" />
          </button>

          <div
            className="relative w-full max-w-3xl h-[400px] rounded-lg shadow-lg flex flex-col items-center justify-center text-center text-white p-6"
            style={{
              backgroundImage: imageError[events[currentSlide].id]
                ? `url("/fallback-image.jpg")`
                : `url(${events[currentSlide].imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Фоновая картинка */}
            <img
              src={events[currentSlide].imageUrl || "/fallback-image.jpg"}
              alt={events[currentSlide].title}
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
              onError={() => handleImageError(events[currentSlide].id)}
            />

            {/* Затемняющий фон */}
            <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>

            {/* Контент */}
            <h2 className="relative text-lg font-semibold z-10">{events[currentSlide].title}</h2>
            <button className="relative mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition z-10">
              Купить билет
            </button>
          </div>

          <button onClick={handleNext} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
            <ChevronRight size={24} className="text-gray-800" />
          </button>
        </div>
      ) : (
        <p className="mt-4 text-red-400">⚠️ События не найдены. Попробуйте позже.</p>
      )}
    </div>
  );
}
