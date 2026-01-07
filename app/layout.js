import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import { Providers } from "@/components/Providers";

const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500", "600", "700"] })

export const metadata = {
  title: "Ecommie ",
  description: "E-Commerce with Next.js ",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${outfit.className} antialiased text-slate-100 bg-slate-950`} >
          <Toaster
            toastOptions={{
              style: {
                background: '#1a1a1a',
                color: '#f1f5f9',
                border: '1px solid #334155',
                boxShadow: '0 0 20px rgba(34, 211, 238, 0.2)',
              },
              success: {
                iconTheme: {
                  primary: '#22d3ee',
                  secondary: '#1a1a1a',
                },
              },
            }}
          />
          <Providers>
            <AppContextProvider>
              {children}
            </AppContextProvider>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
