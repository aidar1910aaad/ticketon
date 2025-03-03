import { useState } from "react";
import { Trash, Edit, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { deleteEvent } from "@/api/events/index";
import { fetchEventSessionsByEvent, deleteEventSession } from "@/api/events/event_session";
import SessionModal from "@/components/SessionModal";

interface Event {
  id: string;
  title: string;
  description: string;
  category: {
    name: string;
  };
  ageRestriction: string;
}

interface Session {
  id: string;
  startTime: string;
  building: {
    name: string;
    address: string;
  };
}

interface Props {
  events: Event[];
  onEventDeleted: () => void;
}

export default function EventTable({ events, onEventDeleted }: Props) {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [sessions, setSessions] = useState<{ [key: string]: Session[] }>({});
  const [modalOpen, setModalOpen] = useState(false);

  const handleDeleteEvent = async (id: string) => {
    if (!confirm("Удалить событие?")) return;
    const token = localStorage.getItem("token");
    if (!token) return;

    await deleteEvent(id, token);
    onEventDeleted();
  };

  const handleDeleteSession = async (eventId: string, sessionId: string) => {
    if (!confirm("Удалить сессию?")) return;
    const token = localStorage.getItem("token");
    if (!token) return;

    await deleteEventSession(sessionId, token);
    setSessions((prev) => ({
      ...prev,
      [eventId]: prev[eventId].filter((s) => s.id !== sessionId),
    }));
  };

  const loadSessions = async (eventId: string) => {
    if (sessions[eventId]) {
      // Если сессии уже загружены, скрываем их
      setSessions((prev) => ({ ...prev, [eventId]: undefined }));
      return;
    }

    const fetchedSessions = await fetchEventSessionsByEvent(eventId);
    setSessions((prev) => ({ ...prev, [eventId]: fetchedSessions }));
  };

  return (
    <>
      <table className="mt-4 w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
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
            <>
              <tr key={event.id} className="border">
                <td className="p-2 border">{event.title}</td>
                <td className="p-2 border">{event.description}</td>
                <td className="p-2 border">{event.category?.name || "Неизвестно"}</td>
                <td className="p-2 border">{event.ageRestriction}</td>
                <td className="p-2 border text-center">
                  <button 
                    className="text-blue-500 flex items-center gap-1"
                    onClick={() => loadSessions(event.id)}
                  >
                    {sessions[event.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    {sessions[event.id] ? "Скрыть" : "Показать"}
                  </button>
                </td>
                <td className="p-2 border flex gap-2">
                  <button 
                    className="text-blue-500 flex items-center gap-1"
                    onClick={() => {
                      setSelectedEvent(event.id);
                      setModalOpen(true);
                    }}
                  >
                    <Plus size={16} /> Добавить сессию
                  </button>
                  <button 
                    className="text-red-500 flex items-center gap-1"
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    <Trash size={16} /> Удалить
                  </button>
                </td>
              </tr>

              {sessions[event.id] && (
                <tr>
                  <td colSpan={6} className="border p-2">
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h3 className="font-semibold">Сессии для "{event.title}"</h3>
                      {sessions[event.id].length > 0 ? (
                        <ul className="mt-2">
                          {sessions[event.id].map((session) => (
                            <li 
                              key={session.id} 
                              className="flex justify-between items-center border-b py-2"
                            >
                              <div>
                                <p><strong>Дата:</strong> {new Date(session.startTime).toLocaleString()}</p>
                                <p><strong>Место:</strong> {session.building.name}, {session.building.address}</p>
                              </div>
                              <button 
                                className="text-red-500 flex items-center gap-1"
                                onClick={() => handleDeleteSession(event.id, session.id)}
                              >
                                <Trash size={16} /> Удалить
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500">Нет доступных сессий</p>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>

      {selectedEvent && (
        <SessionModal 
          eventId={selectedEvent}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSessionAdded={() => loadSessions(selectedEvent)}
        />
      )}
    </>
  );
}
