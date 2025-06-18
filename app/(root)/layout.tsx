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
      <div className=" flex flex-1 w-full">
        <SideNavBar />
        <main className="flex-1"> {children}</main>
      </div>
      <Footer />
      <MobileNav />
    </section>
  );
}
