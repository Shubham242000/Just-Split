const UPI_REGEX = /^[\w.-]+@[\w.-]+$/;

export function Step2({
  amount,
  numberOfPeople,
  perPersonAmount,
  upiId,
  setUpiId,
  onGenerate,
}: {
  amount: string;
  numberOfPeople: string;
  perPersonAmount: number;
  upiId: string;
  setUpiId: (v: string) => void;
  onGenerate: () => void;
}) {
  const isValidUpi = upiId.length > 0 && UPI_REGEX.test(upiId);
  const showValidation = upiId.length > 0;
  
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Payment Details</h1>
      
      <div className="bg-gray-100 p-4 rounded space-y-2 text-gray-900">
        <p><strong>Total Amount:</strong> ₹{amount}</p>
        <p><strong>Number of People:</strong> {numberOfPeople}</p>
        <p><strong>Per Person:</strong> ₹{perPersonAmount.toFixed(2)}</p>
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
        onClick={onGenerate}
        className="w-full bg-blue-600 text-white rounded p-3 mt-4 hover:bg-blue-700"
      >
        Generate WhatsApp Message
      </button>
    </div>
  );
}
