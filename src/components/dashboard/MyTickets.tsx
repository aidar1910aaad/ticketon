"use client";

import { useState } from "react";

const MyTickets = () => {
  const [tickets] = useState([
    { id: 1, event: "Концерт Imagine Dragons", date: "10 марта 2025", status: "Оплачен" },
    { id: 2, event: "Театр: Ромео и Джульетта", date: "15 апреля 2025", status: "Ожидание" },
  ]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Мои билеты</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="p-2">Мероприятие</th>
            <th className="p-2">Дата</th>
            <th className="p-2">Статус</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id} className="border-b">
              <td className="p-2">{ticket.event}</td>
              <td className="p-2">{ticket.date}</td>
              <td className="p-2">
                <span className={`px-2 py-1 rounded text-white ${ticket.status === "Оплачен" ? "bg-green-500" : "bg-yellow-500"}`}>
                  {ticket.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyTickets;
