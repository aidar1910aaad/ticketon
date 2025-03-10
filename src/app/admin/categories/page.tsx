"use client";

import { useState, useEffect } from "react";
import { Plus, Trash } from "lucide-react";
import { fetchEventCategories, createEventCategory, deleteEventCategory } from "@/api/category/index";

export default function EventCategories() {
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await fetchEventCategories();
        setCategories(data);
      } catch (error) {
        console.error("Ошибка загрузки категорий:", error);
      }
    }
    loadCategories();
  }, []);

  const handleCreateCategory = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Токен отсутствует! Авторизуйтесь заново.");
      if (!newCategory.trim()) {
        alert("Введите название категории!");
        return;
      }
      const createdCategory = await createEventCategory(newCategory, token);
      setCategories([...categories, createdCategory]);
      setNewCategory("");
    } catch (error) {
      console.error("Ошибка при создании категории:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!confirm("Удалить категорию?")) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Токен отсутствует! Авторизуйтесь заново.");
      await deleteEventCategory(categoryId, token);
      setCategories(categories.filter((category) => category.id !== categoryId));
    } catch (error) {
      console.error("Ошибка при удалении категории:", error);
      alert(error.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Управление категориями</h1>
      <p className="text-gray-600 mb-6">Добавляйте, просматривайте и удаляйте категории событий.</p>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Название категории"
          className="border px-3 py-2 rounded-lg w-full"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button
          onClick={handleCreateCategory}
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
          disabled={loading}
        >
          <Plus size={16} /> {loading ? "Добавление..." : "Добавить"}
        </button>
      </div>
      
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Название</th>
            <th className="border p-2">Действия</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((category) => (
              <tr key={category.id} className="border">
                <td className="p-2 border">{category.name}</td>
                <td className="p-2 border text-center">
                  <button
                    className="text-red-500 flex items-center gap-1"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <Trash size={16} /> Удалить
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="text-center text-gray-500 p-4">Категорий пока нет</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}