'use client';

import { usePayment } from '../context/PaymentContext';

export function Step1() {
  const { amount, setAmount, topic, setTopic, numberOfPeople, setNumberOfPeople, setStep, setPeople } = usePayment();
  
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
    
    const perPerson = amt / numPeople;
    
    // Initialize people array with equal shares
    const initialPeople = Array.from({ length: numPeople }, (_, i) => ({
      name: '',
      share: perPerson,
    }));
    
    setPeople(initialPeople);
    setStep(2);
  };
  
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Split Payment</h1>
      
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
        <label className="block mb-2 text-gray-900">Number of People</label>
        <input
          type="number"
          value={numberOfPeople}
          onChange={(e) => setNumberOfPeople(e.target.value)}
          min="2"
          className="w-full border border-gray-300 rounded p-2 bg-white text-gray-900"
          placeholder="Enter number of people"
          required
        />
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
