"use client";

import { useParams, useRouter } from "next/navigation";
import { useSeatSelection } from "@/components/sessions/SeatSelectionLogic";
import EventInfo from "@/components/sessions/EventInfo";
import SeatSelectionUI from "@/components/sessions/SeatSelectionUI";

export default function SeatSelection() {
  const { id } = useParams();
  const router = useRouter();
  const { tickets, eventInfo, loading, selectedTicket, setSelectedTicket } = useSeatSelection(id as string);

  const handlePurchase = () => {
    if (!selectedTicket) {
      alert("Выберите билет!");
      return;
    }

    const selectedSeat = tickets.find((ticket) => ticket.id === selectedTicket);
    if (!selectedSeat) return;

    // 🔹 Передаем информацию о билете в URL (query params)
    router.push(
      `/dashboard/checkout?ticket=${selectedTicket}&row=${selectedSeat.row + 1}&number=${selectedSeat.number}&price=${selectedSeat.price}`
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-2">Выбор места</h1>
      <EventInfo eventInfo={eventInfo} loading={loading} />
      <SeatSelectionUI 
        tickets={tickets} 
        selectedTicket={selectedTicket} 
        setSelectedTicket={setSelectedTicket} 
        loading={loading} 
        onPurchase={handlePurchase} 
      />
    </div>
  );
}
