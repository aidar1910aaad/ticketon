import { API_BASE } from "@/config/config";



export async function fetchEventSessions(): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE}/event-sessions`);
      
      if (!response.ok) {
        throw new Error("Ошибка загрузки сессий событий");
      }
  
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Ошибка при получении сессий событий:", error);
      return [];
    }
  }
  
  export async function fetchEventSessionsByEvent(eventId: string): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE}/event-sessions/search/by-event/${eventId}`);
      
      if (!response.ok) {
        throw new Error("Ошибка загрузки сессий события");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Ошибка при получении сессий события:", error);
      return [];
    }
  }
  
  export async function createEventSession(sessionData: Record<string, any>, token: string): Promise<any> {
    try {
      if (!token) throw new Error("Ошибка: отсутствует токен авторизации!");
  
      // 🛠 Форматируем дату в строгий UTC ISO 8601
      const localDate = new Date(sessionData.startTime);
      const utcDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);
      const formattedStartTime = utcDate.toISOString().replace(".000", ""); // ❗ Убираем лишние нули
  
      const formData = new FormData();
      formData.append("eventId", sessionData.eventId);
      formData.append("startTime", formattedStartTime); // ✅ Гарантированно правильный формат
      formData.append("price", sessionData.price.toString()); // ✅ Преобразуем в строку
  
      console.log("📌 Отправка запроса на сервер:", {
        URL: `${API_BASE}/event-sessions`,
        Headers: { Authorization: `Bearer ${token}` },
        FormData: Object.fromEntries(formData.entries()),
      });
  
      const response = await fetch(`${API_BASE}/event-sessions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData, // ✅ `Content-Type` не указываем, браузер установит сам
      });
  
      if (!response.ok) {
        const errorData = await response.text(); // Читаем ответ как текст
        console.error("❌ Ошибка создания сессии:", errorData);
        throw new Error(`Ошибка создания сессии: ${errorData}`);
      }
  
      const result = await response.json();
      console.log("✅ Успешно создана сессия:", result);
      return result;
    } catch (error) {
      console.error("❌ Ошибка при создании сессии:", error);
      throw error;
    }
  }
  
  export async function updateEventSession(sessionId: string, sessionData: Record<string, any>, token: string): Promise<any> {
    try {
      const response = await fetch(`${API_BASE}/event-sessions/${sessionId}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sessionData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Ошибка обновления сессии события:", errorData);
        throw new Error(errorData.message || "Ошибка обновления сессии события");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Ошибка при обновлении сессии события:", error);
      throw error;
    }
  }
  
  export async function deleteEventSession(sessionId: string, token: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE}/event-sessions/${sessionId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Ошибка при удалении сессии события:", errorData);
        throw new Error(errorData.message || "Ошибка удаления сессии события");
      }
  
      return true;
    } catch (error) {
      console.error("Ошибка при удалении сессии события:", error);
      throw error;
    }
  }