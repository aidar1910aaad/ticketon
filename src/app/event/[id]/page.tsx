"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchEventById } from "@/api/events/index";
import AuthNavbar from "@/components/dashboard/AuthNavbar";
import Footer from "@/components/Footer";

interface EventDetails {
  id: string;
  title: string;
  description: string;
  category: { name: string };
  startTime: string;
  venue: string;
  price?: string;
}

export default function EventPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id || ""; // ✅ Обработали id безопасно
  const [event, setEvent] = useState<EventDetails | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!id || typeof id !== "string") return; // ✅ Проверяем, что id — строка

    const loadEvent = async () => {
      try {
        const eventData = await fetchEventById(id);
        console.log("🔹 Информация о событии:", eventData);
        setEvent(eventData);
      } catch (error) {
        console.error("Ошибка загрузки события:", error);
      }
    };

    loadEvent();
  }, [id]);

  if (!event)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <p className="text-gray-500 text-lg">Загрузка...</p>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <AuthNavbar />

      {/* Основной контент */}
      <div className="max-w-[1200px] mx-auto p-6 bg-white rounded-lg shadow-lg mt-6 flex-1 w-full">
        {/* Блок с фоновым изображением (заменой фото) */}
        <div className="w-full h-[350px] bg-gray-700 bg-opacity-50 rounded-lg flex items-center justify-center text-white text-3xl font-bold shadow-md">
          <span>📷 Изображение недоступно</span>
        </div>

        {/* Информация о событии */}
        <div className="mt-6 p-8 bg-gray-50 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-center text-gray-800">{event.title}</h1>
          <p className="text-gray-500 text-lg text-center mt-2">{event.category?.name}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Дата и время */}
            <div className="bg-gray-200 p-5 rounded-lg shadow-sm">
              <p className="text-gray-600 text-sm">📅 Дата и время</p>
              <p className="text-lg font-semibold">{event.startTime}</p>
            </div>

            {/* Место проведения */}
            <div className="bg-gray-200 p-5 rounded-lg shadow-sm">
              <p className="text-gray-600 text-sm">📍 Место</p>
              <p className="text-lg font-semibold">{event.venue}</p>
            </div>
          </div>

          {/* Цена */}
          {event.price && (
            <div className="bg-green-100 p-5 rounded-lg mt-6 text-center shadow-sm">
              <p className="text-green-600 text-sm">💰 Цена</p>
              <p className="text-2xl font-bold text-green-700">от {event.price} ₸</p>
            </div>
          )}

          {/* Описание */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800">Описание</h2>
            <p className="text-gray-600 mt-2">{event.description}</p>
          </div>

          {/* Кнопки */}
          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 transition">
              Купить билет
            </button>

            <button
              onClick={() => router.back()}
              className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg text-lg font-semibold shadow-md hover:bg-gray-600 transition"
            >
              Назад
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
