import Footer from '@/components/Footer';
import MobileNav from '@/components/navigations/MobileNav';
import Navbar from '@/components/navigations/SideNavBar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col w-full min-h-screen">
      <div className="flex">
        <div className="w-ful">
          <Navbar />
        </div>
        <div className="flex flex-col w-full">{children}</div>
      </div>
      <MobileNav />
      <Footer />
    </main>
  );
}
