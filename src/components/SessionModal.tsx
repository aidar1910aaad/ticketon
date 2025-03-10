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
  const [newSession, setNewSession] = useState({
    startTime: "",
    price: "",
  });

  if (!isOpen) return null;

  const handleCreateSession = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Токен отсутствует");

      if (!newSession.startTime || !newSession.price) {
        alert("Заполните дату, время и цену!");
        return;
      }

      await createEventSession(
        {
          eventId,
          startTime: newSession.startTime,
          price: parseFloat(newSession.price),
        },
        token
      );

      onSessionAdded();
      onClose();
      setNewSession({ startTime: "", price: "" });
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

        {/* 🔹 Дата и время */}
        <label className="block text-sm font-medium text-gray-700">Дата и время</label>
        <input
          type="datetime-local"
          className="border px-3 py-2 rounded-lg w-full mb-2"
          value={newSession.startTime}
          onChange={(e) => setNewSession({ ...newSession, startTime: e.target.value })}
        />

        {/* 🔹 Цена */}
        <label className="block text-sm font-medium text-gray-700">Цена (KGS)</label>
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="Введите цену"
          className="border px-3 py-2 rounded-lg w-full mb-2"
          value={newSession.price}
          onChange={(e) => setNewSession({ ...newSession, price: e.target.value })}
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
