export async function fetchTicketsBySession(sessionId: string): Promise<any[]> {
    try {
      const response = await fetch(`http://94.232.246.12:8080/api/tickets/search/by-session/${sessionId}`);
  
      if (!response.ok) {
        throw new Error("Ошибка загрузки билетов");
      }
  
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Ошибка при получении билетов:", error);
      return [];
    }
  }

  export async function buyTicket(ticketID: string, token: string): Promise<boolean> {
    try {
      if (!token) throw new Error("Ошибка: отсутствует токен авторизации!");
  
      const response = await fetch(`http://94.232.246.12:8080/api/tickets/buy/${ticketID}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.text();
        console.error("❌ Ошибка покупки билета:", errorData);
        return false;
      }
  
      console.log("✅ Билет успешно куплен");
      return true;
    } catch (error) {
      console.error("❌ Ошибка при покупке билета:", error);
      return false;
    }
  }
  

  export async function fetchUserTickets() {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Ошибка: отсутствует токен авторизации!");
  
    const response = await fetch(
      "http://94.232.246.12:8080/api/user-profile/mytickets?page=0&size=10",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  
    if (!response.ok) {
      throw new Error(`Ошибка загрузки билетов: ${await response.text()}`);
    }
  
    return response.json();
  }
  