export async function fetchEventSessions(): Promise<any[]> {
    try {
      const response = await fetch("http://94.232.246.12:8080/api/event-sessions");
      
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
      const response = await fetch(`http://94.232.246.12:8080/api/event-sessions/search/by-event/${eventId}`);
      
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
  
      const formData = new FormData();
      formData.append("eventId", sessionData.eventId);
      formData.append("startTime", sessionData.startTime);
      formData.append("price", sessionData.price.toString()); // Приведение числа к строке
  
      console.log("📌 Отправка запроса на сервер:", {
        URL: "http://94.232.246.12:8080/api/event-sessions",
        Headers: { Authorization: `Bearer ${token}` },
        FormData: Object.fromEntries(formData.entries()),
      });
  
      const response = await fetch("http://94.232.246.12:8080/api/event-sessions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Не указываем "Content-Type", браузер сам установит boundary для FormData
        },
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.text(); // Читаем ответ как текст, чтобы увидеть детали ошибки
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
      const response = await fetch(`http://94.232.246.12:8080/api/event-sessions/${sessionId}`, {
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
      const response = await fetch(`http://94.232.246.12:8080/api/event-sessions/${sessionId}`, {
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