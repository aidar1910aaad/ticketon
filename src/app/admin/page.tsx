import Link from "next/link";
import { Home, Users, Building, Ticket, Calendar, List } from "lucide-react";

const adminSections = [
  { name: "Главная", path: "/admin", icon: <Home size={40} />, description: "Общая информация и управление админ-панелью." },
  { name: "Пользователи", path: "/admin/users", icon: <Users size={40} />, description: "Просмотр, редактирование и управление пользователями." },
  { name: "Здания", path: "/admin/buildings", icon: <Building size={40} />, description: "Добавление и редактирование информации о зданиях." },
  { name: "Билеты", path: "/admin/tickets", icon: <Ticket size={40} />, description: "Управление билетами и бронированием." },
  { name: "События", path: "/admin/events", icon: <Calendar size={40} />, description: "Создание и редактирование событий." },
  { name: "Категории", path: "/admin/categories", icon: <List size={40} />, description: "Управление категориями для различных разделов." },
];

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Добро пожаловать в админ-панель</h1>
      <p className="text-gray-600 mb-6">Выберите один из разделов ниже для управления системой.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminSections.map((section) => (
          <Link href={section.path} key={section.path}>
            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition cursor-pointer flex flex-col items-center text-center">
              <div className="text-blue-600 mb-4">{section.icon}</div>
              <h2 className="text-xl font-semibold mb-2">{section.name}</h2>
              <p className="text-gray-500 text-sm">{section.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}