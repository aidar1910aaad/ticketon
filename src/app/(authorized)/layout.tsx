import AuthorizedLayout from "../layouts/AuthorizedLayout";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthorizedLayout>
      {children}
    </AuthorizedLayout>
  );
}
