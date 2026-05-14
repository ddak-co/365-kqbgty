'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: '대시보드' },
    { href: '/vehicles', label: '차량 목록' },
    { href: '/maintenance', label: '유지보수 일정' },
    { href: '/costs', label: '비용 관리' },
    { href: '/expirations', label: '만료일 알림' },
    { href: '/statistics', label: '통계' },
  ]

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6 hidden md:block">
      <h2 className="text-2xl font-bold text-blue-600 mb-8">🚗 차량관리 365</h2>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-4 py-3 rounded-lg transition ${pathname === item.href ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar