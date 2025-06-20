import Footer from '@/components/Footer';
import MobileNav from '@/components/navigations/MobileNav';
import SideNavBar from '@/components/navigations/SideNavBar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="min-h-screen  lg:flex-row ">
      <div className=" flex flex-1 w-full">
        <SideNavBar />
        <main className="flex-1  pb-20"> {children}</main>
      </div>
      <Footer />
      <MobileNav />
      
    </section>
  );
}
