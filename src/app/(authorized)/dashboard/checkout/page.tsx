"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { buyTicket } from "@/api/ticket";
import { CheckCircle, XCircle } from "lucide-react";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ticketId = searchParams.get("ticket");
  const row = searchParams.get("row");
  const number = searchParams.get("number");
  const price = searchParams.get("price");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handlePurchase = async () => {
    if (!ticketId) {
      setError("Ошибка: билет не найден.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Ошибка: требуется авторизация.");
      return;
    }

    setLoading(true);
    setError(null);
    
    const isSuccess = await buyTicket(ticketId, token);
    
    if (isSuccess) {
      setSuccess(true);
      setTimeout(() => router.push("/dashboard"), 5000); // ⏳ Перенаправляем через 5 сек
    } else {
      setError("Ошибка при покупке билета. Попробуйте снова.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg text-center border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Подтверждение покупки</h1>

        {ticketId ? (
          <>
            <div className="border border-gray-300 p-4 rounded-lg bg-gray-50 mb-4 shadow-sm">
              <p className="text-gray-700 text-lg"><strong>Ряд:</strong> {row}</p>
              <p className="text-gray-700 text-lg"><strong>Место:</strong> {number}</p>
              <p className="text-gray-700 text-lg"><strong>Цена:</strong> {price} ₸</p>
            </div>

            {error && (
              <div className="bg-red-100 text-red-600 p-3 rounded-lg flex items-center gap-2 mb-4 shadow">
                <XCircle size={20} />
                {error}
              </div>
            )}

            {success ? (
              <div className="bg-green-100 text-green-600 p-3 rounded-lg flex items-center gap-2 mb-4 shadow">
                <CheckCircle size={24} />
                <div>
                  ✅ Билет успешно куплен!  
                  <br /> Ряд {row}, Место {number}
                  <br /> Посмотреть билет можно в <strong>Личном кабинете</strong>.
                </div>
              </div>
            ) : (
              <button
                className={`mt-4 px-6 py-3 rounded-lg shadow-md text-lg transition w-full ${
                  loading ? "bg-gray-400 text-gray-700 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
                onClick={handlePurchase}
                disabled={loading}
              >
                {loading ? "Покупка..." : "Оплатить"}
              </button>
            )}

            <button
              className="mt-4 px-6 py-3 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition w-full"
              onClick={() => router.back()}
            >
              Назад
            </button>
          </>
        ) : (
          <p className="text-red-500">Ошибка: билет не найден</p>
        )}
      </div>
    </div>
  );
}
