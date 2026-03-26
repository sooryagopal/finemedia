import React from "react";
import { Link } from "react-router-dom";
import {
  FiCheck,
  FiTrendingUp,
  FiUsers,
  FiStar,
  FiCalendar,
} from "react-icons/fi";

const Home = () => {
  return (
    <div className="w-full overflow-hidden">

      {/* ================= HERO ================= */}

      <section
        className="relative h-[90vh] bg-cover bg-center text-white flex items-center"
        style={{
          backgroundImage: "url('/images/hero.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Professional LED Wall <br /> & Event Solutions
          </h1>

          <p className="text-xl max-w-3xl mx-auto mb-10 opacity-90">
            Premium LED screens, live streaming and event support across Tamil Nadu.
          </p>

          <div className="flex flex-wrap justify-center gap-5">

            <Link
              to="/booking"
              className="bg-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Book Now
            </Link>

            <Link
              to="/services"
              className="border border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition"
            >
              Our Services
            </Link>

          </div>

        </div>
      </section>

      {/* ================= STATS ================= */}

      <section className="bg-white py-16 shadow-inner">

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

          <StatCard icon={<FiTrendingUp />} value="500+" label="Events" />
          <StatCard icon={<FiUsers />} value="50+" label="LED Walls" />
          <StatCard icon={<FiStar />} value="4.9/5" label="Rating" />
          <StatCard icon={<FiCalendar />} value="10+" label="Years" />

        </div>
      </section>

      {/* ================= SERVICES ================= */}

      <section className="py-24 bg-gradient-to-br from-blue-50 to-indigo-100">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <h2 className="text-4xl font-bold mb-3">
              Our Services
            </h2>

            <p className="text-gray-600 text-lg">
              Complete event technology solutions
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            <ServiceCard
              icon="📺"
              title="Indoor LED"
              desc="High-resolution displays for halls & weddings"
            />

            <ServiceCard
              icon="🌞"
              title="Outdoor LED"
              desc="Weather-proof screens for concerts"
            />

            <ServiceCard
              icon="🎥"
              title="Live Streaming"
              desc="Multi-camera HD broadcast setup"
            />

            <ServiceCard
              icon="🎤"
              title="Event Support"
              desc="Sound, lighting & staging services"
            />

          </div>

        </div>

      </section>

      {/* ================= GALLERY ================= */}

      <section className="py-24 bg-gray-900 text-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <h2 className="text-4xl font-bold mb-3">
              Our Recent Events
            </h2>

            <p className="text-gray-400 text-lg">
              Some of our successful projects
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <GalleryImg src="/images/led1.jpg" />
            <GalleryImg src="/images/led2.jpg" />
            <GalleryImg src="/images/event.jpg" />

          </div>

        </div>

      </section>
{/* ================= WHY US ================= */}

<section className="py-24 bg-gray-100">

  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-16">

      <h2 className="text-4xl font-bold mb-3">
        Why Choose Fine Media?
      </h2>

      <p className="text-gray-600 text-lg">
        Your trusted partner for professional event execution
      </p>

    </div>

    <div className="grid md:grid-cols-3 gap-8">

      <WhyCard
        title="Latest Technology"
        desc="We use modern P3–P6 LED displays for high clarity."
        icon="🚀"
      />

      <WhyCard
        title="Expert Team"
        desc="Trained technicians ensure perfect installation."
        icon="👨‍🔧"
      />

      <WhyCard
        title="24/7 Support"
        desc="Round-the-clock assistance for every event."
        icon="📞"
      />

      <WhyCard
        title="Affordable Pricing"
        desc="Best quality service at reasonable cost."
        icon="💰"
      />

      <WhyCard
        title="TN Wide Coverage"
        desc="Serving all major districts in Tamil Nadu."
        icon="📍"
      />

      <WhyCard
        title="10+ Years Experience"
        desc="Proven expertise in event management."
        icon="🏆"
      />

    </div>

  </div>

</section>
    </div>
  );
};
/* ================= COMPONENTS ================= */

const StatCard = ({ icon, value, label }) => (
  <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-xl transition">

    <div className="text-3xl text-blue-600 mb-2 flex justify-center">
      {icon}
    </div>

    <h3 className="text-2xl font-bold">{value}</h3>

    <p className="text-gray-600">{label}</p>

  </div>
);

const ServiceCard = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 text-center">

    <div className="text-4xl mb-4">{icon}</div>

    <h3 className="text-xl font-semibold mb-3">
      {title}
    </h3>

    <p className="text-gray-600 mb-5">
      {desc}
    </p>

    <Link
      to="/services"
      className="text-blue-600 font-medium hover:underline"
    >
      Learn More →
    </Link>

  </div>
);

const GalleryImg = ({ src }) => (
  <div className="overflow-hidden rounded-2xl shadow-xl">

    <img
      src={src}
      alt="Event"
      className="w-full h-72 object-cover hover:scale-110 transition duration-500"
    />

  </div>
);
const WhyCard = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 text-center">

    <div className="text-4xl mb-4">{icon}</div>

    <h3 className="text-xl font-semibold mb-3">
      {title}
    </h3>

    <p className="text-gray-600">
      {desc}
    </p>

  </div>
);


export default Home;
