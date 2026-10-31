import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200/80 bg-white py-4 text-center text-xs text-slate-500">
        Controle de Despesas &bull; Projeto pessoal &bull; Dados protegidos com Supabase RLS
      </footer>
    </div>
  );
};
