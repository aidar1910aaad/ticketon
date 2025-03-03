"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { createEvent, fetchCategories } from "@/api/events/index";

interface Props {
  onEventCreated: () => void;
}

export default function EventForm({ onEventCreated }: Props) {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
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
    async function loadCategories() {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Ошибка загрузки категорий:", error);
      }
    }
    loadCategories();
  }, []);

  const isValidUUID = (uuid: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid);

  const handleCreate = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) throw new Error("Токен отсутствует! Авторизуйтесь заново.");

      if (!newEvent.title || !newEvent.description || !newEvent.categoryID || !newEvent.startTime) {
        alert("Заполните все обязательные поля!");
        return;
      }

      if (!isValidUUID(newEvent.categoryID)) {
        alert("Ошибка: `categoryID` должен быть валидным UUID!");
        return;
      }

      await createEvent(newEvent, token);
      onEventCreated();
      setNewEvent({
        title: "",
        description: "",
        additionalInformation: "",
        categoryID: "",
        startTime: "",
        ageRestriction: "",
      });
    } catch (error) {
      console.error("Ошибка при создании события:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
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
        className="border px-3 py-2 rounded-lg"
        value={newEvent.startTime}
        onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
      />
      <select
        value={newEvent.ageRestriction}
        onChange={(e) => setNewEvent({ ...newEvent, ageRestriction: e.target.value })}
        className="border px-3 py-2 rounded-lg"
      >
        <option value="">Возрастное ограничение</option>
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
  );
}
