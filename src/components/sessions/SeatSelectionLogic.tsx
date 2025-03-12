"use client";

import { useEffect, useState } from "react";
import { fetchTicketsBySession } from "@/api/ticket";
import { fetchEventBySession } from "@/api/events/index";

interface Ticket {
  id: string;
  row: number;
  number: number;
  price: number;
  ticketType: string;
  status: string;
}

interface EventInfo {
  title: string;
  startTime: string;
}

export function useSeatSelection(sessionId: string) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) return;
    loadSessionData(sessionId);
  }, [sessionId]);

  const loadSessionData = async (id: string) => {
    try {
      setLoading(true);
      const ticketsData = await fetchTicketsBySession(id);
      setTickets(ticketsData);

      const eventData = await fetchEventBySession(id);
      setEventInfo(eventData);
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    } finally {
      setLoading(false);
    }
  };

  return { tickets, eventInfo, loading, selectedTicket, setSelectedTicket };
}
