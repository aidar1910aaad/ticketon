"use client";

import SeatMap from "@/components/sessions/SeatMap";
import Scene from "@/components/sessions/Scene";

interface Props {
  tickets: { id: string; row: number; number: number; price: number; ticketType: string; status: string }[];
  selectedTicket: string | null;
  setSelectedTicket: (id: string) => void;
  loading: boolean;
  onPurchase: () => void;
}

export default function SeatSelectionUI({ tickets, selectedTicket, setSelectedTicket, loading, onPurchase }: Props) {
  const selectedSeat = tickets.find((ticket) => ticket.id === selectedTicket);

  return (
    <>
      <Scene /> {/* 🎭 Сцена */}

      {loading ? (
        <div className="animate-pulse h-40 bg-gray-300 rounded-lg w-full max-w-lg"></div>
      ) : (
        <SeatMap tickets={tickets} selectedTicket={selectedTicket} setSelectedTicket={setSelectedTicket} />
      )}

      {/* ✅ Отображение информации о выбранном билете */}
      {selectedSeat && (
        <div className="mt-4 p-4 bg-white shadow-md rounded-lg w-full max-w-md text-center">
          <h3 className="text-lg font-semibold">Выбранное место</h3>
          <p className="text-gray-600">Ряд: <strong>{selectedSeat.row + 1}</strong></p>
          <p className="text-gray-600">Место: <strong>{selectedSeat.number}</strong></p>
          <p className="text-gray-600">Цена: <strong>{selectedSeat.price} ₸</strong></p>
        </div>
      )}

      <button
        className={`mt-6 px-6 py-3 rounded-lg shadow-md transition ${
          selectedTicket ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-400 text-gray-700 cursor-not-allowed"
        }`}
        onClick={onPurchase}
        disabled={!selectedTicket}
      >
        Купить билет
      </button>
    </>
  );
}
