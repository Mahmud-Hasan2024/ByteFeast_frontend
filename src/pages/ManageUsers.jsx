import { useEffect, useState } from "react";
import { FiMail, FiUser, FiShield } from "react-icons/fi";
import apiClient from "../services/api-client"; 
import useAuthContext from "../hooks/useAuthContext";

const ManageUsers = () => {
  const { authTokens, user } = useAuthContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    if (!user.is_staff) {
      setError("Access denied. Staff privileges required.");
      setLoading(false);
      return;
    }

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get("/auth/users/?no_pagination=true", {
          headers: {
            Authorization: `JWT ${authTokens?.access}`,
          },
        });
        
        const data = res.data.results || res.data;
        const sortedUsers = [...data].sort((a, b) => a.id - b.id);
        
        setUsers(sortedUsers);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        const msg = err.response?.data?.detail || "Failed to load users.";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    if (authTokens?.access) {
      fetchUsers();
    }
  }, [authTokens?.access, user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <span className="loading loading-spinner loading-xl text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center p-6 text-center bg-gray-900 h-screen">
        <p className="text-red-500 font-bold text-xl mb-4">{error}</p>
        <button onClick={() => window.location.reload()} className="btn btn-primary btn-sm">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-900 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-8 text-primary text-center">
          👥 ByteFeast Users ({users.length})
        </h2>

        <div className="overflow-x-auto bg-gray-800 rounded-2xl shadow-2xl border border-gray-700">
          <table className="table table-zebra w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-700 bg-gray-800/80">
                <th className="text-center text-primary text-lg py-5">ID</th>
                <th className="text-center text-primary text-lg py-5">Name</th>
                <th className="text-center text-primary text-lg py-5">Email</th>
                <th className="text-center text-primary text-lg py-5">Privilege</th>
                <th className="text-center text-primary text-lg py-5">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {users.map((u) => (
                <tr key={u.id} className="border-b border-gray-700/50 hover:bg-gray-700/40 transition-colors">
                  <td className="text-center font-mono text-gray-500 py-4">{u.id}</td>
                  <td className="text-center font-semibold py-4">
                    {u.first_name || u.last_name ? `${u.first_name} ${u.last_name}` : "Anonymous Eater"}
                  </td>
                  <td className="text-center py-4">
                    <div className="flex items-center justify-center gap-2">
                      <FiMail className="text-primary/60" />
                      {u.email}
                    </div>
                  </td>
                  <td className="text-center py-4">
                    {u.is_staff ? (
                      /* 🎯 Added bg-primary-content and border for high visibility */
                      <span className="badge bg-primary text-primary-content border-primary-focus gap-1 font-bold py-4 px-5 shadow-md">
                        <FiShield size={14} /> Admin
                      </span>
                    ) : (
                      /* 🎯 Added bg-slate-700 to ensure it doesn't blend with zebra stripes */
                      <span className="badge bg-slate-700 text-slate-200 border-slate-600 gap-1 font-medium py-4 px-5 shadow-sm">
                        <FiUser size={14} /> Customer
                      </span>
                    )}
                  </td>
                  <td className="text-center py-4">
                    <div className="flex items-center justify-center gap-1">
                      {u.is_active !== false ? (
                        <span className="text-emerald-400 flex items-center gap-2 font-medium bg-emerald-900/20 px-3 py-1 rounded-full border border-emerald-500/30">
                          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span> Active
                        </span>
                      ) : (
                        <span className="text-red-400 flex items-center gap-2 font-medium bg-red-900/20 px-3 py-1 rounded-full border border-red-500/30">
                          <span className="h-2 w-2 rounded-full bg-red-500"></span> Inactive
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;