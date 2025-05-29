import Footer from "@/components/Footer";
import MobileNav from "@/components/navigations/MobileNav";
import Navbar from "@/components/navigations/SideNavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <div className="w-ful">
          <Navbar />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex-1">{children}</div>
        </div>
      </div>
      <MobileNav />
      {/* <Footer /> */}
    </main>
  );
}
