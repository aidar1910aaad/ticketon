"use client";

import { useState } from "react";
import { createEventSession } from "@/api/events/event_session";
import { Plus } from "lucide-react";

interface Props {
  eventId: string;
  onSessionAdded: () => void;
}

export default function SessionForm({ eventId, onSessionAdded }: Props) {
  const [loading, setLoading] = useState(false);
  const [newSession, setNewSession] = useState({
    buildingId: "",
    startTime: "",
    price: "",
  });

  const handleCreateSession = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Токен отсутствует");

      if (!newSession.startTime || !newSession.price) {
        alert("Заполните дату, время и цену!");
        return;
      }

      // 🛠 Преобразуем в строгий UTC ISO 8601 формат
      const localDate = new Date(newSession.startTime);
      const utcDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);
      const formattedStartTime = utcDate.toISOString().replace(".000", ""); // ❗ Убираем лишние нули

      console.log("📌 Отправка запроса с датой:", formattedStartTime);

      await createEventSession(
        {
          eventId,
          price: Number(newSession.price), // Преобразуем в число
          startTime: formattedStartTime, // ✅ Строгий формат
          buildingId: newSession.buildingId || undefined, // Если есть buildingId, добавляем
        },
        token
      );

      onSessionAdded();
      setNewSession({ startTime: "", price: "", buildingId: "" });
    } catch (error) {
      console.error("Ошибка при создании сессии:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 mt-2">
      <input
        type="text"
        placeholder="ID здания (необязательно)"
        className="border px-3 py-2 rounded-lg"
        value={newSession.buildingId}
        onChange={(e) => setNewSession({ ...newSession, buildingId: e.target.value })}
      />
      <input
        type="datetime-local"
        className="border px-3 py-2 rounded-lg"
        value={newSession.startTime}
        onChange={(e) => setNewSession({ ...newSession, startTime: e.target.value })}
      />
      <input
        type="number"
        placeholder="Цена билета"
        className="border px-3 py-2 rounded-lg"
        value={newSession.price}
        onChange={(e) => setNewSession({ ...newSession, price: e.target.value })}
      />
      <button
        onClick={handleCreateSession}
        className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
        disabled={loading}
      >
        <Plus size={16} /> {loading ? "Добавление..." : "Добавить сессию"}
      </button>
    </div>
  );
}
