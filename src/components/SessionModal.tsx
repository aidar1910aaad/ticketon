"use client";

import { useState } from "react";
import { createEventSession } from "@/api/events/event_session";
import { X } from "lucide-react";

interface Props {
  eventId: string;
  isOpen: boolean;
  onClose: () => void;
  onSessionAdded: () => void;
}

export default function SessionModal({ eventId, isOpen, onClose, onSessionAdded }: Props) {
  const [loading, setLoading] = useState(false);
  
  // Фиксированные ID для города Ош и соответствующего здания
  const OSH_CITY_ID = "a67f91e5-ce67-4062-923c-d6c4ac6a5cc6";
  const OSH_BUILDING_ID = "b1234567-abcd-8901-efgh-234567890xyz"; // 🔥 Укажи правильный ID здания в Оше

  const [newSession, setNewSession] = useState({
    startTime: "",
  });

  if (!isOpen) return null;

  const handleCreateSession = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Токен отсутствует");

      if (!newSession.startTime) {
        alert("Заполните дату и время!");
        return;
      }

      await createEventSession({
        eventId,
        buildingId: OSH_BUILDING_ID, // 🔥 Автоматически привязанное здание
        cityId: OSH_CITY_ID, // 🔥 Автоматически привязанный город
        startTime: newSession.startTime,
      }, token);

      onSessionAdded();
      onClose();
      setNewSession({ startTime: "" });
    } catch (error) {
      console.error("Ошибка при создании сессии:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Добавить сессию</h2>
          <button onClick={onClose} className="text-gray-500">
            <X size={20} />
          </button>
        </div>

        {/* Фиксированное поле города Ош */}
        <label className="block text-sm font-medium text-gray-700">Город</label>
        <select disabled className="border px-3 py-2 rounded-lg w-full mb-2 bg-gray-100 cursor-not-allowed">
          <option value={OSH_CITY_ID}>Ош</option>
        </select>

        {/* Фиксированное здание в Оше */}
        <label className="block text-sm font-medium text-gray-700">Здание</label>
        <select disabled className="border px-3 py-2 rounded-lg w-full mb-2 bg-gray-100 cursor-not-allowed">
          <option value={OSH_BUILDING_ID}>Основное здание, Ош</option>
        </select>

        {/* Дата и время (изменяемое поле) */}
        <label className="block text-sm font-medium text-gray-700">Дата и время</label>
        <input
          type="datetime-local"
          className="border px-3 py-2 rounded-lg w-full mb-2"
          value={newSession.startTime}
          onChange={(e) => setNewSession({ startTime: e.target.value })}
        />

        <button
          onClick={handleCreateSession}
          className="bg-blue-600 text-white px-4 py-2 rounded-md w-full"
          disabled={loading}
        >
          {loading ? "Добавление..." : "Добавить"}
        </button>
      </div>
    </div>
  );
}
