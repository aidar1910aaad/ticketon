"use client";

import { useState } from "react";
import { Plus, Trash, Edit } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function UsersPage() {
  // Мок-данные пользователей
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Иван Иванов", email: "ivan@example.com" },
    { id: 2, name: "Мария Смирнова", email: "maria@example.com" },
    { id: 3, name: "Алексей Петров", email: "alexey@example.com" },
  ]);

  // Удаление пользователя
  const deleteUser = (id: number) => {
    if (!confirm("Вы уверены, что хотите удалить пользователя?")) return;
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Пользователи</h1>

      <button className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 flex items-center gap-2">
        <Plus size={16} /> Добавить пользователя
      </button>

      <table className="mt-4 w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Имя</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Действия</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border">
              <td className="p-2 border">{user.id}</td>
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border flex gap-2">
                <button className="text-blue-500 flex items-center gap-1">
                  <Edit size={16} /> Редактировать
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
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
