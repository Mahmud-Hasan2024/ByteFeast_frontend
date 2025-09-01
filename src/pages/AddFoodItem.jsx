import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import apiClient from "../services/api-client";
import authApiClient from "../services/auth-api-client";

const AddFoodItem = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [categories, setCategories] = useState([]);
  const [foodId, setFoodId] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch categories
  useEffect(() => {
    apiClient.get("/categories/").then((res) => {
      setCategories(res.data);
    });
  }, []);

  // Add food item
  const handleFoodAdd = async (data) => {
    try {
      const res = await authApiClient.post("/foods/", data);
      setFoodId(res.data.id);
      alert("Food item created. You can now upload images.");
    } catch (error) {
      console.error("Error adding food item", error);
      alert("Failed to create food item.");
    }
  };

  // Image preview
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviewImages(files.map(file => URL.createObjectURL(file)));
  };

  // Upload images
  const handleUpload = async () => {
    if (!images.length) return alert("Please select images.");
    if (!foodId) return alert("Please create the food item first.");

    setLoading(true);
    try {
      for (const image of images) {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("food", foodId);

        await authApiClient.post(`/food-images/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      setLoading(false);
      alert("Images uploaded successfully");
      setImages([]);
      setPreviewImages([]);
    } catch (error) {
      console.error("Error uploading image", error);
      setLoading(false);
      alert("Failed to upload images.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-base-100 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-white">Add New Food Item</h2>

      {!foodId ? (
        <form onSubmit={handleSubmit(handleFoodAdd)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white">Food Name</label>
            <input
              {...register("name", { required: true })}
              className="input input-bordered w-full bg-base-200 text-white"
              placeholder="Food Name"
            />
            {errors.name && <p className="text-red-500 text-xs">This field is required</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-white">Description</label>
            <textarea
              {...register("description")}
              className="textarea textarea-bordered w-full bg-base-200 text-white"
              placeholder="Description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">Price</label>
            <input
              type="text"
              {...register("price", {
                required: "This field is required",
                validate: value => !isNaN(parseFloat(value)) || "Please enter a valid number!"
              })}
              className="input input-bordered w-full bg-base-200 text-white"
              placeholder="Price"
            />
            {errors.price && <p className="text-red-500 text-xs">{errors.price.message}</p>}
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" {...register("is_special")} />
            <label className="text-white">Mark as Special</label>
          </div>

          <div>
            <label className="block text-sm font-medium text-white">Discount Price</label>
            <input
              type="text"
              {...register("discount_price")}
              className="input input-bordered w-full bg-base-200 text-white"
              placeholder="Discount Price (optional)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">Category</label>
            <select
              {...register("category", { required: true })}
              className="select select-bordered w-full bg-base-200 text-white"
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-xs">This field is required</p>}
          </div>

          <button type="submit" className="btn btn-primary w-full">Add Food Item</button>
        </form>
      ) : (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white">Upload Food Images</h3>
          <input
            type="file"
            multiple
            accept="image/*"
            className="file-input file-input-bordered w-full bg-base-200 text-white"
            onChange={handleImageChange}
          />
          {previewImages.length > 0 && (
            <div className="flex gap-2 mt-2">
              {previewImages.map((src, idx) => (
                <img key={idx} src={src} alt="Preview" className="w-16 h-16 rounded-md object-cover" />
              ))}
            </div>
          )}

          <button
            onClick={handleUpload}
            className="btn btn-primary w-full mt-2"
            disabled={loading}
          >
            {loading ? "Uploading images..." : "Upload Images"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddFoodItem;
