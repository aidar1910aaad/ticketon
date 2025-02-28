"use client";
import { useEffect, useState } from "react";
import { fetchEvents } from "@/api/events/index";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Event {
  id: string;
  title: string;
  imageURL?: string; // ✅ Фон будет браться отсюда
}

const months = ["Февраль", "Март", "Апрель", "Май", "Июнь"];
const filters = ["Сегодня", "Завтра", "Выходные", "Неделя"];

export default function DashboardBanner() {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

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

  return (
    <div className="bg-blue-600 text-white p-6 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold">Афиша событий</h1>

      {/* Фильтры */}
      <div className="flex gap-3 mt-4">
        {months.map((month) => (
          <button key={month} className="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg text-sm hover:bg-gray-300">
            {month}
          </button>
        ))}
      </div>

      <div className="flex gap-3 mt-2">
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
            className="relative w-[1000px] h-[400px] rounded-lg shadow-lg flex flex-col items-center justify-center text-center text-white p-6"
            style={{
              backgroundImage: `url(${events[currentSlide].imageURL || "https://via.placeholder.com/400x200"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundBlendMode: "darken",
              backgroundColor: events[currentSlide].imageURL ? "rgba(0,0,0,0.5)" : "gray", // ✅ Затемняем фон
            }}
          >
            <h2 className="text-lg font-semibold">{events[currentSlide].title}</h2>
            <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
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
