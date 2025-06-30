import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import "./globals.css";
import { AuthProvider } from '@/lib/AuthContext';

export const metadata: Metadata = {
  title: "Office App - Association Management System",
  description: "A comprehensive association management system with secure voting capabilities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <AuthProvider>
          <Navigation />
          <main>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
