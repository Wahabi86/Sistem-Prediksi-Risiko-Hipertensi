"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // halaman yang tidak dimunculkan footer
  const hideFooterRoutes = ["/auth/login", "/auth/register"];
  const hideFooterRule = hideFooterRoutes.includes(pathname);

  return (
    <>
      {!hideFooterRule && <Navbar />}
      <main>{children}</main>
      {!hideFooterRule && <Footer />}
    </>
  );
}
