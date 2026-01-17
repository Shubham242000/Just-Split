'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Step = 1 | 2 | 3;

export interface Person {
  name: string;
  share: number;
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
