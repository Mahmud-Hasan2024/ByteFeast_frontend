import { useState } from "react";
import { useNavigate } from "react-router";
import authApiClient from "../services/auth-api-client";
import useAuthContext from "../hooks/useAuthContext";

const AddCategory = () => {
  const { user, loadingAuth } = useAuthContext();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (loadingAuth) return <p className="text-center mt-10">Loading...</p>;
  if (!user?.is_staff) return <p className="text-red-500 text-center mt-10">You don’t have access to this page.</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authApiClient.post("/categories/", { name });
      alert("Category added successfully!");
      navigate("/categories");
    } catch (err) {
      console.error(err);
      alert("Failed to add category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold mb-4">Add New Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Name"
          className="input input-bordered w-full"
          required
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Adding..." : "Add Category"}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
