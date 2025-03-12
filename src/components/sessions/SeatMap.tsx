"use client";

interface Ticket {
  id: string;
  row: number;
  number: number;
  price: number;
  ticketType: string;
  status: string;
}

interface Props {
  tickets: Ticket[];
  selectedTicket: string | null;
  setSelectedTicket: (id: string) => void;
}

export default function SeatMap({ tickets, selectedTicket, setSelectedTicket }: Props) {
  // 📌 Группируем билеты по рядам и добавляем пустые места
  const groupedTickets = tickets.reduce((acc: Record<number, Ticket[]>, ticket) => {
    if (!acc[ticket.row]) acc[ticket.row] = [];
    acc[ticket.row].push(ticket);
    return acc;
  }, {});

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {Object.entries(groupedTickets).map(([row, rowTickets]) => {
        // Определяем максимальное место в ряду
        const maxSeatNumber = Math.max(...rowTickets.map((t) => t.number));

        // Заполняем отсутствующие места пустыми слотами
        const fullRowSeats = Array.from({ length: maxSeatNumber }, (_, index) => {
          const seat = rowTickets.find((t) => t.number === index + 1);
          return seat || { id: `empty-${row}-${index + 1}`, status: "EMPTY", number: index + 1 };
        });

        return (
          <div key={row} className="flex items-center justify-center gap-2 mb-3">
            {/* 🎯 Номер ряда слева */}
            <div className="w-8 text-center font-bold text-gray-700">{row}</div>

            {/* 🎟️ Рендер мест в ряду */}
            <div className="flex gap-1">
              {fullRowSeats.map((ticket) => (
                <button
                  key={ticket.id}
                  disabled={ticket.status !== "AVAILABLE"}
                  className={`p-3 w-10 h-10 text-center font-bold rounded-md text-xs ${
                    ticket.status === "AVAILABLE"
                      ? "bg-green-500 hover:bg-green-600"
                      : ticket.status === "EMPTY"
                      ? "bg-transparent border border-gray-300 cursor-default"
                      : "bg-gray-400 cursor-not-allowed"
                  } ${selectedTicket === ticket.id ? "border-4 border-blue-600" : ""}`}
                  onClick={() => ticket.status === "AVAILABLE" && setSelectedTicket(ticket.id)}
                >
                  {ticket.status === "EMPTY" ? "" : ticket.number}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
