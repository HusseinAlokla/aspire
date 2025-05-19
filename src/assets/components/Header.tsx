import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-blue-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold tracking-tight hover:text-blue-200">🎬 Media Tracker</Link>
        <nav className="mt-2 md:mt-0 space-x-4 text-lg">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/tracker" className="hover:underline">Tracker</Link>
        </nav>
      </div>
    </header>
  );
}