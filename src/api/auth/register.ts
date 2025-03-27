import { API_BASE } from "@/config/config";

export async function register(data: { name: string; surname: string; email: string; password: string }) {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      const responseData = await res.json();
      console.log("Ответ сервера при регистрации:", responseData); 
  
      if (!res.ok) {
        console.error("Ошибка при регистрации:", responseData);
        throw new Error(responseData.message || responseData.error || "Ошибка регистрации");
      }
  
     
      localStorage.setItem("user", JSON.stringify(responseData));
  
      return responseData;
    } catch (error) {
      console.error("Ошибка сети или сервера:", error);
      throw error;
    }
  }
  