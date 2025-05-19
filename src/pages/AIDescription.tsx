import { useState } from "react";
import axios from "axios";

export default function AIDescription() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    setDescription("");
    try {
      const res = await axios.post("http://localhost:8000/describe", { title, genre });
      setDescription(res.data.description);
    } catch (err) {
      setDescription("Failed to generate description.");
    }
    setLoading(false);
  };

  return (
    <section className="max-w-xl mx-auto text-center space-y-6">
      <h1 className="text-3xl font-bold text-blue-700">🧠 AI Description Generator</h1>
      <input
        className="border p-3 rounded w-full"
        placeholder="Enter a media title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="border p-3 rounded w-full"
        placeholder="Enter genre (e.g. Sci-Fi, Romance)..."
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      <button
        onClick={generate}
        disabled={loading}
        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
      >
        {loading ? "Generating..." : "🎨 Generate Description"}
      </button>
      {description && (
        <div className="mt-4 p-4 border bg-white shadow rounded text-left">
          <h2 className="font-semibold text-lg text-gray-800 mb-2">Generated Description:</h2>
          <p className="text-gray-700">{description}</p>
        </div>
      )}
    </section>
  );
}
