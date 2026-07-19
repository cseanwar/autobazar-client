import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-12">
      <Link
        href="/"
        className="mb-8 text-3xl font-display font-bold tracking-tight"
      >
        AutoBazaar
      </Link>
      {children}
    </div>
  );
}
