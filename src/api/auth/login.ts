export async function login(credentials: { email: string; password: string }) {
  const res = await fetch("https://2.56.177.66:8444/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    throw new Error("Ошибка авторизации. Проверьте введенные данные.");
  }

  const data = await res.json();
  console.log("Ответ сервера:", data); // ✅ Проверяем, что сервер возвращает токен

  // ✅ Теперь сохраняем ТОЛЬКО `access_token` отдельно
  localStorage.setItem("token", data.access_token);

  // ✅ Сохраняем email, чтобы знать, кто вошел
  localStorage.setItem("user", JSON.stringify({ email: credentials.email }));

  return data;
}
