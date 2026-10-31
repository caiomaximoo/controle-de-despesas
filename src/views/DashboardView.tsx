import React, { useState, useEffect } from 'react';
import { Card } from '../components/common/Card';
import { StatCard } from '../components/dashboard/StatCard';
import { ExpenseChart } from '../components/dashboard/ExpenseChart';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ExpenseFormModal } from '../components/expenses/ExpenseFormModal';
import { ExpenseDetailModal } from '../components/expenses/ExpenseDetailModal';
import { useAuth } from '../contexts/AuthContext';
import { expenseService } from '../services/expenseService';
import { Expense, Category } from '../types';
import { formatCurrency, formatDate } from '../utils/formatters';
import { translateErrorMessage } from '../utils/errorMessages';
import {
  DollarSign,
  Receipt,
  TrendingDown,
  Plus,
  ArrowRight,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const DashboardView: React.FC = () => {
  const { user, isConfigured } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  // Período padrão: mês atual
  const [currentDate, setCurrentDate] = useState(new Date());

  const getMonthRange = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const lastDay = new Date(year, date.getMonth() + 1, 0).getDate();
    return {
      start: `${year}-${month}-01`,
      end: `${year}-${month}-${String(lastDay).padStart(2, '0')}`,
    };
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const selectedMonthRange = getMonthRange(currentDate);
  const formattedMonthLabel = currentDate.toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  });

  const fetchDashboardData = async () => {
    if (!user) return;
    setLoading(true);
    setErrorMessage(null);

    const { data, error } = await expenseService.getExpenses({
      startDate: selectedMonthRange.start,
      endDate: selectedMonthRange.end,
      sortBy: 'date',
      sortOrder: 'desc',
    });

    if (error) {
      setErrorMessage(translateErrorMessage(error));
    } else {
      setExpenses(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user, selectedMonthRange]);

  // Cálculos de indicadores
  const totalAmount = expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const totalCount = expenses.length;

  // Agrupamento por categoria
  const categoryMap: { [key: string]: { amount: number; count: number } } = {};
  expenses.forEach((item) => {
    if (!categoryMap[item.category]) {
      categoryMap[item.category] = { amount: 0, count: 0 };
    }
    categoryMap[item.category].amount += Number(item.amount);
    categoryMap[item.category].count += 1;
  });

  const categorySummary = Object.entries(categoryMap).map(([category, info]) => ({
    category: category as Category,
    amount: info.amount,
    count: info.count,
    percentage: totalAmount > 0 ? (info.amount / totalAmount) * 100 : 0,
  }));

  // Ordena maior categoria para menor
  categorySummary.sort((a, b) => b.amount - a.amount);
  const topCategory = categorySummary[0] || null;

  const handleAddExpense = async (formData: {
    description: string;
    amount: number;
    category: Category;
    date: string;
    notes?: string | null;
  }) => {
    if (!user) return;
    const { error } = await expenseService.createExpense({
      ...formData,
      user_id: user.id,
    });
    if (!error) {
      setIsAddModalOpen(false);
      fetchDashboardData();
    } else {
      alert(translateErrorMessage(error));
    }
  };

  return (
    <div className="space-y-6">
      {/* Alerta de configuração do Supabase, se ausente */}
      {!isConfigured && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-sm">
            <h4 className="font-semibold text-amber-900">Configuração do Supabase pendente</h4>
            <p className="text-amber-800 text-xs mt-0.5">
              Defina as variáveis <code className="font-mono bg-amber-100 px-1 py-0.5 rounded">VITE_SUPABASE_URL</code> e <code className="font-mono bg-amber-100 px-1 py-0.5 rounded">VITE_SUPABASE_ANON_KEY</code> no arquivo <code className="font-mono bg-amber-100 px-1 py-0.5 rounded">.env</code> para sincronização com o banco de dados.
            </p>
          </div>
        </div>
      )}

      {/* Cabeçalho do Dashboard */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs sm:text-sm text-slate-500 capitalize">
              {formattedMonthLabel}
            </span>
            <div className="inline-flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden shadow-xs">
              <button
                onClick={handlePrevMonth}
                title="Mês anterior"
                className="p-1 hover:bg-slate-50 text-slate-600 border-r border-slate-200"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleNextMonth}
                title="Próximo mês"
                className="p-1 hover:bg-slate-50 text-slate-600"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="primary"
            onClick={() => setIsAddModalOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Nova Despesa
          </Button>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-sm">
          {errorMessage}
        </div>
      )}

      {/* Indicadores / Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title="Total no Mês"
          value={formatCurrency(totalAmount)}
          subtitle={`${totalCount} lançamento${totalCount === 1 ? '' : 's'}`}
          icon={<DollarSign className="w-6 h-6" />}
          iconBgColor="bg-brand-50"
          iconColor="text-brand-600"
        />

        <StatCard
          title="Quantidade de Despesas"
          value={totalCount}
          subtitle="Registros no período"
          icon={<Receipt className="w-6 h-6" />}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />

        <StatCard
          title="Maior Categoria"
          value={topCategory ? topCategory.category : '—'}
          subtitle={
            topCategory
              ? `${formatCurrency(topCategory.amount)} (${topCategory.percentage.toFixed(0)}%)`
              : 'Sem registros'
          }
          icon={<TrendingDown className="w-6 h-6" />}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-600"
        />
      </div>

      {/* Seção Gráfico e Despesas Recentes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Gráfico de Gastos por Categoria */}
        <div className="lg:col-span-5">
          <Card
            title="Gastos por Categoria"
            subtitle="Distribuição percentual das despesas"
            className="h-full"
          >
            <ExpenseChart data={categorySummary} />
          </Card>
        </div>

        {/* Lista de Despesas Recentes */}
        <div className="lg:col-span-7">
          <Card
            title="Despesas Recentes"
            subtitle="Últimos lançamentos registrados"
            action={
              <Link
                to="/despesas"
                className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1 hover:underline"
              >
                Ver todas <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            }
            className="h-full"
          >
            {loading ? (
              <div className="animate-pulse space-y-3 py-4">
                <div className="h-10 bg-slate-100 rounded-lg"></div>
                <div className="h-10 bg-slate-100 rounded-lg"></div>
                <div className="h-10 bg-slate-100 rounded-lg"></div>
              </div>
            ) : expenses.length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                <p className="text-sm">Nenhuma despesa recente encontrada.</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddModalOpen(true)}
                  className="mt-3"
                >
                  Cadastrar primeira despesa
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 -mx-5 -mb-5">
                {expenses.slice(0, 5).map((expense) => (
                  <div
                    key={expense.id}
                    onClick={() => setSelectedExpense(expense)}
                    className="flex items-center justify-between px-5 py-3 hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <div className="min-w-0 pr-3">
                      <p className="text-sm font-medium text-slate-900 truncate">
                        {expense.description}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge category={expense.category} size="sm" />
                        <span className="text-xs text-slate-400">
                          {formatDate(expense.date)}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-slate-900 whitespace-nowrap">
                      {formatCurrency(expense.amount)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Modal para adicionar nova despesa */}
      <ExpenseFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddExpense}
      />

      {/* Modal para visualização rápida de detalhes */}
      <ExpenseDetailModal
        isOpen={Boolean(selectedExpense)}
        onClose={() => setSelectedExpense(null)}
        expense={selectedExpense}
      />
    </div>
  );
};
