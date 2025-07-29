import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ThankYou from "./pages/ThankYou";
import DonationForm from "./components/DonationForm";
import Donors from "./pages/Donors";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Router>
        <Navbar />
        <main className="flex-1 pb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/thankyou" element={<ThankYou />} />
            <Route path="/donate" element={<DonationForm />} />
            <Route path="/donors" element={<Donors />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/policy" element={<PrivacyPolicy />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
