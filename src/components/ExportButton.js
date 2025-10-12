import React from 'react';
import { useTranslation } from 'react-i18next';

function ExportButton({ transactions }) {
  const { t } = useTranslation();
  const exportToCSV = () => {
    if (transactions.length === 0) return;

    const headers = [t('typeLabel'), t('amountLabel'), t('categoryLabel'), t('dateLabel')];
    const csvContent = [
      headers.join(','),
      ...transactions.map(t => [t.type, t.amount, t.category, t.date].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'transactions.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400 backdrop-blur-md border border-white/20 dark:border-black/20 rounded-xl p-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
      <h2 className="text-xl font-semibold mb-4">{t('exportHistory')}</h2>
      <button
        onClick={exportToCSV}
        className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white p-3 rounded-lg font-semibold hover:from-green-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={transactions.length === 0}
      >
        {t('exportToCSV')}
      </button>
    </div>
  );
}

export default ExportButton;
