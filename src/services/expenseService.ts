import { supabase } from '../lib/supabase';
import { Expense, ExpenseFilters } from '../types';

export const expenseService = {
  async getExpenses(filters?: ExpenseFilters): Promise<{ data: Expense[]; error: Error | null }> {
    try {
      let query = supabase
        .from('expenses')
        .select('*');

      if (filters?.category && filters.category !== 'Todas') {
        query = query.eq('category', filters.category);
      }

      if (filters?.startDate) {
        query = query.gte('date', filters.startDate);
      }

      if (filters?.endDate) {
        query = query.lte('date', filters.endDate);
      }

      const sortBy = filters?.sortBy || 'date';
      const isAsc = filters?.sortOrder === 'asc';
      query = query.order(sortBy, { ascending: isAsc });

      // Se ordenar por data, desempata por created_at desc
      if (sortBy === 'date') {
        query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query;

      if (error) {
        return { data: [], error: new Error(error.message) };
      }

      let result = (data || []) as Expense[];

      // Filtro de texto em memória para descrição ou observações
      if (filters?.searchQuery && filters.searchQuery.trim() !== '') {
        const queryTerm = filters.searchQuery.toLowerCase().trim();
        result = result.filter(
          (item) =>
            item.description.toLowerCase().includes(queryTerm) ||
            (item.notes && item.notes.toLowerCase().includes(queryTerm))
        );
      }

      return { data: result, error: null };
    } catch (err: any) {
      return { data: [], error: err };
    }
  },

  async createExpense(
    expense: {
      description: string;
      amount: number;
      category: string;
      date: string;
      notes?: string | null;
      user_id: string;
    }
  ): Promise<{ data: Expense | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('expenses')
        .insert([
          {
            description: expense.description.trim(),
            amount: Number(expense.amount),
            category: expense.category,
            date: expense.date,
            notes: expense.notes?.trim() || null,
            user_id: expense.user_id,
          },
        ])
        .select()
        .single();

      if (error) return { data: null, error: new Error(error.message) };
      return { data: data as Expense, error: null };
    } catch (err: any) {
      return { data: null, error: err };
    }
  },

  async updateExpense(
    id: string,
    updates: Partial<{
      description: string;
      amount: number;
      category: string;
      date: string;
      notes: string | null;
    }>
  ): Promise<{ data: Expense | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('expenses')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) return { data: null, error: new Error(error.message) };
      return { data: data as Expense, error: null };
    } catch (err: any) {
      return { data: null, error: err };
    }
  },

  async deleteExpense(id: string): Promise<{ error: Error | null }> {
    try {
      const { error } = await supabase
        .from('expenses')
        .delete()
        .eq('id', id);

      if (error) return { error: new Error(error.message) };
      return { error: null };
    } catch (err: any) {
      return { error: err };
    }
  },
};
