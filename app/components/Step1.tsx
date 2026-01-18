'use client';

import { usePayment } from '../context/PaymentContext';
import Image from 'next/image';

export function Step1() {
  const { amount, setAmount, topic, setTopic, numberOfPeople, setNumberOfPeople, setStep, setPeople, setShowHistory } = usePayment();
  
  const handleNext = () => {
    const amt = parseFloat(amount);
    const numPeople = parseInt(numberOfPeople);
    
    if (!amount || amt < 1) {
      alert('Please enter an amount of at least 1');
      return;
    }
    
    if (!numberOfPeople || numPeople < 2) {
      alert('Number of people must be at least 2');
      return;
    }
    
    // Only n-1 people need to pay (excluding the person who paid)
    const numPeopleToPay = numPeople - 1;
    const perPerson = amt / numPeople;
    
    // Initialize people array with equal shares (excluding the payer)
    const initialPeople = Array.from({ length: numPeopleToPay }, () => ({
      name: '',
      share: perPerson,
      paid: false,
    }));
    
    setPeople(initialPeople);
    setStep(2);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center mb-6">
        <Image 
          src="/logo.png" 
          alt="JustSplit Logo" 
          width={120} 
          height={120}
          priority
        />
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Split Payment</h1>
        <button
          onClick={() => setShowHistory(true)}
          className="text-blue-600 hover:underline text-sm"
        >
          View History
        </button>
      </div>
      
      <div>
        <label className="block mb-2 text-gray-900">Amount (₹)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
          className="w-full border border-gray-300 rounded p-2 bg-white text-gray-900"
          placeholder="Enter amount"
          required
        />
      </div>
      
      <div>
        <label className="block mb-2 text-gray-900">Topic (optional)</label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 bg-white text-gray-900"
          placeholder="e.g. Dinner, Movie"
        />
      </div>
      
      <div>
        <label className="block mb-2 text-gray-900">Number of People (including you)</label>
        <input
          type="number"
          value={numberOfPeople}
          onChange={(e) => setNumberOfPeople(e.target.value)}
          min="2"
          className="w-full border border-gray-300 rounded p-2 bg-white text-gray-900"
          placeholder="Total people including you"
          required
        />
        <p className="text-xs text-gray-500 mt-1">You&apos;ll enter details for {numberOfPeople && parseInt(numberOfPeople) > 1 ? parseInt(numberOfPeople) - 1 : 'other'} {numberOfPeople && parseInt(numberOfPeople) === 2 ? 'person' : 'people'} who need to pay</p>
      </div>
      
      <button
        onClick={handleNext}
        className="w-full bg-blue-600 text-white rounded p-3 mt-4 hover:bg-blue-700"
      >
        Next
      </button>
    </div>
  );
}
