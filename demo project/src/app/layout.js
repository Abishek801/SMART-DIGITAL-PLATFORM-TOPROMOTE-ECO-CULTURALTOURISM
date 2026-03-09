import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import Providers from "../components/Providers";
import { ToastProvider } from "../components/Toast";

export const metadata = {
  title: "EcoCulture | Smart Travel Platform",
  description:
    "AI-powered personalized eco-friendly travel plans and cultural experiences.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Outfit:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <ToastProvider>
            <Navbar />
            <div className="pt-24 min-h-[calc(100vh-200px)]">{children}</div>
            <Footer />
            <Chatbot />
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
