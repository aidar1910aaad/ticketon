"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search, Globe, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const mainCategories = [
  "Категории событий",
  "Международные события",
  "Горящие туры",
  "Сертификаты",
  "Новинки",
  "Акции",
  "Последний шанс купить",
  "Знакомство с Ticketon",
  "Как покупать билеты?",
  "Способы оплаты",
  "Правила возврата",
  "Организаторам",
  "Медиа",
  "Помощь",
];

const contacts = [
  "+996 (312) 88-00-00 (Бишкек)",
  "+996 (551) 88-00-00 (WhatsApp)",
  "Telegram",
  "support@ticketon.kg",
];

const subCategories = [
  "Кино",
  "Театры",
  "Концерты",
  "Спорт",
  "Детям",
  "Stand Up",
  "Туры",
  "Мастер-классы",
  "Бизнес-форумы",
  "Музеи",
  "Развлечения",
];

const cities = [
  "Бишкек",
  "Ош",
  "Джалал-Абад",
  "Каракол",
  "Нарын",
  "Баткен",
  "Талас",
  "Кант",
  "Токмок",
  "Балыкчы",
];

export default function AuthNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Выбрать город");
  const [selectedLanguage, setSelectedLanguage] = useState("RU");
  const router = useRouter();

  // Функция выхода
  const handleLogout = () => {
    if (confirm("Вы действительно хотите выйти?")) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      router.push("/"); // Перенаправление на страницу авторизации
    }
  };

  return (
    <>
      {/* Верхний навбар */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center max-w-[1440px] mx-auto">
        {/* Логотип */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Ticketon
        </Link>

        {/* Выбор города */}
        <div className="relative">
          <button
            onClick={() => setIsCityOpen(!isCityOpen)}
            className="hover:text-gray-600"
          >
            {selectedCity}
          </button>
          {isCityOpen && (
            <ul className="absolute bg-white border shadow-md rounded-md mt-2 w-48 max-h-60 overflow-y-auto z-50">
              {cities.map((city) => (
                <li
                  key={city}
                  onClick={() => {
                    setSelectedCity(city);
                    setIsCityOpen(false);
                  }}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Поиск */}
        <div className="relative w-1/3">
          <Input placeholder="Поиск мероприятий..." className="pl-10" />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Кнопка "Кабинет" */}
        <Button variant="outline">Кабинет</Button>

        {/* Переключатель языка */}
        <div className="ml-4 flex items-center space-x-2 border p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
          <Globe />
          <select
            className="bg-transparent outline-none cursor-pointer"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value="ru">Русский</option>
            <option value="kg">Кыргызча</option>
          </select>
        </div>

        {/* Гамбургер-меню */}
        <Button
          variant="ghost"
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative z-50"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </header>

      {/* Компактное выпадающее меню (не фиксируется при скролле) */}
      {menuOpen && (
        <div className="absolute top-[70px] right-4 w-64 bg-white shadow-lg rounded-md transition-all duration-300 z-50 p-4">
          <ul className="space-y-2">
            {mainCategories.slice(0, 5).map((category, idx) => (
              <li key={idx} className="border-b pb-2">
                <Link href="#" className="text-lg hover:text-blue-600">
                  {category}
                </Link>
              </li>
            ))}
          </ul>

          {/* Контакты */}
          <div className="mt-4 border-t pt-2">
            {contacts.map((contact, idx) => (
              <p key={idx} className="text-sm text-gray-600">{contact}</p>
            ))}
          </div>

          {/* Кнопка "Выйти" */}
          <button
            onClick={handleLogout}
            className="w-full mt-4 flex items-center justify-center gap-2 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            <LogOut size={20} /> Выйти
          </button>
        </div>
      )}

      {/* Нижний навбар с категориями */}
      <nav className="bg-gray-100 p-2 flex justify-center space-x-6 shadow-md">
        {subCategories.map((sub, idx) => (
          <Link
            key={idx}
            href="#"
            className="text-gray-800 hover:text-blue-600"
          >
            {sub}
          </Link>
        ))}
      </nav>
    </>
  );
}
