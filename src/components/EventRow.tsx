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

export default function EventRow({ event, setSelectedEvent, setModalOpen, onEventDeleted }: Props) {
  const [showSessions, setShowSessions] = useState(false);

  return (
    <>
      <tr key={event.id} className="border text-xs md:text-sm">
        <td className="p-2 border text-center">
          <img src={event.imageUrl} alt={event.title} className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-md" />
        </td>
        <td className="p-2 border">{event.title}</td>
        <td className="p-2 border">{event.description}</td>
        <td className="p-2 border">{event.category?.name || "Неизвестно"}</td>
        <td className="p-2 border">{event.ageRestriction.replace("_", " ")}</td>
        <td className="p-2 border text-center">
          <button
            className="text-blue-500 flex items-center gap-1"
            onClick={() => setShowSessions((prev) => !prev)}
          >
            {showSessions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            {showSessions ? "Скрыть" : "Показать"}
          </button>
        </td>
        <td className="p-2 border flex flex-col md:flex-row gap-2">
          <button
            className="text-blue-500 flex items-center gap-1"
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
        </td>
      </tr>

      {/* Отображение сессий, если showSessions === true */}
      {showSessions && event.sessions.length > 0 && (
        <tr>
          <td colSpan={7} className="border p-2">
            <SessionList sessions={event.sessions} />
          </td>
        </tr>
      )}
    </>
  );
}
