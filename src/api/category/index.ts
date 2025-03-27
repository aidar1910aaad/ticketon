import { API_BASE } from "@/config/config";

export async function fetchEventCategories(): Promise<{ id: string; name: string }[]> {
    try {
      const response = await fetch(`${API_BASE}/event-categories`);
  
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
  
  export async function createEventCategory(name: string, token: string): Promise<any> {
    try {
      const formData = new FormData();
      formData.append("name", name);
  
      console.log("Отправка категории:", Object.fromEntries(formData.entries()));
  
      const response = await fetch(`${API_BASE}/event-categories`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Ошибка создания категории:", errorData);
        throw new Error(errorData.message || "Ошибка создания категории");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Ошибка при создании категории:", error);
      throw error;
    }
  }
  
  export async function deleteEventCategory(categoryId: string, token: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE}/event-categories/${categoryId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Ошибка удаления категории:", errorData);
        throw new Error(errorData.message || "Ошибка удаления категории");
      }
    } catch (error) {
      console.error("Ошибка при удалении категории:", error);
      throw error;
    }
  }