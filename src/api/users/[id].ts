export async function getUser(id: string) {
    const res = await fetch(`/api/users/${id}`);
    return res.json();
  }
  