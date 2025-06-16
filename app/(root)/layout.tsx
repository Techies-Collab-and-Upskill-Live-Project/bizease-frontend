import Footer from '@/components/Footer';
import MobileNav from '@/components/navigations/MobileNav';
import SideNavBar from '@/components/navigations/SideNavBar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="min-h-screen w-full h-screen mb-10 lg:flex-row ">
      <div className=" flex">
        <SideNavBar />
        {children}
      </div>
      <Footer />
      <MobileNav />
    </section>
  );
}
