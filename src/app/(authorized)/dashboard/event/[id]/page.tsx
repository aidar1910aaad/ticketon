"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchEventById } from "@/api/events/index";
import EventHeader from "@/components/event/EventHeader";
import EventDetails from "@/components/event/EventDetails";
import EventSessions from "@/components/event/EventSessions";
import EventActions from "@/components/event/EventActions";

interface EventDetails {
  id: string;
  title: string;
  description: string;
  category: { name: string };
  startTime: string;
  venue: string;
  price?: string;
  imageUrl?: string;  //  <-- добавили поле для адреса картинки
  sessions?: { id: string; startTime: string; venue: string }[];
}

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<EventDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    loadEvent(id);
  }, [id]);

  const loadEvent = async (eventId: string) => {
    try {
      setLoading(true);
      const eventData = await fetchEventById(eventId);
      console.log("🔹 Информация о событии:", eventData);
      setEvent(eventData);
    } catch (error) {
      console.error("Ошибка загрузки события:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Передаем imageUrl из объекта event */}
      <EventHeader
        title={event?.title}
        imageUrl={event?.imageUrl}
        loading={loading}
      />

      <div className="w-full flex flex-col items-center">
        <EventDetails event={event} loading={loading} />
        <EventSessions sessions={event?.sessions} loading={loading} />
        <EventActions loading={loading} />
      </div>
    </div>
  );
}
