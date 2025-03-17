const API_BASE = "http://94.232.246.12:8080/api/admin/users";

// ✅ Функция для получения токена
const getToken = () => localStorage.getItem("token") || "";

// ✅ Получение пользователей (GET)
export async function fetchUsers() {
  try {
    const response = await fetch(`${API_BASE}?page=0&size=10`, {
      method: "GET",
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    if (!response.ok) throw new Error("Ошибка загрузки пользователей");
    return await response.json();
  } catch (error) {
    console.error("Ошибка получения пользователей:", error);
    return null;
  }
}

export async function updateUser(userID: string, updatedData: Partial<User>) {
  try {
    const formData = new FormData();
    Object.entries(updatedData).forEach(([key, value]) => formData.append(key, String(value)));

    const response = await fetch(`${API_BASE}/${userID}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${getToken()}` },
      body: formData,
    });

    if (!response.ok) throw new Error("Ошибка обновления пользователя");
    return await response.json();
  } catch (error) {
    console.error("Ошибка обновления пользователя:", error);
    return null;
  }
}
// ✅ Удаление пользователя (DELETE)
export async function deleteUser(userID: string) {
  try {
    const response = await fetch(`${API_BASE}/${userID}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    if (!response.ok) throw new Error("Ошибка удаления пользователя");
  } catch (error) {
    console.error("Ошибка удаления пользователя:", error);
  }
}

// ✅ Сброс пароля пользователя (PUT)
export async function resetUserPassword(userID: string, newPassword: string) {
  try {
    const response = await fetch(`${API_BASE}/password-reset/${userID}?password=${newPassword}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    if (!response.ok) throw new Error("Ошибка сброса пароля");
    return await response.json();
  } catch (error) {
    console.error("Ошибка сброса пароля:", error);
    return null;
  }
}






export async function fetchUserInfo() {
  try {
    const token = getToken();
    if (!token) throw new Error("Ошибка: требуется авторизация");

    const response = await fetch("http://94.232.246.12:8080/api/user-profile/userinfo", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Ошибка загрузки информации о пользователе");
    return await response.json();
  } catch (error) {
    console.error("Ошибка получения информации о пользователе:", error);
    return null;
  }
}


export async function fetchUserTickets(page = 0, size = 10) {
  try {
    const token = getToken();
    if (!token) throw new Error("Ошибка: требуется авторизация");

    const response = await fetch(`http://94.232.246.12:8080/api/user-profile/mytickets?page=${page}&size=${size}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Ошибка загрузки билетов");
    return await response.json();
  } catch (error) {
    console.error("Ошибка получения билетов:", error);
    return null;
  }
}
