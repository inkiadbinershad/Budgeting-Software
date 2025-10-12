import React, { useState } from 'react';
import Papa from 'papaparse';
import { pdfjs } from 'react-pdf';
import { useTranslation } from 'react-i18next';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function FileUpload({ onTransactionsAdd }) {
  const { t } = useTranslation();
  const [file, setFile] = useState(null);
  const [parsing, setParsing] = useState(false);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;
    setFile(uploadedFile);
    setParsing(true);

    if (uploadedFile.name.endsWith('.csv')) {
      Papa.parse(uploadedFile, {
        header: true,
        complete: (results) => {
          const newTransactions = [];
          results.data.forEach(row => {
            const income = parseFloat(row.Mthly_HH_Income);
            const expense = parseFloat(row.Mthly_HH_Expense);
            const currentDate = new Date().toISOString().split('T')[0];
            if (!isNaN(income) && income > 0) {
              newTransactions.push({
                type: 'income',
                amount: income,
                category: 'Job',
                date: currentDate,
                id: Date.now() + Math.random()
              });
            }
            if (!isNaN(expense) && expense > 0) {
              newTransactions.push({
                type: 'expense',
                amount: expense,
                category: 'Other',
                date: currentDate,
                id: Date.now() + Math.random()
              });
            }
          });
          onTransactionsAdd(newTransactions);
          setParsing(false);
        }
      });
    } else if (uploadedFile.name.endsWith('.pdf')) {
      // Simple PDF text extraction - assumes format like "Type: income, Amount: 100, Category: Food, Date: 2023-01-01"
      const reader = new FileReader();
      reader.onload = async (e) => {
        const typedArray = new Uint8Array(e.target.result);
        const pdf = await pdfjs.getDocument({ data: typedArray }).promise;
        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map(item => item.str).join(' ');
          fullText += pageText + '\n';
        }
        // Basic parsing - this is simplistic; adjust based on PDF format
        const lines = fullText.split('\n').filter(line => line.includes('Type:') || line.includes('Amount:'));
        const newTransactions = [];
        for (let i = 0; i < lines.length; i += 4) {
          if (lines[i] && lines[i+1] && lines[i+2] && lines[i+3]) {
            newTransactions.push({
              type: lines[i].match(/Type:\s*(\w+)/)?.[1]?.toLowerCase() || 'expense',
              amount: parseFloat(lines[i+1].match(/Amount:\s*([\d.]+)/)?.[1]) || 0,
              category: lines[i+2].match(/Category:\s*(\w+)/)?.[1] || 'Other',
              date: lines[i+3].match(/Date:\s*([\d-]+)/)?.[1] || new Date().toISOString().split('T')[0],
              id: Date.now() + Math.random()
            });
          }
        }
        onTransactionsAdd(newTransactions);
        setParsing(false);
      };
      reader.readAsArrayBuffer(uploadedFile);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400 backdrop-blur-md border border-white/20 dark:border-black/20 rounded-xl p-6 shadow-xl shadow-gray-200/50 dark:shadow-gray-800/50 hover:shadow-2xl hover:scale-105 transition-all duration-300">
      <h3 className="text-lg font-semibold mb-4">{t('uploadFile')}</h3>
      <input
        type="file"
        accept=".csv,.pdf"
        onChange={handleFileUpload}
        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white/20 dark:bg-black/20"
      />
      {parsing && <p className="mt-2 text-sm">Parsing file...</p>}
    </div>
  );
}

export default FileUpload;
