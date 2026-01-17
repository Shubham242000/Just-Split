'use client';

import { usePayment, Transaction } from '../context/PaymentContext';
import { useState, useEffect } from 'react';

export function History() {
  const { setShowHistory, resetForm } = usePayment();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = () => {
    if (typeof window !== 'undefined') {
      const existing = localStorage.getItem('transactions');
      setTransactions(existing ? JSON.parse(existing) : []);
    }
  };

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleNewSplit = () => {
    resetForm();
    setShowHistory(false);
  };

  const togglePaidStatus = (txnId: string, personIndex: number) => {
    const updated = transactions.map(txn => {
      if (txn.id === txnId) {
        const updatedPeople = [...txn.people];
        updatedPeople[personIndex].paid = !updatedPeople[personIndex].paid;
        return { ...txn, people: updatedPeople };
      }
      return txn;
    });
    
    setTransactions(updated);
    localStorage.setItem('transactions', JSON.stringify(updated));
  };

  const sendReminder = (personName: string, personShare: number, txn: Transaction) => {
    const message = `Hey ${personName}! Reminder: I paid ₹${txn.amount} for ${txn.topic}.
Your share is ₹${personShare.toFixed(2)}.

Pay here:
upi://pay?pa=${txn.upiId}&am=${personShare.toFixed(2)}&tn=${txn.topic}

 via https://just-split-seven.vercel.app/
`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  };

  const clearHistory = () => {
    if (confirm('Are you sure you want to clear all transaction history? This cannot be undone.')) {
      localStorage.removeItem('transactions');
      setTransactions([]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
        <div className="flex gap-2">
          {transactions.length > 0 && (
            <button
              onClick={clearHistory}
              className="bg-red-600 text-white rounded px-4 py-2 hover:bg-red-700 text-sm"
            >
              Clear History
            </button>
          )}
          <button
            onClick={handleNewSplit}
            className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
          >
            New Split
          </button>
        </div>
      </div>

      {transactions.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>No transactions yet</p>
          <button
            onClick={handleNewSplit}
            className="mt-4 text-blue-600 hover:underline"
          >
            Create your first split
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {transactions.map((txn) => (
            <div key={txn.id} className="border border-gray-300 rounded p-4 bg-white">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{txn.topic}</h3>
                  <p className="text-sm text-gray-500">{formatDate(txn.date)}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-gray-900">₹{txn.amount}</p>
                  <p className="text-sm text-gray-500">{txn.people.length + 1} people total</p>
                </div>
              </div>

              <div className="space-y-2">
                {txn.people.map((person, idx) => (
                  <div
                    key={idx}
                    className={`border rounded p-3 transition-colors ${
                      person.paid ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <p className="text-gray-900 font-medium">{person.name}</p>
                        <p className="text-sm text-gray-600">₹{person.share.toFixed(2)}</p>
                      </div>
                      <button
                        onClick={() => togglePaidStatus(txn.id, idx)}
                        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                          person.paid
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {person.paid ? '✓ Paid' : 'Mark Paid'}
                      </button>
                    </div>
                    
                    {!person.paid && (
                      <button
                        onClick={() => sendReminder(person.name, person.share, txn)}
                        className="w-full bg-blue-600 text-white rounded p-2 text-sm hover:bg-blue-700"
                      >
                        Send Reminder to {person.name}
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500">UPI: {txn.upiId}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
