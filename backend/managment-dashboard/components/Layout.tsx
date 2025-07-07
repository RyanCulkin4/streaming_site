'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogConsole from './LogConsole';

const services = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'API Gateway', path: '/api-gateway' },
  { name: 'Auth Service', path: '/auth-service' },
  { name: 'SQL Service', path: '/sql-service' },
  { name: 'Storage', path: '/storage' },
  { name: 'Worker', path: '/worker' },
  { name: 'Cache', path: '/cache' },
  { name: 'Logging', path: '/logging' }
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <div className="flex h-screen text-white bg-gray-950">
        <aside className="w-64 bg-gray-900 border-r border-gray-800">
          <div className="p-6 text-xl font-bold">⚙️ Admin Panel</div>
          <nav className="flex flex-col gap-1 p-4">
            {services.map((service) => (
              <Link
                key={service.path}
                href={service.path}
                className={`
                  p-2 rounded transition
                  ${pathname === service.path ? 'bg-blue-600' : 'hover:bg-gray-800'}
                `}
              >
                {service.name}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
      <LogConsole />
    </>
  );
}
