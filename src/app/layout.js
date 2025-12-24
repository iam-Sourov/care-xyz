import Navbar from "@/components/navbar/Navbar";
import AuthProvider from "@/providers/AuthProvider";
import "./globals.css";
import Footer from "@/components/footer/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar></Navbar>
          <main>{children}</main>
          <Footer></Footer>
        </AuthProvider>
      </body>
    </html>
  );
}