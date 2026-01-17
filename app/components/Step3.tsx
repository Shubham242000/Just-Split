'use client';

import { usePayment } from '../context/PaymentContext';

export function Step3() {
  const { people, upiId, topic, amount } = usePayment();
  
  const generateMessage = (personName: string, personShare: number) => {
    const topicText = topic || 'expenses';
    return `Hey ${personName}! I paid ₹${amount} for ${topicText}.
Your share is ₹${personShare.toFixed(2)}.

Pay here:
upi://pay?pa=${upiId}&am=${personShare.toFixed(2)}&tn=${topicText}

- via https://just-split-seven.vercel.app/
`;
  };
  
  const handleShare = (personName: string, personShare: number) => {
    const message = generateMessage(personName, personShare);
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  };
  
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Share Messages</h1>
      
      <div className="space-y-3">
        {people.map((person, index) => (
          <div key={index} className="border border-gray-300 rounded p-4 space-y-3 bg-white">
            <div className="text-gray-900">
              <p className="font-bold text-lg">{person.name}</p>
              <p className="text-sm text-gray-600">Share: ₹{person.share.toFixed(2)}</p>
            </div>
            
            <textarea
              value={generateMessage(person.name, person.share)}
              readOnly
              rows={6}
              className="w-full border border-gray-300 rounded p-2 font-mono text-sm bg-gray-50 text-gray-900"
            />
            
            <button
              onClick={() => handleShare(person.name, person.share)}
              className="w-full bg-green-600 text-white rounded p-3 hover:bg-green-700"
            >
              Send to {person.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
