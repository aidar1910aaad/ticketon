import { useState } from "react";
import { X } from "lucide-react";
import { resetUserPassword } from "@/api/users/index";

const ResetPasswordModal = ({ user, onClose }) => {
  const [newPassword, setNewPassword] = useState("");

  const handleResetPassword = async () => {
    if (!newPassword) {
      alert("Введите новый пароль");
      return;
    }

    const success = await resetUserPassword(user.id, newPassword);
    if (success) {
      alert("Пароль успешно сброшен!");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white p-6 rounded-md w-[90%] max-w-[400px]" onClick={(e) => e.stopPropagation()}>
        {/* Заголовок */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Сброс пароля</h2>
          <X size={24} className="cursor-pointer" onClick={onClose} />
        </div>

        {/* Поле ввода нового пароля */}
        <input
          type="password"
          placeholder="Введите новый пароль"
          className="border p-2 w-full mt-4"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        {/* Кнопка сброса пароля */}
        <button className="bg-red-500 text-white px-4 py-2 mt-4 w-full" onClick={handleResetPassword}>
          Сбросить пароль
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
