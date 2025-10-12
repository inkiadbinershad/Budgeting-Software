import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';

function IncomeExpenseBarChart({ transactions }) {
  const { t } = useTranslation();
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const data = [
    { name: t('incomeLabel'), value: income },
    { name: t('expensesLabel'), value: expenses },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400 backdrop-blur-md border border-white/20 dark:border-black/20 rounded-xl p-6 shadow-xl mb-6 hover:shadow-2xl hover:scale-105 transition-all duration-300">
      <h2 className="text-xl font-semibold mb-4">{t('incomeVsExpenses')}</h2>
      {transactions.length === 0 ? (
        <p>{t('noData')}</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => `${value.toFixed(2)}৳`} />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default IncomeExpenseBarChart;
