import React, { useState, useEffect } from 'react';
import { ExpenseTable } from '../components/expenses/ExpenseTable';
import { ExpenseFilterBar } from '../components/expenses/ExpenseFilterBar';
import { ExpenseFormModal } from '../components/expenses/ExpenseFormModal';
import { ExpenseDetailModal } from '../components/expenses/ExpenseDetailModal';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { Button } from '../components/common/Button';
import { useAuth } from '../contexts/AuthContext';
import { expenseService } from '../services/expenseService';
import { Expense, ExpenseFilters, Category } from '../types';
import { formatCurrency, getCurrentMonthRange } from '../utils/formatters';
import { translateErrorMessage } from '../utils/errorMessages';
import { Plus } from 'lucide-react';

export const ExpensesView: React.FC = () => {
  const { user } = useAuth();
  const defaultMonth = getCurrentMonthRange();

  const [filters, setFilters] = useState<ExpenseFilters>({
    startDate: defaultMonth.start,
    endDate: defaultMonth.end,
    category: 'Todas',
    searchQuery: '',
    sortBy: 'date',
    sortOrder: 'desc',
  });

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Modais
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState<Expense | null>(null);

  const [expenseToView, setExpenseToView] = useState<Expense | null>(null);

  const [expenseToDelete, setExpenseToDelete] = useState<Expense | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchExpenses = async () => {
    if (!user) return;
    setLoading(true);
    setErrorMessage(null);

    const { data, error } = await expenseService.getExpenses(filters);
    if (error) {
      setErrorMessage(translateErrorMessage(error));
    } else {
      setExpenses(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchExpenses();
  }, [user, filters]);

  const handleResetFilters = () => {
    setFilters({
      startDate: '',
      endDate: '',
      category: 'Todas',
      searchQuery: '',
      sortBy: 'date',
      sortOrder: 'desc',
    });
  };

  const handleOpenCreateModal = () => {
    setExpenseToEdit(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (expense: Expense) => {
    setExpenseToEdit(expense);
    setIsFormModalOpen(true);
  };

  const handleSaveExpense = async (data: {
    description: string;
    amount: number;
    category: Category;
    date: string;
    notes?: string | null;
  }) => {
    if (!user) return;

    if (expenseToEdit) {
      const { error } = await expenseService.updateExpense(expenseToEdit.id, data);
      if (error) {
        alert(translateErrorMessage(error));
        return;
      }
    } else {
      const { error } = await expenseService.createExpense({
        ...data,
        user_id: user.id,
      });
      if (error) {
        alert(translateErrorMessage(error));
        return;
      }
    }

    setIsFormModalOpen(false);
    setExpenseToEdit(null);
    fetchExpenses();
  };

  const handleConfirmDelete = async () => {
    if (!expenseToDelete) return;
    setIsDeleting(true);

    const { error } = await expenseService.deleteExpense(expenseToDelete.id);
    setIsDeleting(false);

    if (error) {
      alert(translateErrorMessage(error));
    } else {
      setExpenseToDelete(null);
      fetchExpenses();
    }
  };

  // Somatório das despesas filtradas
  const filteredTotal = expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Gerenciar Despesas</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Cadastre, edite, consulte e filtre todas as suas movimentações.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="primary"
            onClick={handleOpenCreateModal}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Nova Despesa
          </Button>
        </div>
      </div>

      {/* Barra de Filtros */}
      <ExpenseFilterBar
        filters={filters}
        onChange={(newFilters) => setFilters(newFilters)}
        onReset={handleResetFilters}
      />

      {/* Resumo da Listagem Filtrada */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1 py-1">
        <div className="text-xs text-slate-500">
          Mostrando <span className="font-semibold text-slate-800">{expenses.length}</span> despesa
          {expenses.length === 1 ? '' : 's'}
        </div>
        <div className="text-sm font-medium text-slate-600">
          Total no filtro:{' '}
          <span className="font-bold text-slate-900 text-base">
            {formatCurrency(filteredTotal)}
          </span>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-sm">
          {errorMessage}
        </div>
      )}

      {/* Tabela de Despesas */}
      <ExpenseTable
        expenses={expenses}
        onView={(exp) => setExpenseToView(exp)}
        onEdit={handleOpenEditModal}
        onDelete={(exp) => setExpenseToDelete(exp)}
        isLoading={loading}
      />

      {/* Modal Formulário (Cadastro / Edição) */}
      <ExpenseFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setExpenseToEdit(null);
        }}
        onSubmit={handleSaveExpense}
        expenseToEdit={expenseToEdit}
      />

      {/* Modal de Detalhes da Despesa */}
      <ExpenseDetailModal
        isOpen={Boolean(expenseToView)}
        onClose={() => setExpenseToView(null)}
        expense={expenseToView}
        onEdit={(exp) => {
          setExpenseToView(null);
          handleOpenEditModal(exp);
        }}
      />

      {/* Modal de Confirmação de Exclusão */}
      <ConfirmDialog
        isOpen={Boolean(expenseToDelete)}
        onClose={() => setExpenseToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Excluir Despesa"
        message={
          expenseToDelete
            ? `Tem certeza de que deseja remover a despesa "${expenseToDelete.description}" no valor de ${formatCurrency(
                expenseToDelete.amount
              )}? Esta ação não pode ser desfeita.`
            : ''
        }
        confirmLabel="Sim, excluir"
        cancelLabel="Cancelar"
        isDestructive={true}
        isLoading={isDeleting}
      />
    </div>
  );
};
