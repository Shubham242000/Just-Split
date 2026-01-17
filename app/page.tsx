'use client';

import { useState } from 'react';
import { Step1 } from './components/Step1';
import { Step2 } from './components/Step2';
import { Step3 } from './components/Step3';

export default function Home() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  
  const [amount, setAmount] = useState('');
  const [topic, setTopic] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');
  
  const [upiId, setUpiId] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('upiId') || '';
    }
    return '';
  });
  const [perPersonAmount, setPerPersonAmount] = useState(0);
  
  const [message, setMessage] = useState('');
  
  const handleStep1Next = () => {
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
    setPerPersonAmount(perPerson);
    setStep(2);
  };
  
  const handleStep2Generate = () => {
    if (!upiId) {
      alert('Please enter a UPI ID');
      return;
    }
    
    localStorage.setItem('upiId', upiId);
    
    const topicText = topic || 'expenses';
    const msg = `Hey! I paid ₹${amount} for ${topicText}.
Your share is ₹${perPersonAmount.toFixed(2)}.

Pay here:
https://upi.link/pay?pa=${upiId}@ptaxis&am=${perPersonAmount.toFixed(2)}&tn=${topicText}`;

// https://upi.link/pay?pa=9425609498@ptaxis&am=400&tn=expenses
    
    setMessage(msg);
    setStep(3);
  };
  
  const handleShareWhatsApp = () => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  };
  
  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    }
  };
  
  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-md mx-auto">
        <button
          onClick={handleBack}
          className={`flex items-center gap-2 text-gray-600 hover:text-gray-900 text-lg p-2 -ml-2 ${
            step === 1 ? 'invisible h-0' : 'mb-6'
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        
        {step === 1 && (
          <Step1
            amount={amount}
            setAmount={setAmount}
            topic={topic}
            setTopic={setTopic}
            numberOfPeople={numberOfPeople}
            setNumberOfPeople={setNumberOfPeople}
            onNext={handleStep1Next}
          />
        )}
        
        {step === 2 && (
          <Step2
            amount={amount}
            numberOfPeople={numberOfPeople}
            perPersonAmount={perPersonAmount}
            upiId={upiId}
            setUpiId={setUpiId}
            onGenerate={handleStep2Generate}
          />
        )}
        
        {step === 3 && (
          <Step3
            message={message}
            setMessage={setMessage}
            onShare={handleShareWhatsApp}
          />
        )}
      </div>
    </div>
  );
}
