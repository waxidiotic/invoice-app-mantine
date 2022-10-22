import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';

import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import Auth from '../components/Auth/Auth';
import { supabase } from '../utils/supabase';

export default function HomePage() {
  const [session, setSession] = useState<Session | null>();

  useEffect(() => {
    async function getSession() {
      const {
        data: { session: _session },
      } = await supabase.auth.getSession();
      setSession(_session);
    }

    getSession();
  }, []);

  return (
    <>
      <div style={{ maxWidth: 400, margin: '0 auto', marginTop: 250 }}>
        {!session ? <Auth /> : <div>Hi, {session.user.email}!</div>}
      </div>
      <ColorSchemeToggle />
    </>
  );
}
