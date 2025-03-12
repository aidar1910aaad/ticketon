"use client";

import { useState } from "react";
import { Trash, Plus, ChevronDown, ChevronUp } from "lucide-react";
import SessionList from "@/components/SessionList";

interface Event {
  id: string;
  title: string;
  description: string;
  category: { id: string; name: string };
  ageRestriction: string;
  imageUrl: string;
  sessions: Session[];
}

interface Session {
  id: string;
  startTime: string;
}

interface Props {
  event: Event;
  setSelectedEvent: (eventId: string | null) => void;
  setModalOpen: (open: boolean) => void;
  onEventDeleted: () => void;
}

export default function EventCard({ event, setSelectedEvent, setModalOpen, onEventDeleted }: Props) {
  const [showSessions, setShowSessions] = useState(false);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <img src={event.imageUrl} alt={event.title} className="w-full h-40 object-cover rounded-md" />
      <h3 className="text-lg font-bold mt-2">{event.title}</h3>
      <p className="text-gray-600">{event.description}</p>
      <p className="text-sm mt-1">
        <strong>Категория:</strong> {event.category.name}
      </p>
      <p className="text-sm">
        <strong>Возраст:</strong> {event.ageRestriction.replace("_", " ")}
      </p>

      <div className="flex flex-wrap justify-between items-center mt-4 gap-2">
        <button className="text-blue-500 flex items-center gap-1" onClick={() => setShowSessions((prev) => !prev)}>
          {showSessions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          {showSessions ? "Скрыть сессии" : "Показать сессии"}
        </button>

        <button
          className="text-green-500 flex items-center gap-1"
          onClick={() => {
            setSelectedEvent(event.id);
            setModalOpen(true);
          }}
        >
          <Plus size={16} /> Добавить сессию
        </button>

        <button className="text-red-500 flex items-center gap-1" onClick={onEventDeleted}>
          <Trash size={16} /> Удалить
        </button>
      </div>

      {/* Отображение сессий, если showSessions === true */}
      {showSessions && event.sessions.length > 0 && <SessionList sessions={event.sessions} />}
    </div>
  );
}
