import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <section className="flex flex-col justify-center items-center text-center h-screen px-4">
        {/* Иконка 404 */}
        <AlertTriangle className="w-24 h-24 text-red-500" />

        {/* Текст */}
        <h1 className="text-3xl font-bold mt-6">Страница не найдена</h1>
        <p className="text-gray-500 mt-2 max-w-md">
          Возможно, страница была удалена или вы перешли по неверной ссылке.
        </p>

        {/* Кнопка "Вернуться на главную" */}
        <Link href="/">
          <button className="mt-6 px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition">
            Вернуться на главную
          </button>
        </Link>
      </section>
      <Footer />
    </>
  );
}