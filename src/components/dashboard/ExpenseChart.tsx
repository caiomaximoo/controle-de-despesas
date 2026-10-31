import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import { Category } from '../../types';
import { CATEGORY_COLORS } from '../../lib/constants';
import { formatCurrency } from '../../utils/formatters';

interface ExpenseChartProps {
  data: {
    category: Category;
    amount: number;
    count: number;
    percentage: number;
  }[];
}

export const ExpenseChart: React.FC<ExpenseChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-400">
        <p className="text-sm">Nenhuma despesa para exibir no período selecionado.</p>
      </div>
    );
  }

  const chartData = data.map((item) => ({
    name: item.category,
    value: item.amount,
    color: CATEGORY_COLORS[item.category]?.hex || '#64748b',
    percentage: item.percentage,
    count: item.count,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white px-3 py-2 rounded-lg text-xs shadow-lg border border-slate-700">
          <div className="font-semibold text-slate-200">{item.name}</div>
          <div className="text-brand-400 font-bold mt-0.5">{formatCurrency(item.value)}</div>
          <div className="text-slate-400 text-[11px] mt-0.5">
            {item.count} despesa{item.count > 1 ? 's' : ''} ({item.percentage.toFixed(1)}%)
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={95}
            paddingAngle={3}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => (
              <span className="text-xs font-medium text-slate-700">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
