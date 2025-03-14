import { useState } from "react";
import { X } from "lucide-react";
import { updateUser } from "@/api/users/index"; 

const roles = ["USER", "ADMIN", "MODERATOR"]; // Доступные роли

const EditUserModal = ({ user, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    surname: user.surname,
    phoneNumber: user.phoneNumber,
    role: user.role,
    isEnabled: user.isEnabled,
  });

  // Обновление полей формы
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Обработчик сохранения
  const handleSave = async () => {
    const success = await updateUser(user.id, formData);
    if (success) {
      alert("Данные пользователя обновлены!");
      onUpdate(); // Обновляем список пользователей
      onClose(); // Закрываем модальное окно
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white p-6 rounded-md w-[90%] max-w-[500px]" onClick={(e) => e.stopPropagation()}>
        {/* Заголовок */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Редактирование пользователя</h2>
          <X size={24} className="cursor-pointer" onClick={onClose} />
        </div>

        {/* Поля ввода */}
        <div className="mt-4 space-y-3">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Имя" className="border p-2 w-full" />
          <input type="text" name="surname" value={formData.surname} onChange={handleChange} placeholder="Фамилия" className="border p-2 w-full" />
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Телефон" className="border p-2 w-full" />

          {/* Выпадающий список ролей */}
          <select name="role" value={formData.role} onChange={handleChange} className="border p-2 w-full">
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

          {/* Чекбокс Активности */}
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="isEnabled" checked={formData.isEnabled} onChange={handleChange} />
            <span>Активен</span>
          </label>
        </div>

        {/* Кнопки */}
        <div className="mt-4 flex justify-between">
          <button className="bg-gray-500 text-white px-4 py-2 rounded-md" onClick={onClose}>
            Отмена
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md" onClick={handleSave}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
