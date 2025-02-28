"use client";

import { useEffect, useState } from "react";
import { Plus, Trash, Edit } from "lucide-react";
import { createEvent, deleteEvent, fetchEvents } from "../../../api/events/index";
import { fetchCategories } from "@/api/events/index";



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
  sessions: {
    id: string;
    event: string;
    building: {
      id: string;
      name: string;
      address: string;
      latitudeX: number;
      longitudeY: number;
      hasParking: boolean;
      city: {
        id: string;
        name: string;
      };
    };
    startTime: string;
  }[];
}





export default function EventsPage() {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    additionalInformation: "",
    categoryID: "",
    startTime: "",
    ageRestriction: "",
  });

  useEffect(() => {
    loadCategories();
  }, []);
  
  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error("Ошибка загрузки категорий:", error);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const fetchedEvents = await fetchEvents();
      setEvents(fetchedEvents);
    } catch (error) {
      console.error("Ошибка загрузки событий:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Вы уверены, что хотите удалить событие?")) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Токен отсутствует");

      await deleteEvent(id, token);
      setEvents(events.filter((event) => event.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении события:", error);
    }
  };

  const isValidUUID = (uuid: string) => {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid);
  };
  
  const handleCreate = async () => {
    try {
      setLoading(true);
  
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Токен отсутствует! Авторизуйтесь заново.");
      }
  
      // ✅ Проверяем, что все обязательные поля заполнены
      if (!newEvent.title || !newEvent.description || !newEvent.categoryID || !newEvent.startTime) {
        alert("Заполните все обязательные поля!");
        setLoading(false);
        return;
      }
  
      // ✅ Проверяем, является ли `categoryID` валидным UUID
      if (!isValidUUID(newEvent.categoryID)) {
        alert("Ошибка: `categoryID` должен быть валидным UUID!");
        setLoading(false);
        return;
      }
  
      const createdEvent = await createEvent(newEvent, token);
      setEvents([...events, createdEvent]);
  
      setNewEvent({
        title: "",
        description: "",
        additionalInformation: "",
        categoryID: "",
        startTime: "",
        ageRestriction: "",
      });
  
      console.log("Событие успешно создано:", createdEvent);
    } catch (error) {
      console.error("Ошибка при создании события:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">События</h1>

      <div className="flex flex-col gap-2 mt-4">
        <input
          type="text"
          placeholder="Название события"
          className="border px-3 py-2 rounded-lg"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Описание"
          className="border px-3 py-2 rounded-lg"
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Доп. информация"
          className="border px-3 py-2 rounded-lg"
          value={newEvent.additionalInformation}
          onChange={(e) => setNewEvent({ ...newEvent, additionalInformation: e.target.value })}
        />
        <select
  value={newEvent.categoryID}
  onChange={(e) => setNewEvent({ ...newEvent, categoryID: e.target.value })}
  className="border px-3 py-2 rounded-lg"
>
  <option value="">Выберите категорию</option>
  {categories.map((category) => (
    <option key={category.id} value={category.id}>
      {category.name}
    </option>
  ))}
</select>
        <input
          type="datetime-local"
          placeholder="Дата и время"
          className="border px-3 py-2 rounded-lg"
          value={newEvent.startTime}
          onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
        />
        <select
  value={newEvent.ageRestriction}
  onChange={(e) => setNewEvent({ ...newEvent, ageRestriction: e.target.value })}
  className="border px-3 py-2 rounded-lg"
>
  <option value="">Выберите возрастное ограничение</option>
  <option value="AGE_0_PLUS">0+</option>
  <option value="AGE_6_PLUS">6+</option>
  <option value="AGE_12_PLUS">12+</option>
  <option value="AGE_16_PLUS">16+</option>
  <option value="AGE_18_PLUS">18+</option>
</select>
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
          disabled={loading}
        >
          <Plus size={16} /> {loading ? "Создание..." : "Добавить событие"}
        </button>
      </div>

      <table className="mt-4 w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Название</th>
            <th className="border p-2">Описание</th>
            <th className="border p-2">Категория</th>
            <th className="border p-2">Возраст</th>
            <th className="border p-2">Действия</th>
          </tr>
        </thead>
        <tbody>
  {Array.isArray(events) ? (
    events.map((event) => (
      <tr key={event.id} className="border">
        <td className="p-2 border">{event.title}</td>
        <td className="p-2 border">{event.description}</td>
        <td className="p-2 border">{event.category?.name || "Неизвестно"}</td>
        <td className="p-2 border">{event.ageRestriction}</td>
        <td className="p-2 border flex gap-2">
          <button className="text-blue-500 flex items-center gap-1">
            <Edit size={16} /> Редактировать
          </button>
          <button
            onClick={() => handleDelete(event.id)}
            className="text-red-500 flex items-center gap-1"
          >
            <Trash size={16} /> Удалить
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={5} className="text-center p-4">
        Нет доступных событий
      </td>
    </tr>
  )}
</tbody>

      </table>
    </div>
  );
}
