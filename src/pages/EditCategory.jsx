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
        const res = await authApiClient.get(`/categories/${categoryId}/`);
        
        // Pre-filling logic: Handles both object and array responses
        if (Array.isArray(res.data)) {
            setName(res.data[0]?.name || "");
        } else {
            setName(res.data.name || "");
        }
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
      <div className="flex justify-center items-center py-20 h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="ml-4 text-gray-400">Loading current name...</p>
      </div>
    );
  }

  if (!user?.is_staff) {
    return <p className="text-red-500 text-center mt-10 font-bold">Access Denied: Admins Only.</p>;
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
      <h2 className="text-2xl font-bold mb-6 text-white">
        Edit Category: <span className="text-primary">{name || "..."}</span>
      </h2>
      
      <form onSubmit={handleUpdate} className="bg-gray-800 p-6 rounded-xl shadow-lg space-y-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text text-gray-300 font-bold">Category Name</span>
          </label>
          <input
            type="text"
            value={name} 
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full bg-gray-700 text-white focus:border-primary"
            required
            autoFocus 
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Updating..." : "Save Changes"}
          </button>
          
          <button type="button" className="btn btn-error" onClick={handleDelete}>
            Delete Category
          </button>

          <button 
            type="button" 
            className="btn btn-ghost" 
            onClick={() => navigate("/categories")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;