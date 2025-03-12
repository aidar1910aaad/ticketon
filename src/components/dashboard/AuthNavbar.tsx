"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search, Globe, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MobileMenu from "@/components/dashboard/MobileMenu";
import { useRouter } from "next/navigation";

const cities = [
  "Бишкек", "Ош", "Джалал-Абад", "Каракол", "Нарын", 
  "Баткен", "Талас", "Кант", "Токмок", "Балыкчы",
];

export default function Navbar() {
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Выбрать город");
  const [selectedLanguage, setSelectedLanguage] = useState("RU");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  // Проверяем ширину экрана
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header className="bg-white shadow-md p-4 flex justify-between items-center max-w-[1440px] mx-auto">
        <Link href="/" className="text-2xl font-bold text-blue-600">Ticketon</Link>

        {isMobile ? (
          <Button variant="ghost" onClick={() => setMenuOpen(!menuOpen)} className="relative z-50">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        ) : (
          <>
            <div className="relative">
              <button onClick={() => setIsCityOpen(!isCityOpen)} className="hover:text-gray-600">
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

            <div className="relative w-1/3">
              <Input placeholder="Поиск мероприятий..." className="pl-10" />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Переход в личный кабинет */}
            <Button variant="outline" onClick={() => router.push("/dashboard/profile")} className="flex gap-2">
              <User size={18} /> Кабинет
            </Button>

            <div className="ml-4 flex items-center space-x-2 border p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
              <Globe />
              <select className="bg-transparent outline-none cursor-pointer" value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
                <option value="ru">Русский</option>
                <option value="kg">Кыргызча</option>
              </select>
            </div>
          </>
        )}
      </header>

      {isMobile && <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />}
    </>
  );
}
