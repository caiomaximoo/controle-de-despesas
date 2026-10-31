import { Category } from '../types';

export const CATEGORIES: Category[] = [
  'Alimentação',
  'Transporte',
  'Moradia',
  'Saúde',
  'Educação',
  'Lazer',
  'Compras',
  'Contas e serviços',
  'Outros',
];

export const CATEGORY_COLORS: Record<Category, { bg: string; text: string; border: string; hex: string }> = {
  'Alimentação': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', hex: '#f59e0b' },
  'Transporte': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', hex: '#3b82f6' },
  'Moradia': { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', hex: '#6366f1' },
  'Saúde': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', hex: '#f43f5e' },
  'Educação': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', hex: '#a855f7' },
  'Lazer': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', hex: '#10b981' },
  'Compras': { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200', hex: '#ec4899' },
  'Contas e serviços': { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200', hex: '#06b6d4' },
  'Outros': { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200', hex: '#64748b' },
};
