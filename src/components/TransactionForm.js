import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const incomeCategories = [
  { en: 'Job', bn: 'চাকরি' },
  { en: 'Business', bn: 'ব্যবসা' },
  { en: 'Others', bn: 'অন্যান্য' }
];

const expenseCategories = [
  { en: 'Food', bn: 'খাবার' },
  { en: 'Transport', bn: 'পরিবহন' },
  { en: 'Entertainment', bn: 'বিনোদন' },
  { en: 'Utilities', bn: 'সেবা সুবিধা' },
  { en: 'Healthcare', bn: 'স্বাস্থ্যসেবা' },
  { en: 'Other', bn: 'অন্যান্য' }
];

function TransactionForm({ onAdd }) {
  const { t, i18n } = useTranslation();
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(expenseCategories[0].en);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const currentCategories = type === 'income' ? incomeCategories : expenseCategories;
  const currentLang = i18n.language;

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setType(newType);
    // Reset category to first in new list
    setCategory(currentCategories[0].en);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) return;
    onAdd({ type, amount: parseFloat(amount), category, date });
    setAmount('');
  };

  return (
    <div className="bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400 backdrop-blur-md border border-white/20 dark:border-black/20 rounded-xl p-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
      <h2 className="text-xl font-semibold mb-4">{t('addTransaction')}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">{t('type')}</label>
          <select
            value={type}
            onChange={handleTypeChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white/20 dark:bg-black/20 text-gray-900 dark:text-gray-100"
          >
            <option value="income">{t('income')}</option>
            <option value="expense">{t('expense')}</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">{t('amount')}</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white/20 dark:bg-black/20 text-gray-900 dark:text-gray-100"
            placeholder="0.00"
            step="0.01"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">{t('category')}</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white/20 dark:bg-black/20 text-gray-900 dark:text-gray-100"
          >
            {currentCategories.map(cat => (
              <option key={cat.en} value={cat.en}>
                {currentLang === 'bn' ? cat.bn : cat.en}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">{t('date')}</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white/20 dark:bg-black/20 text-gray-900 dark:text-gray-100"
            required
          />
        </div>
        <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg">
          {t('addTransaction')}
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;
