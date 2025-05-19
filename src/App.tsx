import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./assets/components/Header";
import Home from "./pages/Home";
import Tracker from "./pages/Tracker";

export default function App() {
  return (
    <Router>
      <div className="bg-gradient-to-br from-gray-100 to-blue-100 min-h-screen font-sans text-gray-800">
        <Header />
        <main className="px-4 sm:px-6 md:px-8 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tracker" element={<Tracker />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}