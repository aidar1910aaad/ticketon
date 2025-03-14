"use client";

import { useEffect, useState } from "react";
import { Plus, Trash, Edit } from "lucide-react";
import { fetchUsers, updateUser, deleteUser, resetUserPassword } from "@/api/users/index";

interface User {
  id: string;
  name: string;
  surname: string;
  phoneNumber: string;
  role: string;
  isEnabled: boolean;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Получение списка пользователей
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data.content);
      } catch (error) {
        console.error("Ошибка загрузки пользователей:", error);
        setError("Ошибка загрузки данных.");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  // ✅ Удаление пользователя
  const handleDeleteUser = async (id: string) => {
    if (!confirm("Вы уверены, что хотите удалить пользователя?")) return;
    await deleteUser(id);
    setUsers(users.filter((user) => user.id !== id));
  };

  // ✅ Сброс пароля
  const handleResetPassword = async (id: string) => {
    const newPassword = prompt("Введите новый пароль:");
    if (!newPassword) return;
    await resetUserPassword(id, newPassword);
    alert("Пароль успешно сброшен!");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Пользователи</h1>

      <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2">
        <Plus size={16} /> Добавить пользователя
      </button>

      {loading ? (
        <p className="mt-4">Загрузка...</p>
      ) : error ? (
        <p className="mt-4 text-red-500">{error}</p>
      ) : (
        <table className="mt-4 w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Имя</th>
              <th className="border p-2">Фамилия</th>
              <th className="border p-2">Телефон</th>
              <th className="border p-2">Роль</th>
              <th className="border p-2">Статус</th>
              <th className="border p-2">Действия</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border">
                <td className="p-2 border">{user.id}</td>
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.surname}</td>
                <td className="p-2 border">{user.phoneNumber}</td>
                <td className="p-2 border">{user.role}</td>
                <td className="p-2 border">{user.isEnabled ? "Активен" : "Заблокирован"}</td>
                <td className="p-2 border flex gap-2">
                  <button className="text-blue-500 flex items-center gap-1">
                    <Edit size={16} /> Редактировать
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-500 flex items-center gap-1"
                  >
                    <Trash size={16} /> Удалить
                  </button>
                  <button
                    onClick={() => handleResetPassword(user.id)}
                    className="text-yellow-500 flex items-center gap-1"
                  >
                    🔑 Сброс пароля
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
