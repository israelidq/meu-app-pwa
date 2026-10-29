'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const BottomNav: React.FC = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav aria-label="Navegação Principal" className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 pb-safe">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-4">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
            isActive('/')
              ? 'text-blue-600 dark:text-blue-400 font-semibold'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 font-medium'
          }`}
        >
          <span className="text-xl mb-0.5">🏠</span>
          <span className="text-[10px] tracking-tight">Hábitos</span>
        </Link>

        <Link
          href="/graficos"
          className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
            isActive('/graficos')
              ? 'text-blue-600 dark:text-blue-400 font-semibold'
              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 font-medium'
          }`}
        >
          <span className="text-xl mb-0.5">📊</span>
          <span className="text-[10px] tracking-tight">Gráficos</span>
        </Link>
      </div>
    </nav>
  );
};