"use client";

interface Props {
  eventInfo?: { title: string; startTime: string } | null;
  loading: boolean;
}

export default function EventInfo({ eventInfo, loading }: Props) {
  return (
    <div className="mb-4 text-center">
      {loading ? (
        <p className="text-gray-500 mb-4">🔍 Загружаем информацию о событии...</p>
      ) : eventInfo ? (
        <>
          <h2 className="text-xl font-semibold">{eventInfo.title}</h2>
          <p className="text-gray-500">{new Date(eventInfo.startTime).toLocaleString()}</p>
        </>
      ) : (
        <p className="text-red-500">⚠ Ошибка загрузки данных</p>
      )}
    </div>
  );
}
