"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthNavbar from "@/components/dashboard/AuthNavbar";
import Footer from "@/components/Footer";



export default function AuthorizedLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const adminEmail = "aidar@gmail.com";

    console.log("Проверка аутентификации:", storedUser);

    if (!storedUser) {
      router.push("/auth");
    } else {
      try {
        const userData = JSON.parse(storedUser);
        const isAdmin = userData?.email === adminEmail;

        console.log("Роль пользователя:", isAdmin ? "Админ" : "Обычный пользователь");

        if (isAdmin) {
          router.replace("/admin");
        } else {
          router.replace("/dashboard");
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error("Ошибка при разборе данных пользователя:", error);
        localStorage.removeItem("user");
        router.push("/auth");
      }
    }
  }, []);

  return (
    <>
      <AuthNavbar />
      {children}
      <Footer />
    </>
  );
}