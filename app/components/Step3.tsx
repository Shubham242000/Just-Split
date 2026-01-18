'use client';

import { usePayment } from '../context/PaymentContext';
import { useEffect } from 'react';

export function Step3() {
  const { people, setPeople, upiId, topic, amount, saveTransaction } = usePayment();
  
  const generateMessage = (personName: string, personShare: number) => {
    const topicText = topic || 'expenses';
    const encodedTopic = encodeURIComponent(topicText);
    const upiLink = `upi://pay?pa=${upiId}&am=${personShare.toFixed(2)}&cu=INR&tn=${encodedTopic}`;
    
    return `Hey ${personName}! I paid ₹${amount} for ${topicText}.
Your share is ₹${personShare.toFixed(2)}.

Pay here:
${upiLink}

 via https://just-split-seven.vercel.app/
`;
  };
  
  const handleShare = (personName: string, personShare: number) => {
    const message = generateMessage(personName, personShare);
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  };
  
  const togglePaid = (index: number) => {
    const updated = [...people];
    updated[index].paid = !updated[index].paid;
    setPeople(updated);
  };
  
  useEffect(() => {
    saveTransaction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Share Messages</h1>
      
      <div className="space-y-3">
        {people.map((person, index) => (
          <div 
            key={index} 
            className={`border rounded p-4 space-y-3 transition-colors ${
              person.paid 
                ? 'bg-green-50 border-green-300' 
                : 'bg-white border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-gray-900">
                <p className="font-bold text-lg">{person.name}</p>
                <p className="text-sm text-gray-600">Share: ₹{person.share.toFixed(2)}</p>
              </div>
              
              <button
                onClick={() => togglePaid(index)}
                className={`px-4 py-2 rounded font-medium transition-colors ${
                  person.paid
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {person.paid ? '✓ Paid' : 'Mark Paid'}
              </button>
            </div>
            
            <textarea
              value={generateMessage(person.name, person.share)}
              readOnly
              rows={6}
              className="w-full border border-gray-300 rounded p-2 font-mono text-sm bg-gray-50 text-gray-900"
            />
            
            <button
              onClick={() => handleShare(person.name, person.share)}
              className="w-full bg-blue-600 text-white rounded p-3 hover:bg-blue-700"
            >
              Send to {person.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
