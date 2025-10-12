import React from 'react';
import { useTranslation } from 'react-i18next';

function Summary({ transactions }) {
  const { t } = useTranslation();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyTransactions = transactions.filter(t => {
    const date = new Date(t.date);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });

  const income = monthlyTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = monthlyTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  return (
    <div className="bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400 backdrop-blur-md border border-white/20 dark:border-black/20 rounded-xl p-6 shadow-xl shadow-gray-200/50 dark:shadow-gray-800/50 mb-6 hover:shadow-2xl hover:scale-105 transition-all duration-300">
      <h2 className="text-xl font-semibold mb-4">{t('monthlySummary')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-100/80 to-green-200/80 dark:from-green-900/30 dark:to-green-800/30 p-4 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow duration-300 backdrop-blur-sm">
          <p className="text-green-700 dark:text-green-300 font-bold text-2xl">{income.toFixed(2)}৳</p>
          <p className="text-green-600 dark:text-green-400 font-medium">{t('incomeLabel')}</p>
        </div>
        <div className="bg-gradient-to-br from-red-100/80 to-red-200/80 dark:from-red-900/30 dark:to-red-800/30 p-4 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow duration-300 backdrop-blur-sm">
          <p className="text-red-700 dark:text-red-300 font-bold text-2xl">{expenses.toFixed(2)}৳</p>
          <p className="text-red-600 dark:text-red-400 font-medium">{t('expensesLabel')}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-100/80 to-blue-200/80 dark:from-blue-900/30 dark:to-blue-800/30 p-4 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow duration-300 backdrop-blur-sm">
          <p className={`font-bold text-2xl ${balance >= 0 ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
            {balance.toFixed(2)}৳
          </p>
          <p className="text-blue-600 dark:text-blue-400 font-medium">{t('balanceLabel')}</p>
        </div>
      </div>
    </div>
  );
}

export default Summary;
