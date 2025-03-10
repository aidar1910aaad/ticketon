"use client";

interface Props {
  event?: {
    title: string;
    category: { name: string };
    startTime: string;
    venue: string;
    price?: string;
  };
  loading: boolean;
}

export default function EventDetails({ event, loading }: Props) {
  return (
    <div className="w-full max-w-[1200px] p-8 bg-white rounded-lg shadow-lg mt-6">
      {loading ? (
        <>
          <div className="animate-pulse h-10 bg-gray-300 rounded-lg w-2/3 mx-auto"></div>
          <div className="animate-pulse h-6 bg-gray-300 rounded-lg w-1/3 mx-auto mt-2"></div>
        </>
      ) : (
        <>
          <h1 className="text-5xl font-bold text-center text-gray-800">{event?.title}</h1>
          <p className="text-gray-500 text-xl text-center mt-2">{event?.category?.name}</p>
        </>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
        <DetailCard label="📅 Дата и время" value={event?.startTime} loading={loading} />
        <DetailCard label="📍 Место" value={event?.venue} loading={loading} />
        <DetailCard
          label="💰 Цена"
          value={event?.price ? `от ${event.price} ₸` : "Не указана"}
          loading={loading}
          highlight
        />
      </div>

      {/* Описание */}
      <div className="mt-8">
        <h2 className="text-3xl font-semibold text-gray-800">Описание</h2>
        {loading ? (
          <div className="animate-pulse h-20 bg-gray-300 rounded-lg mt-4"></div>
        ) : (
          <p className="text-gray-600 mt-4 text-lg">{event?.description}</p>
        )}
      </div>
    </div>
  );
}

function DetailCard({ label, value, loading, highlight = false }: { label: string; value?: string; loading: boolean; highlight?: boolean }) {
  return (
    <div className={`p-6 rounded-lg shadow-md text-center ${highlight ? "bg-green-100" : "bg-gray-100"}`}>
      <p className={`text-lg ${highlight ? "text-green-600" : "text-gray-500"}`}>{label}</p>
      {loading ? (
        <div className="animate-pulse h-6 bg-gray-300 rounded-lg w-2/3 mx-auto mt-2"></div>
      ) : (
        <p className={`text-2xl font-semibold mt-2 ${highlight ? "text-green-700" : "text-gray-800"}`}>{value}</p>
      )}
    </div>
  );
}
