"use client"
import { useEffect, useState } from "react";
import { fetchUserTickets } from "@/api/ticket";
import { Loader2, Ticket } from "lucide-react";

interface UserTicket {
  id: string;
  price: number;
  ticketType: string;
  status: string;
  row: number;
  number: number;
}

export default function UserTickets() {
  const [tickets, setTickets] = useState<UserTicket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserTickets();
  }, []);

  const loadUserTickets = async () => {
    try {
      setLoading(true);
      const response = await fetchUserTickets();
      setTickets(response.content);
    } catch (error) {
      console.error("Ошибка загрузки билетов:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Мои билеты</h2>

      {loading ? (
        <div className="flex justify-center">
          <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
        </div>
      ) : tickets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="p-5 border border-gray-300 rounded-lg shadow-lg bg-white flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">{ticket.ticketType}</h3>
                <Ticket size={24} className="text-gray-500" />
              </div>

              <div className="mt-3 text-gray-700 space-y-1">
                <p>
                  <strong className="text-gray-900">Ряд:</strong> {ticket.row}
                </p>
                <p>
                  <strong className="text-gray-900">Место:</strong> {ticket.number}
                </p>
              </div>

              <p className="mt-3 text-lg font-bold text-blue-700">
                Цена: {ticket.price} ₸
              </p>

              <p
                className={`mt-3 text-sm font-semibold px-3 py-2 rounded-md text-center ${
                  ticket.status === "SOLD"
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {ticket.status === "SOLD" ? "Куплен" : "Доступен"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center mt-6">
          У вас нет купленных билетов.
        </p>
      )}
    </div>
  );
}
