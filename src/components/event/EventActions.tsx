"use client";
import { useRouter } from "next/navigation";

export default function EventActions({ loading }: { loading: boolean }) {
  const router = useRouter();

  return (
    <div className="mt-8 flex flex-col md:flex-row gap-6 justify-center">
      <button
        className={`px-8 py-4 text-xl font-semibold rounded-lg shadow-md transition ${
          loading ? "bg-gray-400 text-gray-700" : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
        disabled={loading}
      >
        Купить билет
      </button>

      <button
        onClick={() => router.back()}
        className="px-8 py-4 bg-gray-500 text-white text-xl font-semibold rounded-lg shadow-md hover:bg-gray-600 transition"
      >
        Назад
      </button>
    </div>
  );
}
