import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import apiClient from "../services/api-client";
import authApiClient from "../services/auth-api-client";
import useAuthContext from "../hooks/useAuthContext";

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/dciz8qr49/";

const EditFoodItem = () => {
  const { foodId } = useParams();
  const navigate = useNavigate();
  const { user, loadingAuth } = useAuthContext();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discount_price: "",
    category: "",
    is_special: false,
  });
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch existing food
  useEffect(() => {
    if (user?.is_staff) {
      apiClient.get(`/foods/${foodId}/`).then(res => {
        setFormData({
          name: res.data.name,
          description: res.data.description,
          price: res.data.price,
          discount_price: res.data.discount_price || "",
          category: res.data.category,
          is_special: res.data.is_special,
        });
        setImages(res.data.images || []);
      }).catch(err => console.error(err));
    }
  }, [foodId, user]);

  if (loadingAuth) return <p className="text-center mt-10">Loading...</p>;
  if (!user?.is_staff) return <p className="text-red-500 text-center mt-10">You don’t have access to this page.</p>;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleFileChange = (e) => setNewImages(Array.from(e.target.files));

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authApiClient.put(`/foods/${foodId}/`, formData);

      for (const file of newImages) {
        const fd = new FormData();
        fd.append("food", foodId);
        fd.append("image", file);
        await authApiClient.post("/food-images/", fd, { headers: { "Content-Type": "multipart/form-data" } });
      }

      alert("Food updated successfully!");
      navigate("/menu");
    } catch (err) {
      console.error(err);
      alert("Failed to update food.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (imageId) => {
    if (!window.confirm("Delete this image?")) return;
    try {
      await authApiClient.delete(`/food-images/${imageId}/`);
      setImages(prev => prev.filter(img => img.id !== imageId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete image.");
    }
  };

  const handleDeleteFood = async () => {
    if (!window.confirm("Are you sure you want to delete this food item?")) return;
    try {
      await authApiClient.delete(`/foods/${foodId}/`);
      alert("Food deleted successfully!");
      navigate("/menu");
    } catch (err) {
      console.error(err);
      alert("Failed to delete food.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-4 flex justify-between items-center">
        <Link to="/dashboard" className="btn btn-sm btn-ghost">← Back to Dashboard</Link>
        <button type="button" onClick={handleDeleteFood} className="btn btn-sm btn-error">Delete Food</button>
      </div>

      <h2 className="text-2xl font-bold mb-4">Edit Food Item</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Food Name" className="input input-bordered w-full" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="textarea textarea-bordered w-full" />
        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="input input-bordered w-full" required />
        <input type="number" name="discount_price" value={formData.discount_price} onChange={handleChange} placeholder="Discount Price" className="input input-bordered w-full" />
        <input type="number" name="category" value={formData.category} onChange={handleChange} placeholder="Category ID" className="input input-bordered w-full" required />
        <label className="flex items-center gap-2">
          <input type="checkbox" name="is_special" checked={formData.is_special} onChange={handleChange} />
          Special?
        </label>

        <div>
          <h3 className="font-semibold mb-2">Current Images</h3>
          <div className="flex flex-wrap gap-4">
            {images.map(img => (
              <div key={img.id} className="relative">
                <img src={img.image.startsWith("http") ? img.image : `${CLOUDINARY_BASE_URL}${img.image}`} alt="Food" className="w-24 h-24 object-cover rounded border" />
                <button type="button" onClick={() => handleDeleteImage(img.id)} className="absolute top-0 right-0 btn btn-xs btn-error">✕</button>
              </div>
            ))}
          </div>
        </div>

        <input type="file" multiple accept="image/*" onChange={handleFileChange} className="file-input file-input-bordered w-full" />

        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Updating..." : "Update Food"}
        </button>
      </form>
    </div>
  );
};

export default EditFoodItem;
