export async function fetchCategories(): Promise<{ id: string; name: string }[]> {
  try {
    const response = await fetch("http://94.232.246.12:8080/api/event-categories");

    if (!response.ok) {
      throw new Error("Ошибка загрузки категорий");
    }

    const data = await response.json();
    console.log("🔹 Категории, полученные от API:", data);

    if (!Array.isArray(data)) {
      console.error("🔴 Ошибка: API вернул неожиданный формат", data);
      return [];
    }

    return data;
  } catch (error) {
    console.error("Ошибка при получении категорий:", error);
    return [];
  }
}
export async function createEvent(eventData: Record<string, any>, token: string): Promise<any> {
  try {
    console.log("📌 Данные перед созданием FormData:", eventData);

    const formData = new FormData();
    formData.append("title", eventData.title ?? "");
    formData.append("description", eventData.description ?? "");
    formData.append("additionalInformation", eventData.additionalInformation ?? "");
    formData.append("categoryId", eventData.categoryID ?? "");
    formData.append("ageRestriction", eventData.ageRestriction ?? "");

    // ✅ Проверяем, есть ли изображение
    if (eventData.backgroundImage) {
      // Преобразуем `File` в `Blob`
      const imageBlob = new Blob([eventData.backgroundImage], { type: eventData.backgroundImage.type });

      // ✅ Добавляем `Blob` в `FormData`
      formData.append("backgroundImage", imageBlob, eventData.backgroundImage.name);
    } else {
      throw new Error("Ошибка: изображение обязательно!");
    }

    console.log("📌 Final FormData перед отправкой:", Object.fromEntries(formData.entries()));

    const response = await fetch("http://94.232.246.12:8080/api/events", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("❌ Ошибка создания события:", errorData);
      throw new Error(errorData.message || "Ошибка создания события");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Ошибка при создании события:", error);
    throw error;
  }
}



export async function deleteEvent(eventId: string, token: string): Promise<boolean> {
  try {
    const response = await fetch(`http://94.232.246.12:8080/api/events/${eventId}`, {
      method: "DELETE",
      mode: "cors",
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
    console.log("🔹 Ответ API:", data);

    return data.content || [];
  } catch (error) {
    console.error("Ошибка при получении событий:", error);
    return [];
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