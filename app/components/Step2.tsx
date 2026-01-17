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
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-6">Payment Details</h1>
      
      <div className="bg-gray-100 p-4 rounded space-y-2">
        <p><strong>Total Amount:</strong> ₹{amount}</p>
        <p><strong>Number of People:</strong> {numberOfPeople}</p>
        <p><strong>Per Person:</strong> ₹{perPersonAmount.toFixed(2)}</p>
      </div>
      
      <div>
        <label className="block mb-2">Your UPI ID</label>
        <input
          type="text"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
          placeholder="yourname@upi"
          required
        />
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
