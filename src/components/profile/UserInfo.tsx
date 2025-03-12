interface UserInfoProps {
    user: {
      name: string;
      surname: string;
      phoneNumber: string;
      role: string;
      createdAt: string;
    };
  }
  
  export default function UserInfo({ user }: UserInfoProps) {
    return (
      <div className="border-b pb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Общая информация</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-gray-700">
            <p className="text-lg">
              <strong>Имя:</strong> {user.name}
            </p>
            <p className="text-lg">
              <strong>Фамилия:</strong> {user.surname}
            </p>
          </div>
          <div className="text-gray-700">
            <p className="text-lg">
              <strong>Телефон:</strong> {user.phoneNumber}
            </p>
            <p className="text-lg">
              <strong>Роль:</strong> {user.role}
            </p>
          </div>
        </div>
        <p className="text-lg text-gray-600 mt-4">
          <strong>Дата регистрации:</strong> {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>
    );
  }
  