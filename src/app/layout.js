import { Inter } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import AuthProvider from "@/providers/AuthProvider";
import { Toaster } from "@/components/ui/sonner"
import Footer from "@/components/footer/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Care.xyz - Trusted Caregiving Services",
  description: "Find reliable babysitting and elderly care services in your area.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="grow">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}