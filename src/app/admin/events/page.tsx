"use client"
import { useEffect, useState } from "react";
import { fetchEvents } from "@/api/events/index";
import EventForm from "@/components/EventForm";
import EventTable from "@/components/EventTable";

export default function EventsPage() {
  const [events, setEvents] = useState([]);

  const loadEvents = async () => {
    const fetchedEvents = await fetchEvents();
    setEvents(fetchedEvents);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">События</h1>
      <EventForm onEventCreated={loadEvents} />
      <EventTable events={events} onEventDeleted={loadEvents} />
    </div>
  );
}
