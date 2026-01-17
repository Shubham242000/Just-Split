'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Step = 1 | 2 | 3;

export interface Person {
  name: string;
  share: number;
  paid: boolean;
}

export interface Transaction {
  id: string;
  date: string;
  amount: string;
  topic: string;
  upiId: string;
  people: Person[];
}

interface PaymentContextType {
  step: Step;
  setStep: (step: Step) => void;
  amount: string;
  setAmount: (amount: string) => void;
  topic: string;
  setTopic: (topic: string) => void;
  numberOfPeople: string;
  setNumberOfPeople: (numberOfPeople: string) => void;
  upiId: string;
  setUpiId: (upiId: string) => void;
  people: Person[];
  setPeople: (people: Person[]) => void;
  showHistory: boolean;
  setShowHistory: (show: boolean) => void;
  saveTransaction: () => void;
  getTransactions: () => Transaction[];
  resetForm: () => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export function PaymentProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<Step>(1);
  const [amount, setAmount] = useState('');
  const [topic, setTopic] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [upiId, setUpiId] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('upiId') || '';
    }
    return '';
  });
  const [people, setPeople] = useState<Person[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const saveTransaction = () => {
    if (typeof window !== 'undefined') {
      const transaction: Transaction = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        amount,
        topic: topic || 'expenses',
        upiId,
        people: [...people],
      };

      const existing = localStorage.getItem('transactions');
      const transactions: Transaction[] = existing ? JSON.parse(existing) : [];
      transactions.unshift(transaction);
      localStorage.setItem('transactions', JSON.stringify(transactions));
    }
  };

  const getTransactions = (): Transaction[] => {
    if (typeof window !== 'undefined') {
      const existing = localStorage.getItem('transactions');
      return existing ? JSON.parse(existing) : [];
    }
    return [];
  };

  const resetForm = () => {
    setStep(1);
    setAmount('');
    setTopic('');
    setNumberOfPeople('');
    setPeople([]);
  };

  return (
    <PaymentContext.Provider
      value={{
        step,
        setStep,
        amount,
        setAmount,
        topic,
        setTopic,
        numberOfPeople,
        setNumberOfPeople,
        upiId,
        setUpiId,
        people,
        setPeople,
        showHistory,
        setShowHistory,
        saveTransaction,
        getTransactions,
        resetForm,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
}

export function usePayment() {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within PaymentProvider');
  }
  return context;
}
