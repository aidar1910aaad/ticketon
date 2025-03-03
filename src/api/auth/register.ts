export async function register(data: { name: string; surname: string; email: string; password: string }) {
    try {
      const res = await fetch("http://94.232.246.12:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      const responseData = await res.json();
      console.log("Ответ сервера при регистрации:", responseData); // ✅ Логируем ответ
  
      if (!res.ok) {
        console.error("Ошибка при регистрации:", responseData);
        throw new Error(responseData.message || responseData.error || "Ошибка регистрации");
      }
  
      // ✅ Сохраняем пользователя в localStorage после успешной регистрации
      localStorage.setItem("user", JSON.stringify(responseData));
  
      return responseData;
    } catch (error) {
      console.error("Ошибка сети или сервера:", error);
      throw error;
    }
  }
  