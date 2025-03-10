import { useState } from "react";
import { Trash, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { deleteEvent } from "@/api/events/index";
import { fetchEventSessionsByEvent, deleteEventSession } from "@/api/events/event_session";
import SessionModal from "@/components/SessionModal";

interface Event {
  id: string;
  title: string;
  description: string;
  additionalInformation: string;
  category: {
    id: string;
    name: string;
  };
  ageRestriction: string;
  imageUrl: string;
  sessions: Session[];
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
      setSessions((prev) => ({ ...prev, [eventId]: undefined }));
      return;
    }

    const fetchedSessions = await fetchEventSessionsByEvent(eventId);
    setSessions((prev) => ({ ...prev, [eventId]: fetchedSessions }));
  };

  return (
    <div className="w-full">
      {/* 🌟 ПК-версия – Таблица */}
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
              <>
                <tr key={event.id} className="border text-xs md:text-sm">
                  <td className="p-2 border text-center">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-2 border">{event.title}</td>
                  <td className="p-2 border">{event.description}</td>
                  <td className="p-2 border">{event.category?.name || "Неизвестно"}</td>
                  <td className="p-2 border">{event.ageRestriction.replace("_", " ")}</td>
                  <td className="p-2 border text-center">
                    <button 
                      className="text-blue-500 flex items-center gap-1"
                      onClick={() => loadSessions(event.id)}
                    >
                      {sessions[event.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      {sessions[event.id] ? "Скрыть" : "Показать"}
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
                    <button 
                      className="text-red-500 flex items-center gap-1"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      <Trash size={16} /> Удалить
                    </button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🌟 Мобильная версия – Карточки */}
      <div className="md:hidden flex flex-col gap-4 mt-4">
        {events.map((event) => (
          <div key={event.id} className="bg-white shadow-lg rounded-lg p-4">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-lg font-bold mt-2">{event.title}</h3>
            <p className="text-gray-600">{event.description}</p>
            <p className="text-sm mt-1"><strong>Категория:</strong> {event.category.name}</p>
            <p className="text-sm"><strong>Возраст:</strong> {event.ageRestriction.replace("_", " ")}</p>
            
            <div className="flex flex-wrap justify-between items-center mt-4 gap-2">
              <button 
                className="text-blue-500 flex items-center gap-1"
                onClick={() => loadSessions(event.id)}
              >
                {sessions[event.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                {sessions[event.id] ? "Скрыть сессии" : "Показать сессии"}
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
              
              <button 
                className="text-red-500 flex items-center gap-1"
                onClick={() => handleDeleteEvent(event.id)}
              >
                <Trash size={16} /> Удалить
              </button>
            </div>

            {sessions[event.id] && (
              <div className="mt-4 bg-gray-100 p-2 rounded-lg">
                <h4 className="font-semibold text-center">Сессии</h4>
                {sessions[event.id].length > 0 ? (
                  <ul>
                    {sessions[event.id].map((session) => (
                      <li key={session.id} className="border-b py-2">
                        <p><strong>Дата:</strong> {new Date(session.startTime).toLocaleString()}</p>
                        <p><strong>Место:</strong> {session.building.name}, {session.building.address}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-center">Нет доступных сессий</p>
                )}
              </div>
            )}
          </div>
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
