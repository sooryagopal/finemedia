import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReactLenis } from "@studio-freight/react-lenis";

// Public Pages
import Home from "./pages/public/Home";
import Services from "./pages/public/Services";
import Booking from "./pages/public/Booking";
import Contact from "./pages/public/Contact";
import Gallery from "./pages/public/Gallery";
import AvailableDates from "./pages/public/AvailableDates";
import CostEstimator from "./pages/public/CostEstimator";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import ServicesAdmin from "./pages/admin/ServicesAdmin";
import GalleryAdmin from "./pages/admin/GalleryAdmin";
import DatesAdmin from "./pages/admin/DatesAdmin";
import BookingsAdmin from "./pages/admin/BookingsAdmin";

// Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Context
import { AuthProvider } from "./context/AuthContext";


function Layout() {

  const location = useLocation();

  const isAdmin = location.pathname.startsWith("/admin");

  return (

    <div className="min-h-screen flex flex-col">

      <ToastContainer position="top-right" autoClose={3000} />

      {/* Hide Navbar in Admin */}
      {!isAdmin && <Navbar />}

      <main className="flex-grow">

        <Routes>

          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/available-dates" element={<AvailableDates />} />
          <Route path="/cost-estimator" element={<CostEstimator />} />

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/services" element={<ServicesAdmin />} />
          <Route path="/admin/gallery" element={<GalleryAdmin />} />
          <Route path="/admin/dates" element={<DatesAdmin />} />
          <Route path="/admin/bookings" element={<BookingsAdmin />} />

        </Routes>

      </main>

      {!isAdmin && <Footer />}

    </div>
  );
}


function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout />
      </Router>
    </AuthProvider>
  );
}

export default App;
