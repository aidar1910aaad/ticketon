"use client";

import { useState } from "react";

interface AuthFormProps {
  isLogin: boolean;
  formData: {
    name: string;
    surname: string;
    countryCode: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
  };
  loading: boolean;
  error: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleAuth: (e: React.FormEvent) => void;
  toggleAuthMode: () => void;
}

export default function AuthForm({
  isLogin,
  formData,
  loading,
  error,
  handleChange,
  handleAuth,
  toggleAuthMode,
}: AuthFormProps) {
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

          <div className="flex space-x-2">
            <select
              name="countryCode"
              className="p-2 border rounded-md w-24"
              onChange={handleChange}
              value={formData.countryCode}
            >
              <option value="+7">🇰🇿 +7</option>
              <option value="+996">🇰🇬 +996</option>
            </select>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Номер"
              className="w-full p-2 border rounded-md"
              required
              onChange={handleChange}
            />
          </div>

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
          <button onClick={toggleAuthMode} className="text-blue-600 hover:underline">
            {isLogin ? "Зарегистрироваться" : "Войти"}
          </button>
        </p>
      </div>
    </div>
  );
}
