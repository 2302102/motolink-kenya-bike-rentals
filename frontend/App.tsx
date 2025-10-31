import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import BikesPage from "@/pages/BikesPage";
import ToursPage from "@/pages/ToursPage";
import GaragePage from "@/pages/GaragePage";
import SOSPage from "@/pages/SOSPage";
import BookingPage from "@/pages/BookingPage";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/bikes" element={<BikesPage />} />
            <Route path="/tours" element={<ToursPage />} />
            <Route path="/garage" element={<GaragePage />} />
            <Route path="/sos" element={<SOSPage />} />
            <Route path="/booking/:type/:id" element={<BookingPage />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}
