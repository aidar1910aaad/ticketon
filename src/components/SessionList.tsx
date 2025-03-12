"use client";

interface Session {
  id: string;
  startTime: string;
}

interface Props {
  sessions: Session[];
}

export default function SessionList({ sessions }: Props) {
  return (
    <div className="mt-4 bg-gray-100 p-2 rounded-lg">
      <h4 className="font-semibold text-center">Сессии</h4>
      {sessions.length > 0 ? (
        <ul>
          {sessions.map((session) => (
            <li key={session.id} className="border-b py-2">
              <p>
                <strong>Дата:</strong> {new Date(session.startTime).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">Нет доступных сессий</p>
      )}
    </div>
  );
}
