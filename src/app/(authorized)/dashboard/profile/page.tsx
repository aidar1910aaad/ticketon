"use client";

import { useEffect, useState } from "react";
import { fetchUserProfile } from "@/api/users/index";
import { useRouter } from "next/navigation";
import { XCircle } from "lucide-react";
import UserInfo from "@/components/profile/UserInfo";
import UserPermissions from "@/components/profile/UserPermissions";
import UserTickets from "@/components/profile/UserTickets";

interface UserProfile {
  id: string;
  name: string;
  surname: string;
  phoneNumber: string;
  role: string;
  createdAt: string;
  authorities: { authority: string }[];
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Ошибка: требуется авторизация");
      setLoading(false);
      return;
    }

    fetchUserProfile(token).then((data) => {
      if (data) {
        setUser(data);
      } else {
        setError("Ошибка загрузки профиля");
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      {/* Хедер профиля */}
      <div className="w-full bg-blue-600 text-white py-10 flex flex-col items-center">
        <h1 className="text-4xl font-bold">Личный кабинет</h1>
        <p className="text-lg mt-2">{loading ? "Загрузка..." : `${user?.name} ${user?.surname}`}</p>
      </div>

      {/* Основной контент */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 mt-6 border border-gray-200">
        {loading ? (
          <div className="animate-pulse h-40 bg-gray-300 rounded-lg w-full"></div>
        ) : error ? (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg flex items-center gap-2 shadow">
            <XCircle size={20} />
            {error}
          </div>
        ) : (
          <>
            <UserInfo user={user!} />
            <UserPermissions authorities={user!.authorities} />
            <UserTickets />
            <button
              className="mt-8 w-full px-6 py-3 bg-red-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-red-700 transition"
              onClick={() => {
                localStorage.removeItem("token");
                router.push("/");
              }}
            >
              Выйти из аккаунта
            </button>
          </>
        )}
      </div>
    </div>
  );
}
