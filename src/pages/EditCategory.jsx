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

  useEffect(() => {
    if (user?.is_staff) {
      authApiClient.get(`/categories/${categoryId}/`).then(res => setName(res.data.name)).catch(err => console.error(err));
    }
  }, [categoryId, user]);

  if (loadingAuth) return <p className="text-center mt-10">Loading...</p>;
  if (!user?.is_staff) return <p className="text-red-500 text-center mt-10">You don’t have access to this page.</p>;

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
      <h2 className="text-2xl font-bold mb-4">Edit Category</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Name"
          className="input input-bordered w-full"
          required
        />
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
