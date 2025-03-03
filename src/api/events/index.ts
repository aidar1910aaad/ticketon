export async function fetchCategories(): Promise<{ id: string; name: string }[]> {
  try {
    const response = await fetch("http://94.232.246.12:8080/api/event-categories");

    if (!response.ok) {
      throw new Error("Ошибка загрузки категорий");
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Ошибка при получении категорий:", error);
    return [];
  }
}

export async function createEvent(eventData: Record<string, any>, token: string): Promise<any> {
  try {
    const formData = new FormData();
    
    // ✅ Добавляем все поля в `FormData`
    Object.keys(eventData).forEach((key) => {
      if (eventData[key]) {
        formData.append(key, eventData[key]);
      }
    });

    console.log("Отправка события:", Object.fromEntries(formData.entries())); // ✅ Логируем, что отправляем

    const response = await fetch("http://94.232.246.12:8080/api/events", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Ошибка создания события:", errorData);
      throw new Error(errorData.message || "Ошибка создания события");
    }

    return await response.json();
  } catch (error) {
    console.error("Ошибка при создании события:", error);
    throw error;
  }
}


export async function deleteEvent(eventId: string, token: string): Promise<boolean> {
  try {
    const response = await fetch(`http://94.232.246.12:8080/api/events/${eventId}`, {
      method: "DELETE",
      mode: "cors", // ✅ Указываем CORS-режим
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Ошибка при удалении события:", errorData);
      throw new Error(errorData.message || "Ошибка удаления события");
    }

    return true;
  } catch (error) {
    console.error("Ошибка при удалении события:", error);
    throw error;
  }
}

interface EventResponse {
  content: Event[];
  pageable?: any;
  last?: boolean;
  totalElements?: number;
  totalPages?: number;
}

export async function fetchEvents(): Promise<Event[]> {
  try {
    const response = await fetch("http://94.232.246.12:8080/api/events");

    if (!response.ok) {
      throw new Error(`Ошибка загрузки событий: ${response.statusText}`);
    }

    const data: EventResponse = await response.json();
    console.log("🔹 Ответ API:", data); // ✅ Логируем ответ

    return data.content || []; // ✅ Возвращаем массив событий
  } catch (error) {
    console.error("Ошибка при получении событий:", error);
    return []; // ✅ Возвращаем пустой массив, если API не работает
  }
}

export async function fetchEventById(eventId: string): Promise<any> {
  try {
    const response = await fetch(`http://94.232.246.12:8080/api/events/search/by-id/${eventId}`);

    if (!response.ok) {
      throw new Error(`Ошибка загрузки события: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Ошибка при получении события:", error);
    throw error;
  }
}

