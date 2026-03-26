import React from "react";
import { Link } from "react-router-dom";
import { FiTrendingUp, FiUsers, FiStar, FiCalendar } from "react-icons/fi";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="w-full overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="mb-6 inline-block bg-white/10 backdrop-blur px-6 py-2 rounded-full border border-white/20 text-sm tracking-widest uppercase font-medium"
          >
            Premium Event Technology
          </motion.div>

          <motion.h1 
            initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 1 }}
            className="text-6xl md:text-8xl font-black mb-6 tracking-tight leading-tight"
          >
            Professional LED Wall <br /> & Event Solutions
          </motion.h1>

          <motion.p 
            initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-gray-300 font-light"
          >
            Elevating your events with cutting-edge displays, live streaming, and comprehensive support across Tamil Nadu.
          </motion.p>

          <motion.div 
            initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7, duration: 1 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <Link
              to="/booking"
              className="bg-white text-black px-10 py-4 rounded-full font-semibold hover:bg-gray-200 transition shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]"
            >
              Book Now
            </Link>
            <Link
              to="/services"
              className="border border-white/50 backdrop-blur text-white px-10 py-4 rounded-full font-semibold hover:bg-white hover:text-black transition"
            >
              Our Services
            </Link>
          </motion.div>
        </div>

        {/* Floating aesthetics */}
        <motion.div 
          animate={{ y: [-15, 15] }} transition={{ repeat: Infinity, yoyo: true, duration: 3, ease: "easeInOut" }}
          className="absolute top-[20%] left-[10%] w-24 h-24 bg-blue-500/20 rounded-full blur-2xl"
        />
        <motion.div 
          animate={{ y: [15, -15] }} transition={{ repeat: Infinity, yoyo: true, duration: 4, ease: "easeInOut" }}
          className="absolute bottom-[20%] right-[10%] w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"
        />
      </section>

      {/* ================= STATS ================= */}
      <section className="relative z-20 -mt-16 sm:-mt-20 max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: "-100px" }}
          className="bg-white/80 backdrop-blur-lg border border-gray-100 p-8 md:p-12 rounded-[2rem] shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-[#1d1d1f]"
        >
          <StatCard icon={<FiTrendingUp />} value="500+" label="Events Executed" />
          <StatCard icon={<FiUsers />} value="50+" label="LED Walls Ready" />
          <StatCard icon={<FiStar />} value="4.9/5" label="Client Rating" />
          <StatCard icon={<FiCalendar />} value="10+" label="Years Expertise" />
        </motion.div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="py-32 bg-[#fbfbfd]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-[#1d1d1f] tracking-tight">
              Our Services.
            </h2>
            <p className="text-[#86868b] text-xl md:text-2xl font-medium">
              Complete technology solutions for every scale.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard delay={0.1} icon="📺" title="Indoor LED" desc="High-resolution displays for halls & weddings." />
            <ServiceCard delay={0.2} icon="🌞" title="Outdoor LED" desc="Weather-proof screens for big concerts." />
            <ServiceCard delay={0.3} icon="🎥" title="Live Streaming" desc="Multi-camera HD broadcast setups." />
            <ServiceCard delay={0.4} icon="🎤" title="Event Support" desc="Sound, lighting & staging services." />
          </div>
        </div>
      </section>

      {/* ================= WHY US ================= */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-[#1d1d1f] tracking-tight">
              Why Choose Fine Media?
            </h2>
            <p className="text-[#86868b] text-xl md:text-2xl font-medium">
              Your trusted partner for professional execution.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <WhyCard delay={0.1} title="Latest Tech" desc="P3–P6 LED displays for unmatched clarity." icon="🚀" />
            <WhyCard delay={0.2} title="Expert Team" desc="Trained technicians ensure perfect installs." icon="👨‍🔧" />
            <WhyCard delay={0.3} title="24/7 Support" desc="Mission critical event assistance." icon="📞" />
            <WhyCard delay={0.4} title="Affordable" desc="Premium quality at a reasonable cost." icon="💰" />
            <WhyCard delay={0.5} title="Wide Coverage" desc="Serving all major districts in Tamil Nadu." icon="📍" />
            <WhyCard delay={0.6} title="Experience" desc="Over a decade of proven expertise." icon="🏆" />
          </div>
        </div>
      </section>
      
      {/* ================= GALLERY ================= */}
      <section className="py-32 bg-[#1d1d1f] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
              Recent Projects.
            </h2>
            <p className="text-[#86868b] text-xl md:text-2xl font-medium">
              A glimpse into our visual excellence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <GalleryImg delay={0.1} src="/images/led1.jpg" />
            <GalleryImg delay={0.3} src="/images/led2.jpg" />
            <GalleryImg delay={0.5} src="/images/event.jpg" />
          </div>
        </div>
      </section>
    </div>
  );
};

/* ================= COMPONENTS ================= */

const StatCard = ({ icon, value, label }) => (
  <div className="flex flex-col items-center justify-center group">
    <div className="text-4xl text-[#0066cc] mb-4 transition duration-500 group-hover:scale-110">
      {icon}
    </div>
    <h3 className="text-4xl font-black mb-2 tracking-tight">{value}</h3>
    <p className="text-[#86868b] font-medium text-lg">{label}</p>
  </div>
);

const ServiceCard = ({ icon, title, desc, delay }) => (
  <motion.div 
    initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay }}
    className="bg-white p-10 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition duration-500 border border-gray-100 flex flex-col"
  >
    <div className="text-5xl mb-6 bg-gray-50 w-20 h-20 rounded-2xl flex items-center justify-center shadow-inner">{icon}</div>
    <h3 className="text-2xl font-bold mb-4 text-[#1d1d1f] tracking-tight">{title}</h3>
    <p className="text-[#86868b] mb-8 leading-relaxed flex-grow">{desc}</p>
    <Link to="/services" className="text-[#0066cc] font-semibold hover:underline mt-auto">Learn More →</Link>
  </motion.div>
);

const WhyCard = ({ icon, title, desc, delay }) => (
  <motion.div 
    initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay }}
    className="bg-[#fbfbfd] p-10 rounded-[2rem] transition duration-500 hover:bg-white hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-transparent hover:border-gray-100"
  >
    <div className="text-4xl mb-6">{icon}</div>
    <h3 className="text-2xl font-bold mb-4 text-[#1d1d1f] tracking-tight">{title}</h3>
    <p className="text-[#86868b] leading-relaxed">{desc}</p>
  </motion.div>
);

const GalleryImg = ({ src, delay }) => (
  <motion.div 
    initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay }}
    className="overflow-hidden rounded-[2rem] shadow-2xl relative group pb-[80%]"
  >
    <img
      src={src}
      className="absolute inset-0 w-full h-full object-cover transition duration-700 ease-out group-hover:scale-105"
      alt="Project"
      onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400?text=Project+Image'; }}
    />
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-500" />
  </motion.div>
);

export default Home;
