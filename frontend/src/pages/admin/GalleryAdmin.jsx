import { useEffect, useState } from "react";
import axios from "../../services/api";

const GalleryAdmin = () => {

  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  // ================= FETCH =================
  const fetchImages = async () => {
    try {
      const res = await axios.get("/api/gallery");
      setImages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= UPLOAD =================
  const uploadImage = async () => {
    if (!file) return alert("Select image");

    const formData = new FormData();
    formData.append("image", file);

    try {
      await axios.post("/api/gallery", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      setFile(null);
      fetchImages();
      alert("Uploaded successfully");
    } catch (err) {
      console.log(err);
      alert("Upload failed");
    }
  };

  // ================= DELETE =================
  const deleteImage = async (id) => {
    await axios.delete(`/api/gallery/${id}`);
    fetchImages();
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">

      <h1 className="text-3xl font-bold mb-6 text-blue-600">
        Manage Gallery
      </h1>

      {/* Upload */}
      <div className="flex gap-4 mb-8">

        <input
          type="file"
          onChange={(e)=>setFile(e.target.files[0])}
          className="border p-3 rounded w-full"
        />

        <button
          onClick={uploadImage}
          className="bg-blue-600 text-white px-6 rounded"
        >
          Upload
        </button>

      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {images.map((img)=>(
          <div key={img._id} className="relative">

            {/* 🔥 IMPORTANT CHANGE */}
            <img
              src={img.image}
              alt="gallery"
              className="rounded-lg shadow h-48 w-full object-cover"
            />

            <button
              onClick={()=>deleteImage(img._id)}
              className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded"
            >
              Delete
            </button>

          </div>
        ))}

      </div>

    </div>
  );
};

export default GalleryAdmin;
