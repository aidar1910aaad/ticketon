"use client";

import { useRouter } from "next/navigation";
import { LogOut, X } from "lucide-react";

const contacts = [
  "+996 (312) 88-00-00 (Бишкек)",
  "+996 (551) 88-00-00 (WhatsApp)",
  "Telegram",
  "support@ticketon.kg",
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleLogout = () => {
    if (confirm("Вы действительно хотите выйти?")) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      router.push("/");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
      <div className="bg-white w-64 h-full shadow-lg p-4">
        {/* Кнопка закрытия */}
        <button onClick={onClose} className="mb-4 flex items-center">
          <X size={24} className="text-gray-600" />
          <span className="ml-2 text-gray-700">Закрыть</span>
        </button>

        {/* Контакты */}
        <div className="border-b pb-2 mb-4">
          {contacts.map((contact, idx) => (
            <p key={idx} className="text-sm text-gray-600">{contact}</p>
          ))}
        </div>

        {/* Кнопка "Выйти" */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          <LogOut size={20} /> Выйти
        </button>
      </div>
    </div>
  );
}
