"use client"
import { useState } from "react";
import { Plus, Trash, Edit } from "lucide-react";

interface Building {
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
}

export default function BuildingsPage() {
  // Мок-данные зданий (на основе API-схемы)
  const [buildings, setBuildings] = useState<Building[]>([
    {
      id: "1",
      name: "Театр им. Чехова",
      address: "ул. Чехова, 10",
      latitudeX: 55.7558,
      longitudeY: 37.6173,
      hasParking: true,
      city: { id: "101", name: "Москва" },
    },
    {
      id: "2",
      name: "ДК Ленсовета",
      address: "пр. Невский, 45",
      latitudeX: 59.9311,
      longitudeY: 30.3609,
      hasParking: false,
      city: { id: "102", name: "Санкт-Петербург" },
    },
    {
      id: "3",
      name: "Центр искусств",
      address: "ул. Арбат, 25",
      latitudeX: 55.7522,
      longitudeY: 37.6156,
      hasParking: true,
      city: { id: "101", name: "Москва" },
    },
  ]);

  // Удаление здания (локальное)
  const deleteBuilding = (id: string) => {
    if (!confirm("Вы уверены, что хотите удалить здание?")) return;
    setBuildings(buildings.filter((building) => building.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Здания</h1>

      <button className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 flex items-center gap-2">
        <Plus size={16} /> Добавить здание
      </button>

      <table className="mt-4 w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Название</th>
            <th className="border p-2">Адрес</th>
            <th className="border p-2">Город</th>
            <th className="border p-2">Координаты</th>
            <th className="border p-2">Парковка</th>
            <th className="border p-2">Действия</th>
          </tr>
        </thead>
        <tbody>
          {buildings.map((building) => (
            <tr key={building.id} className="border">
              <td className="p-2 border">{building.name}</td>
              <td className="p-2 border">{building.address}</td>
              <td className="p-2 border">{building.city.name}</td>
              <td className="p-2 border">
                {building.latitudeX}, {building.longitudeY}
              </td>
              <td className="p-2 border">{building.hasParking ? "✅" : "❌"}</td>
              <td className="p-2 border flex gap-2">
                <button className="text-blue-500 flex items-center gap-1">
                  <Edit size={16} /> Редактировать
                </button>
                <button
                  onClick={() => deleteBuilding(building.id)}
                  className="text-red-500 flex items-center gap-1"
                >
                  <Trash size={16} /> Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
