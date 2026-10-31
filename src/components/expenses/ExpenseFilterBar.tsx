import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { CATEGORIES } from '../../lib/constants';
import { Category, ExpenseFilters } from '../../types';
import { Button } from '../common/Button';

interface ExpenseFilterBarProps {
  filters: ExpenseFilters;
  onChange: (filters: ExpenseFilters) => void;
  onReset: () => void;
}

export const ExpenseFilterBar: React.FC<ExpenseFilterBarProps> = ({
  filters,
  onChange,
  onReset,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs space-y-3">
      {/* Linha 1: Busca e Categoria */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* Campo de Busca */}
        <div className="md:col-span-5 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Buscar por descrição ou notas..."
            value={filters.searchQuery || ''}
            onChange={(e) => onChange({ ...filters, searchQuery: e.target.value })}
            className="block w-full pl-9 pr-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-500 transition-colors"
          />
        </div>

        {/* Filtro de Categoria */}
        <div className="md:col-span-4 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Filter className="w-4 h-4" />
          </div>
          <select
            value={filters.category || 'Todas'}
            onChange={(e) =>
              onChange({
                ...filters,
                category: e.target.value as Category | 'Todas',
              })
            }
            className="block w-full pl-9 pr-3.5 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-500 transition-colors"
          >
            <option value="Todas">Todas as Categorias</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Ordenação */}
        <div className="md:col-span-3 flex gap-2">
          <select
            value={`${filters.sortBy || 'date'}-${filters.sortOrder || 'desc'}`}
            onChange={(e) => {
              const [sortBy, sortOrder] = e.target.value.split('-') as [
                'date' | 'amount',
                'asc' | 'desc'
              ];
              onChange({ ...filters, sortBy, sortOrder });
            }}
            className="block w-full py-2 px-3 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-500"
          >
            <option value="date-desc">Mais recentes primeiro</option>
            <option value="date-asc">Mais antigas primeiro</option>
            <option value="amount-desc">Maior valor primeiro</option>
            <option value="amount-asc">Menor valor primeiro</option>
          </select>
        </div>
      </div>

      {/* Linha 2: Período e Botão Limpar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-500 font-medium">Período:</span>
          <div className="flex items-center gap-1.5">
            <input
              type="date"
              value={filters.startDate || ''}
              onChange={(e) => onChange({ ...filters, startDate: e.target.value })}
              className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-200 focus:border-brand-500 outline-none"
            />
            <span className="text-slate-400">até</span>
            <input
              type="date"
              value={filters.endDate || ''}
              onChange={(e) => onChange({ ...filters, endDate: e.target.value })}
              className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-200 focus:border-brand-500 outline-none"
            />
          </div>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onReset}
          leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          className="text-slate-500 hover:text-slate-800"
        >
          Limpar Filtros
        </Button>
      </div>
    </div>
  );
};
