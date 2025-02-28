"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../api/auth/login";
import { register } from "../../api/auth/register";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    try {
      let response;
  
      if (isLogin) {
        response = await login({ email: formData.email, password: formData.password });
  
        if (!response || !response.access_token) {
          throw new Error("Ошибка: сервер не вернул токен.");
        }
  
        // ✅ Сохраняем email пользователя (введенный в форму)
        localStorage.setItem("user", JSON.stringify({ email: formData.email }));
  
        // ✅ Определяем, является ли пользователь админом
        const isAdmin = formData.email === "aidar@gmail.com";
        console.log("Редирект на:", isAdmin ? "/admin" : "/dashboard");
        router.push(isAdmin ? "/admin" : "/dashboard");
  
      } else {
        // ✅ Код регистрации остается без изменений
        if (!formData.name || !formData.surname || !formData.email || !formData.password) {
          throw new Error("Все поля должны быть заполнены");
        }
  
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(formData.password)) {
          throw new Error("Пароль должен содержать минимум 8 символов, одну заглавную букву, одну строчную букву и одну цифру");
        }
  
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Пароли не совпадают");
        }
  
        response = await register({
          name: formData.name,
          surname: formData.surname,
          email: formData.email,
          password: formData.password,
        });
  
        console.log("Ответ сервера:", response);
        localStorage.setItem("user", JSON.stringify({ email: formData.email }));
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.error("Ошибка:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">
          {isLogin ? "Вход" : "Регистрация"}
        </h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form className="space-y-4" onSubmit={handleAuth}>
          {!isLogin && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Имя"
                className="w-full p-2 border rounded-md"
                required
                onChange={handleChange}
              />
              <input
                type="text"
                name="surname"
                placeholder="Фамилия"
                className="w-full p-2 border rounded-md"
                required
                onChange={handleChange}
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 border rounded-md"
            required
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Пароль"
            className="w-full p-2 border rounded-md"
            required
            onChange={handleChange}
          />

          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Подтвердите пароль"
              className="w-full p-2 border rounded-md"
              required
              onChange={handleChange}
            />
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Загрузка..." : isLogin ? "Войти" : "Зарегистрироваться"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline"
          >
            {isLogin ? "Зарегистрироваться" : "Войти"}
          </button>
        </p>
      </div>
    </div>
  );
}
