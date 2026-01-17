'use client';

import { PaymentProvider, usePayment } from './context/PaymentContext';
import { Step1 } from './components/Step1';
import { Step2 } from './components/Step2';
import { Step3 } from './components/Step3';
import { History } from './components/History';

function PaymentFlow() {
  const { step, setStep, showHistory } = usePayment();
  
  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    }
  };
  
  if (showHistory) {
    return (
      <div className="min-h-screen p-4 sm:p-8">
        <div className="max-w-md mx-auto">
          <History />
        </div>
      </div>
    );
  }
  
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
        
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <PaymentProvider>
      <PaymentFlow />
    </PaymentProvider>
  );
}
