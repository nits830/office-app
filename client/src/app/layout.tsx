import { AuthProvider } from '@/lib/AuthContext';
import './globals.css';
import AppShell from '@/components/AppShell';

export const metadata = {
  title: 'Office App',
  description: 'Association Management System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AppShell>{children}</AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}