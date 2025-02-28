"use client";

import Link from "next/link";
import { FaTicketAlt, FaHeart, FaCog } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Меню</h2>
      <nav className="space-y-4">
        <Link href="/dashboard" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
          <FaTicketAlt /> <span>Мои билеты</span>
        </Link>
        <Link href="/dashboard/favorites" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
          <FaHeart /> <span>Избранное</span>
        </Link>
        <Link href="/dashboard/settings" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
          <FaCog /> <span>Настройки</span>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
