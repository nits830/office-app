'use client';
import { usePathname } from 'next/navigation';
import Navigation from '@/components/Navigation';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showNav = !pathname.startsWith('/admin');
  return (
    <>
      {showNav && <Navigation />}
      <main>{children}</main>
    </>
  );
}