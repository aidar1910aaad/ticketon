"use client";

import { useState } from "react";
import Link from "next/link";
import { FaPhone, FaGlobe } from "react-icons/fa";

const cities = [
  "Алматы", "Нур-Султан", "Шымкент", "Караганда", "Актобе",
  "Тараз", "Павлодар", "Усть-Каменогорск", "Семей", "Костанай",
  "Петропавловск", "Актау", "Атырау", "Кызылорда", "Туркестан"
];

const Header = () => {
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Выбрать город");

  return (
    <header className="w-full bg-white shadow-md">
      <div className="max-w-[1440px] mx-auto flex justify-between items-center p-4">
        {/* Логотип (Текст) */}
        <span className="text-2xl font-bold text-blue-600">Ticket's</span>

        {/* Меню */}
        <nav className="flex items-center space-x-6 text-lg relative">
          {/* Выбор города */}
          <div className="relative">
            <button 
              onClick={() => setIsCityOpen(!isCityOpen)} 
              className="hover:text-gray-600"
            >
              {selectedCity}
            </button>
            {isCityOpen && (
              <ul className="absolute bg-white border shadow-md rounded-md mt-2 w-48 max-h-60 overflow-y-auto">
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

          {/* Кнопка Войти */}
          <Link href="/auth" className="hover:text-gray-600">
            Войти
          </Link>

          {/* Иконка телефона */}
          <Link href="/contact" className="hover:text-gray-600 flex items-center">
            <FaPhone className="mr-1" /> Контакты
          </Link>

          {/* FAQ */}
          <Link href="/faq" className="hover:text-gray-600">
            FAQ
          </Link>

          {/* Переключатель языка */}
          <div className="ml-4 flex items-center space-x-2 border p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <FaGlobe />
            <select className="bg-transparent outline-none cursor-pointer">
              <option value="ru">RU</option>
              <option value="kz">KZ</option>
              <option value="en">EN</option>
            </select>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
