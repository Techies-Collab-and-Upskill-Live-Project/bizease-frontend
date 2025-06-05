import Footer from '@/components/Footer';
import MobileNav from '@/components/navigations/MobileNav';
import SideNavBar from '@/components/navigations/SideNavBar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row ">
      <SideNavBar />
      <div className=" flex-1">{children}</div>
      <MobileNav />
    </div>
  );
}
