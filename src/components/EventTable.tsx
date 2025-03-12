"use client";

import { useState } from "react";
import { deleteEvent } from "@/api/events/index";
import { fetchEventSessionsByEvent, deleteEventSession } from "@/api/events/event_session";
import SessionModal from "@/components/SessionModal";
import EventRow from "@/components/EventRow";
import EventCard from "@/components/EventCard";

interface Event {
  id: string;
  title: string;
  description: string;
  additionalInformation: string;
  category: { id: string; name: string };
  ageRestriction: string;
  imageUrl: string;
  sessions: Session[];
}

interface Session {
  id: string;
  startTime: string;
  building: { name: string; address: string };
}

interface Props {
  events: Event[];
  onEventDeleted: () => void;
}

export default function EventTable({ events, onEventDeleted }: Props) {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [sessions, setSessions] = useState<{ [key: string]: Session[] }>({});
  const [modalOpen, setModalOpen] = useState(false);

  const loadSessions = async (eventId: string) => {
    if (sessions[eventId]) {
      setSessions((prev) => ({ ...prev, [eventId]: undefined }));
      return;
    }
    const fetchedSessions = await fetchEventSessionsByEvent(eventId);
    setSessions((prev) => ({ ...prev, [eventId]: fetchedSessions }));
  };

  return (
    <div className="w-full">
      {/* ПК-версия */}
      <div className="hidden md:block">
        <table className="mt-4 w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-sm md:text-base">
              <th className="border p-2">Изображение</th>
              <th className="border p-2">Название</th>
              <th className="border p-2">Описание</th>
              <th className="border p-2">Категория</th>
              <th className="border p-2">Возраст</th>
              <th className="border p-2">Сессии</th>
              <th className="border p-2">Действия</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <EventRow
                key={event.id}
                event={event}
                sessions={sessions[event.id] || []}
                loadSessions={loadSessions}
                setSelectedEvent={setSelectedEvent}
                setModalOpen={setModalOpen}
                onEventDeleted={onEventDeleted}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Мобильная версия */}
      <div className="md:hidden flex flex-col gap-4 mt-4">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            sessions={sessions[event.id] || []}
            loadSessions={loadSessions}
            setSelectedEvent={setSelectedEvent}
            setModalOpen={setModalOpen}
            onEventDeleted={onEventDeleted}
          />
        ))}
      </div>

      {selectedEvent && (
        <SessionModal
          eventId={selectedEvent}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSessionAdded={() => loadSessions(selectedEvent)}
        />
      )}
    </div>
  );
}
