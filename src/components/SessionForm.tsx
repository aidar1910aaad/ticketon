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
  });

  const handleCreateSession = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Токен отсутствует");

      if (!newSession.buildingId || !newSession.startTime) {
        alert("Заполните все поля!");
        return;
      }

      await createEventSession({ eventId, ...newSession }, token);
      onSessionAdded();
      setNewSession({ buildingId: "", startTime: "" });
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
        placeholder="ID здания"
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
