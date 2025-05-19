import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="text-center max-w-3xl mx-auto py-20 px-4">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">Welcome to Media Tracker</h1>
      <p className="text-lg sm:text-xl text-gray-600 mb-10">Easily organize and keep track of your favorite movies, shows, music, and games with a beautifully responsive dashboard.</p>
      <Link to="/tracker" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition">Get Started</Link>
    </section>
  );
}
