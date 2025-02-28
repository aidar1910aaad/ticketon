import React, { useState } from "react";

export default function EventSearch({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState("");

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        placeholder="Поиск событий..."
        value={query}
        onChange={e => {
          setQuery(e.target.value);
          onSearch(e.target.value);
        }}
        className="border p-2 rounded w-full"
      />
    </div>
  );
}
