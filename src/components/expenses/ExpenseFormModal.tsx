import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { CATEGORIES } from '../../lib/constants';
import { Category, Expense } from '../../types';
import { validateExpenseForm, ExpenseValidationErrors } from '../../utils/validators';

interface ExpenseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    description: string;
    amount: number;
    category: Category;
    date: string;
    notes?: string | null;
  }) => Promise<void>;
  expenseToEdit?: Expense | null;
  isLoading?: boolean;
}

export const ExpenseFormModal: React.FC<ExpenseFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  expenseToEdit,
  isLoading = false,
}) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>('Alimentação');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<ExpenseValidationErrors>({});

  // Data local do usuário (evita shift de fuso horário UTC)
  const getTodayLocalDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (expenseToEdit) {
      setDescription(expenseToEdit.description);
      setAmount(String(expenseToEdit.amount));
      setCategory(expenseToEdit.category);
      setDate(expenseToEdit.date);
      setNotes(expenseToEdit.notes || '');
    } else {
      setDescription('');
      setAmount('');
      setCategory('Alimentação');
      setDate(getTodayLocalDate());
      setNotes('');
    }
    setErrors({});
  }, [expenseToEdit, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, errors: validationErrors } = validateExpenseForm({
      description,
      amount,
      category,
      date,
    });

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    const parsedAmount = parseFloat(amount.replace(',', '.'));

    await onSubmit({
      description: description.trim(),
      amount: parsedAmount,
      category,
      date,
      notes: notes.trim() || null,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={expenseToEdit ? 'Editar Despesa' : 'Nova Despesa'}
      description={
        expenseToEdit
          ? 'Atualize os dados da despesa selecionada.'
          : 'Preencha os campos abaixo para registrar um novo gasto.'
      }
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Descrição */}
        <Input
          label="Descrição"
          required
          placeholder="Ex: Almoço de domingo, Conta de luz"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={errors.description}
          autoFocus
        />

        {/* Linha dupla: Valor e Data */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Valor (R$)"
            required
            type="text"
            inputMode="decimal"
            placeholder="0,00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            error={errors.amount}
            helperText="Aceita vírgula ou ponto (ex: 25,50)"
          />

          <Input
            label="Data"
            required
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            error={errors.date}
          />
        </div>

        {/* Categoria */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Categoria <span className="text-rose-500">*</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 transition-colors"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1.5 text-xs text-rose-600 font-medium">{errors.category}</p>
          )}
        </div>

        {/* Observações */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Observações <span className="text-xs text-slate-400 font-normal">(opcional)</span>
          </label>
          <textarea
            rows={3}
            placeholder="Detalhes adicionais, forma de pagamento ou notas..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200 transition-colors"
          />
        </div>

        {/* Ações */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" isLoading={isLoading}>
            {expenseToEdit ? 'Salvar Alterações' : 'Cadastrar Despesa'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
