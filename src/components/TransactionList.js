import React from 'react';
import { useTranslation } from 'react-i18next';

function TransactionList({ transactions, onDelete }) {
  const { t, i18n, ready } = useTranslation();
  const currentLang = i18n.language;

  const categories = [
    { en: 'Job', bn: 'চাকরি' },
    { en: 'Business', bn: 'ব্যবসা' },
    { en: 'Others', bn: 'অন্যান্য' },
    { en: 'Food', bn: 'খাবার' },
    { en: 'Transport', bn: 'পরিবহন' },
    { en: 'Entertainment', bn: 'বিনোদন' },
    { en: 'Utilities', bn: 'সেবা সুবিধা' },
    { en: 'Healthcare', bn: 'স্বাস্থ্যসেবা' },
    { en: 'Other', bn: 'অন্যান্য' }
  ];

  const getCategoryText = (cat) => {
    const categoryObj = categories.find(c => c.en === cat);
    return currentLang === 'bn' ? categoryObj?.bn || cat : cat;
  };

  const translate = (key) => ready ? t(key) : key;

  return (
    <div className="bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400 backdrop-blur-md border border-white/20 dark:border-black/20 rounded-xl p-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
      <h2 className="text-xl font-semibold mb-4">{translate('transactions')}</h2>
      {transactions.length === 0 ? (
        <p>{translate('noTransactions')}</p>
      ) : (
        <ul>
          {transactions.map(transaction => (
            <li key={transaction.id} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <div>
                <span className={`font-medium ${transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {transaction.type === 'income' ? '+' : '-'}{transaction.amount.toFixed(2)}৳
                </span>
                <span className="ml-2 text-gray-600 dark:text-gray-300">{getCategoryText(transaction.category)} - {transaction.date}</span>
              </div>
              <button
                onClick={() => onDelete(transaction.id)}
                className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-800/30 px-3 py-1 rounded transition-all duration-200"
              >
                {translate('delete')}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TransactionList;
