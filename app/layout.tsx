import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gym Routine",
  description: "Tu aplicación para gestionar rutinas de gimnasio",
  icons: {
    icon: [
      {
        url: "/app/icon.png",
        href: "/app/icon.png",
      },
    ],
    apple: [
      {
        url: "/app/icon.png",
        href: "/app/icon.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
