import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useTranslation } from 'react-i18next';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

function ExpensePieChart({ transactions }) {
  const { t } = useTranslation();
  const expenses = transactions.filter(t => t.type === 'expense');

  const data = expenses.reduce((acc, t) => {
    const existing = acc.find(item => item.category === t.category);
    if (existing) {
      existing.value += t.amount;
    } else {
      acc.push({ category: t.category, value: t.amount });
    }
    return acc;
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400 backdrop-blur-md border border-white/20 dark:border-black/20 rounded-xl p-6 shadow-xl mb-6 hover:shadow-2xl hover:scale-105 transition-all duration-300">
      <h2 className="text-xl font-semibold mb-4">{t('expenseBreakdown')}</h2>
      {data.length === 0 ? (
        <p>{t('noExpenses')}</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value.toFixed(2)}৳`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default ExpensePieChart;
