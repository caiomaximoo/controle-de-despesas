export type Category =
  | 'Alimentação'
  | 'Transporte'
  | 'Moradia'
  | 'Saúde'
  | 'Educação'
  | 'Lazer'
  | 'Compras'
  | 'Contas e serviços'
  | 'Outros';

export interface Expense {
  id: string;
  user_id: string;
  description: string;
  amount: number;
  category: Category;
  date: string; // Formato YYYY-MM-DD
  notes?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Profile {
  id: string;
  name: string;
  created_at?: string;
}

export interface ExpenseFilters {
  startDate?: string;
  endDate?: string;
  category?: Category | 'Todas';
  searchQuery?: string;
  sortBy?: 'date' | 'amount';
  sortOrder?: 'asc' | 'desc';
}

export interface ExpenseSummary {
  totalAmount: number;
  totalCount: number;
  byCategory: {
    category: Category;
    amount: number;
    count: number;
    percentage: number;
  }[];
}
