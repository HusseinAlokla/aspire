// src/components/Auth.tsx
import { useState, type FormEvent } from 'react';

import { supabase } from '../lib/supabase.ts';   // ← fixes “Cannot find name 'supabase'”

export default function Auth() {
  /* keeps the email typed by the user */
  const [email, setEmail] = useState('');     // ← fixes the “No value exists in scope for 'email'” error
  /* lets us show a confirmation message after we send the link */
  const [sent, setSent] = useState(false);

  /** sends a magic-link email via Supabase */
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithOtp({
      email,                                     // shorthand works now because `email` is in scope
      options: {
        emailRedirectTo: 'http://localhost:5173' // must match “Site URL” or “Redirect URLs” in Auth → Settings
      }
    });

    if (error) {
      alert(error.message);
    } else {
      setSent(true);
    }
  };

  /* after the link is sent, tell the user to check their inbox */
  if (sent) return <p>Check your inbox to finish signing in.</p>;

  /* otherwise render the simple form */
  return (
    <form onSubmit={handleLogin} style={{ display: 'flex', gap: 8 }}>
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <button type="submit">Send magic link</button>
    </form>
  );
}
