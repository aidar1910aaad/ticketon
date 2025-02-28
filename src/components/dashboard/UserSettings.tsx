"use client";

import { useState } from "react";

const UserSettings = () => {
  const [username, setUsername] = useState("Иван Иванов");

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Настройки профиля</h2>
      <label className="block mb-2">Имя пользователя</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 border rounded-md"
      />
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
        Сохранить
      </button>
    </div>
  );
};

export default UserSettings;
