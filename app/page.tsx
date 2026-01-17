'use client';

import { PaymentProvider, usePayment } from './context/PaymentContext';
import { Step1 } from './components/Step1';
import { Step2 } from './components/Step2';
import { Step3 } from './components/Step3';

function PaymentFlow() {
  const { step, setStep } = usePayment();
  
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
        
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-center text-gray-600 text-sm mt-4">
        <a href="https://github.com/Shubham242000" className="hover:text-gray-900">
          {/* github logo */}
          Shubham242000
        </a>
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
