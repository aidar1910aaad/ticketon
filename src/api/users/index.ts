export async function fetchUserProfile(token: string) {
  try {
    const response = await fetch("http://94.232.246.12:8080/api/user-profile/userinfo", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Ошибка загрузки профиля");
    }

    return await response.json();
  } catch (error) {
    console.error("Ошибка загрузки профиля:", error);
    return null;
  }
}
