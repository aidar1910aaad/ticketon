export async function login(credentials: { email: string; password: string }) {
  try {
    const res = await fetch("http://2.56.177.66:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      mode: "no-cors"
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Ошибка авторизации.");
    }

    const data = await res.json();
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("user", JSON.stringify({ email: credentials.email }));

    return data;
  } catch (err: any) {
    console.error("Ошибка сети:", err.message);
    throw new Error("Ошибка сети. Проверьте соединение.");
  }
}
