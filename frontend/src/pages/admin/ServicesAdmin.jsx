import { useEffect, useState } from "react";
import axios from "../../services/api";

const ServicesAdmin = () => {

  const [services, setServices] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    features: ""
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const res = await axios.get("/api/services");
    setServices(res.data);
  };

  // ADD OR UPDATE
  const handleSubmit = async () => {

    const payload = {
      title: form.title,
      description: form.description,
      price: form.price,
      features: form.features.split(",")
    };

    if (editingId) {
      await axios.put(`/api/services/${editingId}`, payload);
    } else {
      await axios.post("/api/services", payload);
    }

    resetForm();
    fetchServices();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    await axios.delete(`/api/services/${id}`);
    fetchServices();
  };

  const handleEdit = (service) => {
    setEditingId(service._id);

    setForm({
      title: service.title,
      description: service.description,
      price: service.price,
      features: service.features.join(",")
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      title: "",
      description: "",
      price: "",
      features: ""
    });
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">

      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Manage Services
      </h1>

      {/* FORM */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">

        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Service" : "Add Service"}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            placeholder="Title"
            value={form.title}
            onChange={(e)=>setForm({...form,title:e.target.value})}
            className="border p-2 rounded"
          />

          <input
            placeholder="Price"
            value={form.price}
            onChange={(e)=>setForm({...form,price:e.target.value})}
            className="border p-2 rounded"
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e)=>setForm({...form,description:e.target.value})}
            className="border p-2 rounded md:col-span-2"
          />

          <input
            placeholder="Features (comma separated)"
            value={form.features}
            onChange={(e)=>setForm({...form,features:e.target.value})}
            className="border p-2 rounded md:col-span-2"
          />

        </div>

        <div className="flex gap-3 mt-4">

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            {editingId ? "Update Service" : "Add Service"}
          </button>

          {editingId && (
            <button
              onClick={resetForm}
              className="bg-gray-400 text-white px-6 py-2 rounded"
            >
              Cancel
            </button>
          )}

        </div>
      </div>

      {/* LIST */}
      <div className="grid md:grid-cols-2 gap-6">

        {services.map((s)=>(
          <div key={s._id} className="bg-white p-5 rounded-xl shadow">

            <h3 className="font-bold text-xl">{s.title}</h3>
            <p className="text-gray-600">{s.description}</p>
            <p className="text-blue-600 font-semibold">₹{s.price}</p>

            <ul className="text-sm my-2">
              {s.features.map((f,i)=>(
                <li key={i}>• {f}</li>
              ))}
            </ul>

            <div className="flex gap-3 mt-3">

              <button
                onClick={()=>handleEdit(s)}
                className="bg-yellow-500 text-white px-4 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={()=>handleDelete(s._id)}
                className="bg-red-600 text-white px-4 py-1 rounded"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default ServicesAdmin;
