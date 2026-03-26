import { useEffect, useState } from "react";
import axios from "../../services/api";
import { FiCheck } from "react-icons/fi";

const Services = () => {

  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get("/api/services");
      setServices(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#e9f3ef] py-16">

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-green-600 font-semibold tracking-widest uppercase">
            Features
          </p>

          <h1 className="text-4xl font-bold text-gray-800">
            Our Features & Services
          </h1>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-10">

          {services.map((service) => (

            <div
              key={service._id}
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition duration-300"
            >

              {/* Icon circle */}
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-3xl">💡</span>
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold mb-2">
                {service.title}
              </h2>

              {/* Description */}
              <p className="text-gray-500 mb-4">
                {service.description}
              </p>

              {/* Features */}
              <ul className="text-left mb-6 space-y-2">
                {service.features.map((f, i) => (
                  <li key={i} className="flex items-center text-sm">
                    <FiCheck className="text-green-500 mr-2" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Price */}
              <p className="font-bold text-blue-600 mb-4">
                Starting at ₹{service.price}
              </p>

              {/* Button */}
              <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition">
                Book Now
              </button>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
};

export default Services;
