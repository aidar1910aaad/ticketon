"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../api/auth/login";
import { register } from "../../api/auth/register";
import AuthForm from "@/components/AuthForm";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    countryCode: "+7",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let response;
      const fullPhoneNumber = `${formData.countryCode}${formData.phoneNumber}`;

      if (isLogin) {
        response = await login({ phoneNumber: fullPhoneNumber, password: formData.password });

        console.log("Ответ сервера (авторизация):", response); // Логируем ответ сервера

        if (!response || !response.access_token || !response.user) {
          throw new Error("Ошибка: сервер не вернул нужные данные.");
        }

        const { access_token, user } = response;
        const { role } = user;

        localStorage.setItem("token", access_token);
        localStorage.setItem("user", JSON.stringify(user));

        if (role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      } else {
        if (!formData.name || !formData.surname || !formData.phoneNumber || !formData.password) {
          throw new Error("Все поля должны быть заполнены");
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(formData.password)) {
          throw new Error(
            "Пароль должен содержать минимум 8 символов, одну заглавную букву, одну строчную букву и одну цифру"
          );
        }

        if (formData.password !== formData.confirmPassword) {
          throw new Error("Пароли не совпадают");
        }

        response = await register({
          name: formData.name,
          surname: formData.surname,
          phoneNumber: fullPhoneNumber,
          password: formData.password,
        });

        console.log("Ответ сервера (регистрация):", response); // Логируем ответ сервера

        if (!response || !response.access_token || !response.user) {
          throw new Error("Ошибка: сервер не вернул нужные данные.");
        }

        const { access_token, user } = response;
        const { role } = user;

        localStorage.setItem("token", access_token);
        localStorage.setItem("user", JSON.stringify(user));

        if (role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (err: any) {
      console.error("Ошибка авторизации/регистрации:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      isLogin={isLogin}
      formData={formData}
      loading={loading}
      error={error}
      handleChange={handleChange}
      handleAuth={handleAuth}
      toggleAuthMode={() => setIsLogin(!isLogin)}
    />
  );
}
