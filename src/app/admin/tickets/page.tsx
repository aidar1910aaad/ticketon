"use client"
import { useState } from "react";
import { Plus, Trash, Edit } from "lucide-react";

interface Ticket {
  id: string;
  session: {
    id: string;
    event: string;
    building: {
      id: string;
      name: string;
      address: string;
      latitudeX: number;
      longitudeY: number;
      hasParking: boolean;
      city: {
        id: string;
        name: string;
      };
    };
    startTime: string;
  };
  price: number;
  ticketType: string;
  status: string;
}

export default function TicketsPage() {
  // Мок-данные билетов (на основе API-схемы)
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: "1",
      session: {
        id: "101",
        event: "Концерт Queen",
        building: {
          id: "501",
          name: "Театр им. Чехова",
          address: "ул. Чехова, 10",
          latitudeX: 55.7558,
          longitudeY: 37.6173,
          hasParking: true,
          city: { id: "201", name: "Москва" },
        },
        startTime: "2025-03-10T19:00:00Z",
      },
      price: 2500,
      ticketType: "ADULT",
      status: "AVAILABLE",
    },
    {
      id: "2",
      session: {
        id: "102",
        event: "Балет Лебединое Озеро",
        building: {
          id: "502",
          name: "Большой театр",
          address: "Театральная площадь, 1",
          latitudeX: 55.7602,
          longitudeY: 37.6184,
          hasParking: false,
          city: { id: "201", name: "Москва" },
        },
        startTime: "2025-04-15T20:00:00Z",
      },
      price: 3500,
      ticketType: "CHILD",
      status: "SOLD_OUT",
    },
  ]);

  // Удаление билета (локальное)
  const deleteTicket = (id: string) => {
    if (!confirm("Вы уверены, что хотите удалить билет?")) return;
    setTickets(tickets.filter((ticket) => ticket.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Билеты</h1>

      <button className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 flex items-center gap-2">
        <Plus size={16} /> Добавить билет
      </button>

      <table className="mt-4 w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Событие</th>
            <th className="border p-2">Здание</th>
            <th className="border p-2">Адрес</th>
            <th className="border p-2">Дата и время</th>
            <th className="border p-2">Цена</th>
            <th className="border p-2">Тип билета</th>
            <th className="border p-2">Статус</th>
            <th className="border p-2">Действия</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id} className="border">
              <td className="p-2 border">{ticket.session.event}</td>
              <td className="p-2 border">{ticket.session.building.name}</td>
              <td className="p-2 border">{ticket.session.building.address}</td>
              <td className="p-2 border">{new Date(ticket.session.startTime).toLocaleString()}</td>
              <td className="p-2 border">{ticket.price} руб.</td>
              <td className="p-2 border">{ticket.ticketType}</td>
              <td className="p-2 border">{ticket.status === "AVAILABLE" ? "✅ Доступен" : "❌ Продан"}</td>
              <td className="p-2 border flex gap-2">
                <button className="text-blue-500 flex items-center gap-1">
                  <Edit size={16} /> Редактировать
                </button>
                <button
                  onClick={() => deleteTicket(ticket.id)}
                  className="text-red-500 flex items-center gap-1"
                >
                  <Trash size={16} /> Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
