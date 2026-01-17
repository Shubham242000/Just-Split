export function Step1({
  amount,
  setAmount,
  topic,
  setTopic,
  numberOfPeople,
  setNumberOfPeople,
  onNext,
}: {
  amount: string;
  setAmount: (v: string) => void;
  topic: string;
  setTopic: (v: string) => void;
  numberOfPeople: string;
  setNumberOfPeople: (v: string) => void;
  onNext: () => void;
}) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-6">Split Payment</h1>
      
      <div>
        <label className="block mb-2">Amount (₹)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
          className="w-full border border-gray-300 rounded p-2"
          placeholder="Enter amount"
          required
        />
      </div>
      
      <div>
        <label className="block mb-2">Topic (optional)</label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
          placeholder="e.g. Dinner, Movie"
        />
      </div>
      
      <div>
        <label className="block mb-2">Number of People</label>
        <input
          type="number"
          value={numberOfPeople}
          onChange={(e) => setNumberOfPeople(e.target.value)}
          min="2"
          className="w-full border border-gray-300 rounded p-2"
          placeholder="Enter number of people"
          required
        />
      </div>
      
      <button
        onClick={onNext}
        className="w-full bg-blue-600 text-white rounded p-3 mt-4 hover:bg-blue-700"
      >
        Next
      </button>
    </div>
  );
}
