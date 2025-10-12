import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Summary from './components/Summary';
import PieChart from './components/PieChart';
import BarChart from './components/BarChart';
import ExportButton from './components/ExportButton';
import FileUpload from './components/FileUpload';

function App() {
  const { t, i18n } = useTranslation();
  const [transactions, setTransactions] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const stored = localStorage.getItem('transactions');
    if (stored) {
      setTransactions(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, { ...transaction, id: Date.now() }]);
  };

  const addTransactionsFromFile = (newTransactions) => {
    setTransactions([...transactions, ...newTransactions]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'bn' : 'en');
  };

  return (
    <div className={`min-h-screen p-4 transition-colors duration-300 ${theme === 'dark' ? 'bg-gradient-to-br from-slate-900 to-gray-800' : 'bg-gradient-to-br from-yellow-200 via-amber-300 to-yellow-400'}`}>
      {/* Watermark */}
      <div className="fixed inset-0 opacity-5 pointer-events-none z-0">
        <img src="/ChatGPT Image Oct 11, 2025, 11_38_56 AM.png" alt="Watermark" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-10 px-4">
          <img src="/ChatGPT Image Oct 11, 2025, 11_38_56 AM.png" alt="Logo" className="w-12 h-12" />
          <div className="flex-1 text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">{t('title')}</h1>
            <p className={`text-lg transition-colors ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{t('subtitle')}</p>
          </div>
          <div className="flex space-x-2">
            <button onClick={toggleTheme} className="p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button onClick={toggleLanguage} className="p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
              {i18n.language === 'en' ? 'বাং' : 'EN'}
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <TransactionForm onAdd={addTransaction} />
            <FileUpload onTransactionsAdd={addTransactionsFromFile} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <TransactionList transactions={transactions} onDelete={deleteTransaction} />
            </div>
            <div className="lg:col-span-2 space-y-6">
              <Summary transactions={transactions} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PieChart transactions={transactions} />
                <BarChart transactions={transactions} />
              </div>
              <ExportButton transactions={transactions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
