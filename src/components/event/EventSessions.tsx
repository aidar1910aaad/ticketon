"use client";

import { useRouter } from "next/navigation";

interface Props {
  sessions?: { id: string; startTime: string; venue: string }[];
  loading: boolean;
}

export default function EventSessions({ sessions, loading }: Props) {
  const router = useRouter();

  return (
    <div className="w-full max-w-[1200px] p-6 bg-white rounded-lg shadow-lg mt-6">
      <h2 className="text-3xl font-semibold text-gray-800">Доступные сессии</h2>
      {loading ? (
        <div className="animate-pulse h-20 bg-gray-300 rounded-lg mt-4"></div>
      ) : sessions && sessions.length > 0 ? (
        <ul className="mt-4 space-y-4">
          {sessions.map((session) => (
            <li
              key={session.id}
              className="border p-4 rounded-lg shadow-md flex justify-between cursor-pointer bg-gray-100 hover:bg-blue-100 transition"
              onClick={() => router.push(`/dashboard/sessions/${session.id}`)}
            >
              <div>
                <p className="text-lg font-semibold">{new Date(session.startTime).toLocaleString()}</p>
                <p className="text-gray-500">{session.venue}</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
                Выбрать место
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mt-4">Нет доступных сессий</p>
      )}
    </div>
  );
}
