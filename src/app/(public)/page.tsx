"use client"; // Добавьте в начало

import EventList from "@/components/main/EventList";
import EventFilters from "@/components/main/EventFilters";
import EventSearch from "@/components/main/EventSearch";
import EventBanner from "@/components/main/EventBanner";
import SubscriptionSection from "@/components/main/SubscriptionSection";
import { useState } from "react";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <main className="space-y-8">
      <EventBanner />
      <EventSearch onSearch={setSearchQuery} />
      <EventFilters />
      <EventList searchQuery={searchQuery} />
      <SubscriptionSection />
    </main>
  );
}
