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
  const { id } = useParams();
  const [event, setEvent] = useState<EventDetails | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    loadEvent(id);
  }, [id]);

  const loadEvent = async (eventId: string) => {
    try {
      setLoading(true);
      const eventData = await fetchEventById(eventId);
      console.log("🔹 Информация о событии:", eventData);
      setEvent(eventData);
    } catch (error) {
      console.error("Ошибка загрузки события:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
     

      {/* Основной контент */}
      <div className="w-full flex flex-col items-center">
        {/* Баннер (событие или заглушка) */}
        <div className="w-full h-[400px] bg-gray-700 bg-opacity-70 flex items-center justify-center text-white text-4xl font-bold shadow-md">
          {loading ? <div className="animate-pulse w-2/3 h-12 bg-gray-500 rounded-lg"></div> : event?.title}
        </div>

        {/* Контент */}
        <div className="w-full max-w-[1200px] p-8 bg-white rounded-lg shadow-lg mt-6">
          {loading ? (
            <>
              <div className="animate-pulse h-10 bg-gray-300 rounded-lg w-2/3 mx-auto"></div>
              <div className="animate-pulse h-6 bg-gray-300 rounded-lg w-1/3 mx-auto mt-2"></div>
            </>
          ) : (
            <>
              <h1 className="text-5xl font-bold text-center text-gray-800">{event?.title}</h1>
              <p className="text-gray-500 text-xl text-center mt-2">{event?.category?.name}</p>
            </>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
            {/* Дата и время */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
              <p className="text-gray-500 text-lg">📅 Дата и время</p>
              {loading ? (
                <div className="animate-pulse h-6 bg-gray-300 rounded-lg w-2/3 mx-auto mt-2"></div>
              ) : (
                <p className="text-2xl font-semibold mt-2">{event?.startTime}</p>
              )}
            </div>

            {/* Место проведения */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
              <p className="text-gray-500 text-lg">📍 Место</p>
              {loading ? (
                <div className="animate-pulse h-6 bg-gray-300 rounded-lg w-2/3 mx-auto mt-2"></div>
              ) : (
                <p className="text-2xl font-semibold mt-2">{event?.venue}</p>
              )}
            </div>

            {/* Цена */}
            <div className="bg-green-100 p-6 rounded-lg shadow-md text-center">
              <p className="text-green-600 text-lg">💰 Цена</p>
              {loading ? (
                <div className="animate-pulse h-6 bg-green-300 rounded-lg w-2/3 mx-auto mt-2"></div>
              ) : (
                <p className="text-2xl font-bold text-green-700 mt-2">
                  {event?.price ? `от ${event.price} ₸` : "Не указана"}
                </p>
              )}
            </div>
          </div>

          {/* Описание */}
          <div className="mt-8">
            <h2 className="text-3xl font-semibold text-gray-800">Описание</h2>
            {loading ? (
              <div className="animate-pulse h-20 bg-gray-300 rounded-lg mt-4"></div>
            ) : (
              <p className="text-gray-600 mt-4 text-lg">{event?.description}</p>
            )}
          </div>

          {/* Кнопки */}
          <div className="mt-8 flex flex-col md:flex-row gap-6 justify-center">
            <button
              className={`px-8 py-4 text-xl font-semibold rounded-lg shadow-md transition ${
                loading ? "bg-gray-400 text-gray-700" : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              disabled={loading}
            >
              Купить билет
            </button>

            <button
              onClick={() => router.back()}
              className="px-8 py-4 bg-gray-500 text-white text-xl font-semibold rounded-lg shadow-md hover:bg-gray-600 transition"
            >
              Назад
            </button>
          </div>
        </div>
      </div>

     
    </div>
  );
}
