'use client';

import { usePayment } from '../context/PaymentContext';

const UPI_REGEX = /^[\w.-]+@[\w.-]+$/;

export function Step2() {
  const { amount, people, setPeople, upiId, setUpiId, setStep } = usePayment();
  
  const isValidUpi = upiId.length > 0 && UPI_REGEX.test(upiId);
  const showValidation = upiId.length > 0;
  
  const updatePersonName = (index: number, name: string) => {
    const updated = [...people];
    updated[index].name = name;
    setPeople(updated);
  };
  
  const updatePersonShare = (index: number, share: string) => {
    const updated = [...people];
    updated[index].share = parseFloat(share) || 0;
    setPeople(updated);
  };
  
  const totalShares = people.reduce((sum, person) => sum + person.share, 0);
  const amountNum = parseFloat(amount);
  const isBalanced = Math.abs(totalShares - amountNum) < 0.01;
  
  const handleNext = () => {
    if (!upiId || !isValidUpi) {
      alert('Please enter a valid UPI ID');
      return;
    }
    
    if (!isBalanced) {
      alert('Total shares must equal the total amount');
      return;
    }
    
    const hasEmptyNames = people.some(p => !p.name.trim());
    if (hasEmptyNames) {
      alert('Please enter names for all people');
      return;
    }
    
    localStorage.setItem('upiId', upiId);
    setStep(3);
  };
  
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Payment Details</h1>
      
      <div className="bg-gray-100 p-4 rounded space-y-2 text-gray-900">
        <p><strong>Total Amount:</strong> ₹{amount}</p>
        <p><strong>Total Shares:</strong> ₹{totalShares.toFixed(2)} {!isBalanced && <span className="text-red-600">(Must equal ₹{amount})</span>}</p>
      </div>
      
      <div className="space-y-3">
        <h2 className="font-bold text-gray-900">People & Their Shares</h2>
        {people.map((person, index) => (
          <div key={index} className="border border-gray-300 rounded p-3 space-y-2 bg-white">
            <div>
              <label className="block text-sm mb-1 text-gray-700">Person {index + 1} Name</label>
              <input
                type="text"
                value={person.name}
                onChange={(e) => updatePersonName(index, e.target.value)}
                className="w-full border border-gray-300 rounded p-2 bg-white text-gray-900"
                placeholder="Enter name"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-700">Share Amount (₹)</label>
              <input
                type="number"
                value={person.share}
                onChange={(e) => updatePersonShare(index, e.target.value)}
                step="0.01"
                min="0"
                className="w-full border border-gray-300 rounded p-2 bg-white text-gray-900"
                placeholder="Enter share"
                required
              />
            </div>
          </div>
        ))}
      </div>
      
      <div>
        <label className="block mb-2 text-gray-900">Your UPI ID</label>
        <div className="relative">
          <input
            type="text"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 bg-white text-gray-900 pr-10"
            placeholder="yourname@upi"
            required
          />
          {showValidation && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {isValidUpi ? (
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
          )}
        </div>
        {showValidation && !isValidUpi && (
          <p className="text-red-600 text-sm mt-1">Invalid UPI ID format</p>
        )}
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
