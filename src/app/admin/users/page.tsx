"use client";

import { useState, useEffect } from "react";
import { Plus, Trash, Edit, Key } from "lucide-react";
import { fetchUsers, deleteUser } from "@/api/users/index";
import EditUserModal from "@/components/EditUserModal";
import ResetPasswordModal from "@/components/ResetPasswordModal";

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
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [passwordResetUser, setPasswordResetUser] = useState<User | null>(null);

  useEffect(() => {
    async function loadUsers() {
      const data = await fetchUsers();
      if (data) setUsers(data.content);
    }
    loadUsers();
  }, []);

  const handleDeleteUser = async (id: string) => {
    if (confirm("Вы уверены, что хотите удалить пользователя?")) {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Пользователи</h1>

      <table className="mt-4 w-full border-collapse border border-gray-300 text-sm md:text-base">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Имя</th>
            <th className="border p-2">Фамилия</th>
            <th className="border p-2 hidden sm:table-cell">Телефон</th>
            <th className="border p-2 hidden sm:table-cell">Роль</th>
            <th className="border p-2">Активен</th>
            <th className="border p-2">Действия</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border">
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.surname}</td>
              <td className="p-2 border hidden sm:table-cell">{user.phoneNumber}</td>
              <td className="p-2 border hidden sm:table-cell">{user.role}</td>
              <td className="p-2 border">{user.isEnabled ? "✅" : "❌"}</td>
              <td className="p-2 border flex gap-2 flex-wrap">
                <button className="text-blue-500 flex items-center gap-1" onClick={() => setEditingUser(user)}>
                  <Edit size={16} /> Редактировать
                </button>
                <button className="text-yellow-500 flex items-center gap-1" onClick={() => setPasswordResetUser(user)}>
                  <Key size={16} /> Сброс пароля
                </button>
                <button className="text-red-500 flex items-center gap-1" onClick={() => handleDeleteUser(user.id)}>
                  <Trash size={16} /> Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Модальные окна */}
      {editingUser && <EditUserModal user={editingUser} onClose={() => setEditingUser(null)} />}
      {passwordResetUser && <ResetPasswordModal user={passwordResetUser} onClose={() => setPasswordResetUser(null)} />}
    </div>
  );
}
