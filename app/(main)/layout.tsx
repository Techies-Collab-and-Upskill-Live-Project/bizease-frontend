import Footer from "@/components/Footer";
import MobileNav from "@/components/navigations/MobileNav";
import SideNavBar from "@/components/navigations/SideNavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col w-full min-h-screen">
      <div className="flex flex-1">
        <div className="w-64 hidden md:block border-r">
          <SideNavBar />
        </div>
        <div className="flex flex-col flex-1 w-full overflow-y-auto">
          {children}
        </div>
      </div>
      <MobileNav />
      <Footer />
    </main>
  );
}
