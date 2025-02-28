export async function getEvent(id: string) {
    const res = await fetch(`/api/events/${id}`);
    return res.json();
  }
  