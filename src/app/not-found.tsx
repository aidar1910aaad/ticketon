import Link from "next/link";
import Image from "next/image";

export default function NotFoundPage() {
  return (
    <section className="flex flex-col justify-center items-center text-center h-[800px]">
      {/* Картинка 404 */}
      <Image src="/icons/404.svg" alt="404" width={200} height={200} />

      {/* Текст */}
      <h1 className="text-2xl font-semibold mt-6">Здесь ничего нет.</h1>
      <p className="text-gray-500 mt-2">
        Может, вы найдёте что-то интересное на главной?
      </p>

      {/* Кнопка "Вернуться на главную" */}
      <Link href="/">
        <button className="mt-6 px-6 py-3 bg-greenacc text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition">
          Вернуться на главную
        </button>
      </Link>
    </section>
  );
}
