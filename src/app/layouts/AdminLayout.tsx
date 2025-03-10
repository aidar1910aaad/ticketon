"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Users, Building, Ticket, Calendar, Menu, LogOut, List } from "lucide-react";
import { useState, useEffect } from "react";

const menuItems = [
  { name: "Главная", path: "/admin", icon: <Home size={20} /> },
  { name: "Пользователи", path: "/admin/users", icon: <Users size={20} /> },
  { name: "Здания", path: "/admin/buildings", icon: <Building size={20} /> },
  { name: "Билеты", path: "/admin/tickets", icon: <Ticket size={20} /> },
  { name: "События", path: "/admin/events", icon: <Calendar size={20} /> },
  { name: "Категории", path: "/admin/categories", icon: <List size={20} /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Проверяем авторизацию
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth");
    }
  }, [router]);

  // Выход
  const handleLogout = () => {
    if (confirm("Вы уверены, что хотите выйти?")) {
      localStorage.clear();
      router.push("/auth");
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 p-4 flex flex-col justify-between overflow-hidden ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex flex-col flex-grow">
          {/* Кнопка меню */}
          <button onClick={() => setIsOpen(!isOpen)} className="mb-4">
            <Menu size={24} />
          </button>

          {/* Меню */}
          <nav className="flex flex-col flex-grow">
            {menuItems.map((item) => (
              <Link href={item.path} key={item.path}>
                <div
                  className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer transition ${
                    pathname === item.path ? "bg-blue-600 text-white" : "hover:bg-gray-200"
                  }`}
                >
                  {item.icon}
                  {isOpen && <span>{item.name}</span>}
                </div>
              </Link>
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          <LogOut size={20} /> {isOpen && <span>Выйти</span>}
        </button>
      </aside>

      {/* Контент (динамически меняет ширину при закрытии сайдбара) */}
      <main
        className={`min-h-screen p-6 bg-gray-100 transition-all duration-300 ${
          isOpen ? "ml-64 w-[calc(100%-16rem)]" : "ml-20 w-[calc(100%-5rem)]"
        }`}
      >
        {children}
      </main>
    </div>
  );
}