import { useEffect, useState } from "react";
import axios from "../../services/api";

const Gallery = () => {

  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await axios.get("/api/gallery");
      setImages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // auto slide
  useEffect(() => {
    if(images.length === 0) return;

    const interval = setInterval(()=>{
      setCurrent(prev => (prev + 1) % images.length);
    },3000);

    return ()=> clearInterval(interval);
  },[images]);

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* ================= HERO / SLIDER ================= */}
      <div className="relative h-[60vh] w-full overflow-hidden">

        {images.length > 0 && (
          <img
            src={images[current]?.url}
            className="w-full h-full object-cover transition duration-700"
          />
        )}

        {/* overlay */}
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white">

          <h1 className="text-5xl font-bold mb-4">
            Fine Media Gallery
          </h1>

          <p className="text-lg opacity-90">
            Capturing our best LED & Event moments
          </p>

        </div>

      </div>

      {/* ================= GRID ================= */}
      <div className="max-w-7xl mx-auto px-6 py-16">

        <h2 className="text-3xl font-bold text-center mb-12">
          Our Works
        </h2>

        {images.length === 0 && (
          <p className="text-center text-gray-500">
            No images uploaded yet
          </p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {images.map((img) => (
            <div
              key={img._id}
              className="overflow-hidden rounded-2xl shadow-lg group"
            >
              <img
                src={img.url}
                className="w-full h-60 object-cover group-hover:scale-110 transition duration-500"
              />
            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default Gallery;
