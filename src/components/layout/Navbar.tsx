import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Wallet,
  LayoutDashboard,
  Receipt,
  LogOut,
  Menu,
  X,
  User as UserIcon,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, profile, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/despesas', label: 'Despesas', icon: Receipt },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const displayName = profile?.name || user?.user_metadata?.name || user?.email?.split('@')[0] || 'Usuário';

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo e Links Desktop */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2.5 text-brand-700 font-bold text-lg">
              <div className="w-9 h-9 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-sm shadow-brand-500/20">
                <Wallet className="w-5 h-5" />
              </div>
              <span className="tracking-tight text-slate-900">
                Controle<span className="text-brand-600">Despesas</span>
              </span>
            </Link>

            <div className="hidden md:ml-8 md:flex md:space-x-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.to);
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`inline-flex items-center px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? 'bg-brand-50 text-brand-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Usuário e Logout Desktop */}
          <div className="hidden md:flex md:items-center md:gap-4">
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200/60">
              <div className="w-7 h-7 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-semibold">
                <UserIcon className="w-3.5 h-3.5" />
              </div>
              <div className="text-left">
                <div className="text-xs font-medium text-slate-900 truncate max-w-[140px]">
                  {displayName}
                </div>
                <div className="text-[10px] text-slate-500 truncate max-w-[140px]">
                  {user?.email}
                </div>
              </div>
            </div>

            <button
              onClick={() => signOut()}
              title="Sair da conta"
              className="inline-flex items-center p-2 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Botão Mobile */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1">
          <div className="px-3 py-2 mb-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <div className="text-sm font-semibold text-slate-900 truncate">{displayName}</div>
              <div className="text-xs text-slate-500 truncate">{user?.email}</div>
            </div>
          </div>

          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center px-3 py-2.5 rounded-lg text-base font-medium ${
                  active
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {link.label}
              </Link>
            );
          })}

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                signOut();
              }}
              className="w-full flex items-center px-3 py-2.5 rounded-lg text-base font-medium text-rose-600 hover:bg-rose-50"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Sair da conta
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
