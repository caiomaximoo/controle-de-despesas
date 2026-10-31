import React from 'react';
import { Expense } from '../../types';
import { Badge } from '../common/Badge';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Edit2, Trash2, Eye, FileText } from 'lucide-react';

interface ExpenseTableProps {
  expenses: Expense[];
  onView: (expense: Expense) => void;
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
  isLoading?: boolean;
}

export const ExpenseTable: React.FC<ExpenseTableProps> = ({
  expenses,
  onView,
  onEdit,
  onDelete,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200/80 p-8 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-100 rounded-lg w-full"></div>
          <div className="h-12 bg-slate-50 rounded-lg w-full"></div>
          <div className="h-12 bg-slate-50 rounded-lg w-full"></div>
          <div className="h-12 bg-slate-50 rounded-lg w-full"></div>
        </div>
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center">
        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
          <FileText className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-semibold text-slate-800">Nenhuma despesa encontrada</h4>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Não há despesas cadastradas que correspondam aos filtros selecionados. Tente ajustar o período ou adicione um novo registro.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Tabela para telas médias e grandes */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50/75 text-xs uppercase font-semibold text-slate-500">
            <tr>
              <th className="py-3 px-4">Data</th>
              <th className="py-3 px-4">Descrição</th>
              <th className="py-3 px-4">Categoria</th>
              <th className="py-3 px-4 text-right">Valor</th>
              <th className="py-3 px-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-normal text-slate-700">
            {expenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-slate-50/75 transition-colors">
                <td className="py-3.5 px-4 whitespace-nowrap text-xs text-slate-500 font-medium">
                  {formatDate(expense.date)}
                </td>
                <td className="py-3.5 px-4 font-medium text-slate-900 max-w-xs truncate">
                  {expense.description}
                  {expense.notes && (
                    <span className="block text-xs text-slate-400 font-normal truncate mt-0.5">
                      {expense.notes}
                    </span>
                  )}
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <Badge category={expense.category} size="sm" />
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap text-right font-semibold text-slate-900">
                  {formatCurrency(expense.amount)}
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap text-right">
                  <div className="inline-flex items-center gap-1">
                    <button
                      onClick={() => onView(expense)}
                      title="Ver detalhes"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(expense)}
                      title="Editar despesa"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-brand-50 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(expense)}
                      title="Excluir despesa"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards para visualização Mobile */}
      <div className="md:hidden divide-y divide-slate-100">
        {expenses.map((expense) => (
          <div key={expense.id} className="p-4 space-y-2 hover:bg-slate-50/50 transition-colors">
            <div className="flex items-start justify-between gap-2">
              <div className="font-medium text-slate-900 text-sm">{expense.description}</div>
              <div className="font-bold text-slate-900 text-sm whitespace-nowrap">
                {formatCurrency(expense.amount)}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <Badge category={expense.category} size="sm" />
              <span>{formatDate(expense.date)}</span>
            </div>

            {expense.notes && (
              <p className="text-xs text-slate-500 line-clamp-2 pt-1 border-t border-slate-50">
                {expense.notes}
              </p>
            )}

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => onView(expense)}
                className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-md text-slate-600 bg-slate-100 hover:bg-slate-200"
              >
                <Eye className="w-3.5 h-3.5 mr-1" />
                Detalhes
              </button>
              <button
                onClick={() => onEdit(expense)}
                className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-md text-brand-700 bg-brand-50 hover:bg-brand-100"
              >
                <Edit2 className="w-3.5 h-3.5 mr-1" />
                Editar
              </button>
              <button
                onClick={() => onDelete(expense)}
                className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-md text-rose-700 bg-rose-50 hover:bg-rose-100"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1" />
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
