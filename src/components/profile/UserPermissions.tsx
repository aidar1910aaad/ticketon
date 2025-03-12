interface UserPermissionsProps {
    authorities: { authority: string }[];
  }
  
  export default function UserPermissions({ authorities }: UserPermissionsProps) {
    return (
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Права доступа</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          {authorities.map((auth, index) => (
            <li key={index} className="text-lg">{auth.authority.replace(/_/g, " ")}</li>
          ))}
        </ul>
      </div>
    );
  }
  