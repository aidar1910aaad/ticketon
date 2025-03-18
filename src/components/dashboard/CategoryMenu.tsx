"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchCategories } from "@/api/events/index";

interface Category {
  id: string;
  name: string;
}

export default function CategoryMenu() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    loadCategories();

    // Заменяем `useSearchParams()` на `window.location.search`
    const params = new URLSearchParams(window.location.search);
    setActiveCategory(params.get("category") || "");
  }, []);

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error("Ошибка загрузки категорий:", error);
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/events?category=${categoryId}`);
    setActiveCategory(categoryId);
  };

  return (
    <nav className="bg-gray-100 p-2 flex flex-wrap justify-center space-x-4 shadow-md">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className={`text-gray-800 hover:text-blue-600 ${
            activeCategory === category.id ? "font-bold text-blue-600" : ""
          }`}
        >
          {category.name}
        </button>
      ))}
    </nav>
  );
}
