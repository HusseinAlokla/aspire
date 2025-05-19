import { useEffect, useState, type ChangeEvent } from "react";
import axios from "axios";
import type { MediaItem } from "../types/MediaItem";

const API = "http://localhost:8000/media";

export default function Tracker() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [form, setForm] = useState<Omit<MediaItem, "id">>({
    title: "",
    creator: "",
    releaseDate: "",
    genre: "",
    status: "wishlist",
  });
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    axios.get(API).then(res => setMediaList(res.data));
  }, []);

  const resetForm = () => {
    setForm({ title: "", creator: "", releaseDate: "", genre: "", status: "wishlist" });
    setEditId(null);
    setIsEditing(false);
  };

  const saveMedia = () => {
    if (!form.title) return;
    const newItem = { ...form, id: editId ?? Date.now() };

    if (isEditing && editId !== null) {
      axios.put(`${API}/${editId}`, newItem).then(res => {
        setMediaList(mediaList.map(item => (item.id === editId ? res.data : item)));
        resetForm();
      });
    } else {
      axios.post(API, newItem).then(res => {
        setMediaList([...mediaList, res.data]);
        resetForm();
      });
    }
  };

  const deleteMedia = (id: number) => {
    axios.delete(`${API}/${id}`).then(() => {
      setMediaList(mediaList.filter(item => item.id !== id));
      if (editId === id) resetForm();
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const filteredMedia = mediaList.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.creator.toLowerCase().includes(search.toLowerCase()) ||
      item.genre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="max-w-6xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-blue-800">🎥 Media Tracker Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <input className="border p-3 rounded shadow-sm w-full" name="title" value={form.title} onChange={handleChange} placeholder="Title" />
        <input className="border p-3 rounded shadow-sm w-full" name="creator" value={form.creator} onChange={handleChange} placeholder="Creator" />
        <input className="border p-3 rounded shadow-sm w-full" name="releaseDate" value={form.releaseDate} onChange={handleChange} placeholder="Release Date" />
        <input className="border p-3 rounded shadow-sm w-full" name="genre" value={form.genre} onChange={handleChange} placeholder="Genre" />
        <select className="border p-3 rounded shadow-sm w-full" name="status" value={form.status} onChange={handleChange}>
          <option value="wishlist">Wishlist</option>
          <option value="owned">Owned</option>
          <option value="currently using">Currently Using</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
        <button
          onClick={saveMedia}
          className={`${
            isEditing ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'
          } text-white px-6 py-2 rounded transition shadow`}
        >
          {isEditing ? '💾 Update Media' : '➕ Add Media'}
        </button>

        <input
          className="border p-3 rounded shadow-sm flex-1"
          placeholder="🔍 Search by title, creator, or genre"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredMedia.map((item) => (
          <li key={item.id} className="border-l-4 border-blue-500 bg-white p-4 rounded shadow-sm">
            <div className="text-lg font-semibold text-blue-800">
              {item.title} <span className="text-sm text-gray-500">({item.releaseDate})</span>
            </div>
            <div className="text-gray-700">🎤 Creator: {item.creator}</div>
            <div className="text-gray-700">🎭 Genre: {item.genre}</div>
            <div className="text-sm text-gray-600">
              📌 Status: <span className="font-medium italic text-blue-600">{item.status}</span>
            </div>
            <div className="mt-2 flex gap-2">
              <button onClick={() => deleteMedia(item.id)} className="text-sm text-red-600 hover:underline">🗑️ Delete</button>
              <button
                onClick={() => {
                  setForm(item);
                  setEditId(item.id);
                  setIsEditing(true);
                }}
                className="text-sm text-blue-600 hover:underline"
              >
                ✏️ Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
