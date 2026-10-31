import React from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Expense } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Calendar, Tag, FileText, Clock } from 'lucide-react';

interface ExpenseDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  expense: Expense | null;
  onEdit?: (expense: Expense) => void;
}

export const ExpenseDetailModal: React.FC<ExpenseDetailModalProps> = ({
  isOpen,
  onClose,
  expense,
  onEdit,
}) => {
  if (!expense) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Detalhes da Despesa"
      maxWidth="sm"
    >
      <div className="space-y-4">
        {/* Valor em destaque */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Valor Total
          </span>
          <span className="text-3xl font-bold text-slate-900 mt-1 block">
            {formatCurrency(expense.amount)}
          </span>
        </div>

        {/* Informações em lista */}
        <div className="space-y-3 text-sm">
          <div>
            <span className="text-xs text-slate-500 font-medium block">Descrição</span>
            <span className="text-slate-900 font-semibold text-base mt-0.5 block">
              {expense.description}
            </span>
          </div>

          <div className="flex items-center justify-between py-2 border-t border-slate-100">
            <span className="text-xs text-slate-500 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              Categoria
            </span>
            <Badge category={expense.category} size="sm" />
          </div>

          <div className="flex items-center justify-between py-2 border-t border-slate-100">
            <span className="text-xs text-slate-500 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Data do Gasto
            </span>
            <span className="font-medium text-slate-800">{formatDate(expense.date)}</span>
          </div>

          {expense.notes && (
            <div className="py-2 border-t border-slate-100">
              <span className="text-xs text-slate-500 flex items-center gap-1.5 mb-1">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                Observações
              </span>
              <p className="text-xs text-slate-700 bg-slate-50 rounded-lg p-2.5 border border-slate-100 whitespace-pre-wrap">
                {expense.notes}
              </p>
            </div>
          )}

          {expense.created_at && (
            <div className="flex items-center justify-between py-2 border-t border-slate-100 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Registrado em
              </span>
              <span>{new Date(expense.created_at).toLocaleString('pt-BR')}</span>
            </div>
          )}
        </div>

        {/* Ações */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
          <Button type="button" variant="outline" onClick={onClose}>
            Fechar
          </Button>
          {onEdit && (
            <Button
              type="button"
              variant="primary"
              onClick={() => {
                onClose();
                onEdit(expense);
              }}
            >
              Editar
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
