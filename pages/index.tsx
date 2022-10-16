import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import Auth from '../components/Auth/Auth';

export default function HomePage() {
  return (
    <>
      <div style={{ maxWidth: 400, margin: '0 auto', marginTop: 250 }}>
        <Auth />
      </div>
      <ColorSchemeToggle />
    </>
  );
}
