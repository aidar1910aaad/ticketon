"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaPhone, FaGlobe, FaBars, FaTimes } from "react-icons/fa";

const cities = [
  "Бишкек", "Ош", "Джалал-Абад", "Каракол", "Нарын",
  "Баткен", "Талас", "Кант", "Токмок", "Балыкчы"
];

const Button = ({ children, onClick, className }) => (
  <button
    onClick={onClick}
    className={`px-5 py-2 text-gray-800 border border-gray-300 rounded-md bg-white shadow-sm hover:bg-gray-200 transition-all ${className}`}
  >
    {children}
  </button>
);

const DesktopMenu = ({ selectedCity, isCityOpen, setIsCityOpen, setSelectedCity, selectedLanguage, setSelectedLanguage }) => (
  <nav className="hidden md:flex items-center space-x-8 text-lg font-medium">
    <div className="relative">
      <Button onClick={() => setIsCityOpen(prev => !prev)}>{selectedCity}</Button>
      {isCityOpen && (
        <ul className="absolute bg-white border shadow-lg rounded-md mt-2 w-48 max-h-60 overflow-y-auto z-50">
          {cities.map(city => (
            <li key={city} onClick={() => { setSelectedCity(city); setIsCityOpen(false); }} className="p-2 hover:bg-gray-100 cursor-pointer">
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
    <Link href="/auth"><Button>Войти</Button></Link>
    <Link href="/contact"><Button className="flex items-center"><FaPhone className="mr-2" /> Контакты</Button></Link>
    <Link href="/faq"><Button>FAQ</Button></Link>
    <div className="flex items-center space-x-2 border px-4 py-2 rounded-md hover:bg-gray-100 cursor-pointer transition-all">
      <FaGlobe />
      <select className="bg-transparent outline-none cursor-pointer" value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
        <option value="ru">Русский</option>
        <option value="kg">Кыргызча</option>
      </select>
    </div>
  </nav>
);

const MobileMenu = ({ isMenuOpen, setIsMenuOpen, selectedCity, isCityOpen, setIsCityOpen, setSelectedCity, selectedLanguage, setSelectedLanguage }) => (
  <>
    <button className="md:hidden text-2xl z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
      {isMenuOpen ? <FaTimes /> : <FaBars />}
    </button>
    {isMenuOpen && (
      <nav className="fixed top-0 left-0 w-full h-full bg-white flex flex-col items-center justify-center space-y-6 text-lg font-medium shadow-lg z-50">
        <button className="absolute top-4 right-4 text-3xl p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-all" onClick={() => setIsMenuOpen(false)}>
          <FaTimes />
        </button>
        <div className="relative">
          <Button onClick={() => setIsCityOpen(prev => !prev)}>{selectedCity}</Button>
          {isCityOpen && (
            <ul className="absolute bg-white border shadow-lg rounded-md mt-2 w-48 max-h-60 overflow-y-auto z-50">
              {cities.map(city => (
                <li key={city} onClick={() => { setSelectedCity(city); setIsCityOpen(false); }} className="p-2 hover:bg-gray-100 cursor-pointer">
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>
        <Link href="/auth"><Button>Войти</Button></Link>
        <Link href="/contact"><Button className="flex items-center"><FaPhone className="mr-2" /> Контакты</Button></Link>
        <Link href="/faq"><Button>FAQ</Button></Link>
        <div className="flex items-center space-x-2 border px-4 py-3 rounded-md hover:bg-gray-100 cursor-pointer transition-all">
          <FaGlobe />
          <select className="bg-transparent outline-none cursor-pointer text-lg" value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
            <option value="ru">Русский</option>
            <option value="kg">Кыргызча</option>
          </select>
        </div>
      </nav>
    )}
  </>
);

const Header = () => {
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Выбрать город");
  const [selectedLanguage, setSelectedLanguage] = useState("ru");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-md relative">
      <div className="max-w-[1440px] mx-auto flex justify-between items-center p-4">
        <Link href="/">
          <Image src="/icons/oshlogo.png" alt="Логотип" width={50} height={50} className="h-auto" />
        </Link>
        <DesktopMenu {...{ selectedCity, isCityOpen, setIsCityOpen, setSelectedCity, selectedLanguage, setSelectedLanguage }} />
        <MobileMenu {...{ isMenuOpen, setIsMenuOpen, selectedCity, isCityOpen, setIsCityOpen, setSelectedCity, selectedLanguage, setSelectedLanguage }} />
      </div>
    </header>
  );
};

export default Header;