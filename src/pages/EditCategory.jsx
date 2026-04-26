import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import authApiClient from "../services/auth-api-client";
import useAuthContext from "../hooks/useAuthContext";

const EditCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { user, loadingAuth } = useAuthContext();
  
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);

  useEffect(() => {
    const fetchCategoryName = async () => {
      try {
        setFetchingData(true);
        // Ensure we use the correct endpoint to get the specific category details
        const res = await authApiClient.get(`/categories/${categoryId}/`);
        setName(res.data.name); // This pre-fills the input field
      } catch (err) {
        console.error("Error fetching category:", err);
      } finally {
        setFetchingData(false);
      }
    };

    if (user?.is_staff && categoryId) {
      fetchCategoryName();
    }
  }, [categoryId, user]);

  if (loadingAuth || fetchingData) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="ml-4">Loading category data...</p>
      </div>
    );
  }

  if (!user?.is_staff) {
    return <p className="text-red-500 text-center mt-10">You don’t have access to this page.</p>;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authApiClient.put(`/categories/${categoryId}/`, { name });
      alert("Category updated successfully!");
      navigate("/categories");
    } catch (err) {
      console.error(err);
      alert("Failed to update category.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this category? This will delete all products under it!")) return;
    try {
      await authApiClient.delete(`/categories/${categoryId}/`);
      alert("Category deleted successfully!");
      navigate("/categories");
    } catch (err) {
      console.error(err);
      alert("Failed to delete category.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold mb-4">Edit Category: <span className="text-primary">{name}</span></h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Category Name</span>
          </label>
          <input
            type="text"
            value={name} // This is connected to the state that was updated in useEffect
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter new category name"
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Updating..." : "Update Category"}
          </button>
          <button type="button" className="btn btn-error" onClick={handleDelete}>
            Delete Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;