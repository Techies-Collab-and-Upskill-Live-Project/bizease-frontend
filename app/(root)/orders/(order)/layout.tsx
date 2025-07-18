import MobileNav from '@/components/navigations/MobileNav';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <div className="flex-1">{children}</div>
      </div>
      <MobileNav />
    </main>
  );
}
