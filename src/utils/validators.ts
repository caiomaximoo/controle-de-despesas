export interface ExpenseValidationErrors {
  description?: string;
  amount?: string;
  category?: string;
  date?: string;
}

export function validateExpenseForm(data: {
  description: string;
  amount: number | string;
  category: string;
  date: string;
}): { isValid: boolean; errors: ExpenseValidationErrors } {
  const errors: ExpenseValidationErrors = {};

  if (!data.description || data.description.trim().length === 0) {
    errors.description = 'A descrição é obrigatória.';
  } else if (data.description.trim().length < 2) {
    errors.description = 'A descrição deve ter ao menos 2 caracteres.';
  }

  const numAmount = typeof data.amount === 'string' ? parseFloat(data.amount) : data.amount;
  if (isNaN(numAmount) || numAmount <= 0) {
    errors.amount = 'O valor deve ser maior que zero.';
  }

  if (!data.category || data.category.trim().length === 0) {
    errors.category = 'A categoria é obrigatória.';
  }

  if (!data.date || !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
    errors.date = 'Selecione uma data válida.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
