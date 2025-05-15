import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { supabase } from '../lib/supabase';

type Media = {
  id: string;
  title: string;
  creator: string | null;
  media_type: 'movie' | 'music' | 'game';
  status: 'owned' | 'wishlist' | 'using' | 'completed';
};

export default function Dashboard() {
  /* state */
  const [items, setItems] = useState<Media[]>([]);
  const [form, setForm] = useState<Omit<Media, 'id'>>({
    title: '',
    creator: '',
    media_type: 'movie',
    status: 'owned',
  });

  /* read on mount + after every mutating op */
  const fetchItems = async () => {
    const { data, error } = await supabase.from('media').select('*').order('created_at', { ascending: false });
    if (error) console.error(error);
    else setItems(data as Media[]);
  };
  useEffect(() => { fetchItems(); }, []);

  /* insert */
  const addItem = async (e: FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('media').insert([form]);
    if (!error) {
      setForm({ title: '', creator: '', media_type: 'movie', status: 'owned' });
      fetchItems();
    } else alert(error.message);
  };

  /* delete */
  const remove = async (id: string) => {
    await supabase.from('media').delete().eq('id', id);
    fetchItems();
  };

  return (
    <>
      {/* add form */}
      <form onSubmit={addItem} style={{ marginBottom: 24, display: 'flex', gap: 8 }}>
        <input  value={form.title}    placeholder="Title"    required
                onChange={e => setForm({ ...form, title: e.target.value })} />
        <input  value={form.creator ?? ''}  placeholder="Creator"
                onChange={e => setForm({ ...form, creator: e.target.value })} />
        <select value={form.media_type} onChange={e => setForm({ ...form, media_type: e.target.value as any })}>
          <option value="movie">Movie</option>
          <option value="music">Music</option>
          <option value="game">Game</option>
        </select>
        <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as any })}>
          <option value="owned">Owned</option>
          <option value="wishlist">Wishlist</option>
          <option value="using">Using</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit">Add</button>
      </form>

      {/* list */}
      <ul>
        {items.map(m => (
          <li key={m.id}>
            <b>{m.title}</b> – {m.media_type} ({m.status})
            <button onClick={() => remove(m.id)} style={{ marginLeft: 8 }}>×</button>
          </li>
        ))}
      </ul>
    </>
  );
}
