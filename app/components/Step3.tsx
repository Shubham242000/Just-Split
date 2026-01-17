export function Step3({
  message,
  setMessage,
  onShare,
}: {
  message: string;
  setMessage: (v: string) => void;
  onShare: () => void;
}) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Share Message</h1>
      
      <div>
        <label className="block mb-2 text-gray-900">Message (editable)</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={8}
          className="w-full border border-gray-300 rounded p-2 font-mono text-sm bg-white text-gray-900"
        />
      </div>
      
      <button
        onClick={onShare}
        className="w-full bg-green-600 text-white rounded p-3 mt-4 hover:bg-green-700"
      >
        Share on WhatsApp
      </button>
    </div>
  );
}
