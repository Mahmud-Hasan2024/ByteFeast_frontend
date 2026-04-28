import { useEffect, useState } from "react";
import authApiClient from "../../services/auth-api-client";
import useAuthContext from "../../hooks/useAuthContext";
import { FiMail, FiUser, FiShield } from "react-icons/fi";

const ManageUsers = () => {
  const { authTokens, user } = useAuthContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 🛡️ ByteFeast uses is_staff for admin checks
    if (!authTokens?.access || !user?.is_staff) {
      setError("Access denied. Staff privileges required.");
      setLoading(false);
      return;
    }

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await authApiClient.get("/auth/users/?no_pagination=true");
        const data = res.data.results || res.data;
        setUsers(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setError("Failed to load users. Check if the API is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [authTokens, user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <span className="loading loading-spinner loading-xl text-primary"></span>
      </div>
    );
  }

  if (error) return <div className="p-6 text-center text-red-500 font-bold bg-gray-900 h-screen">{error}</div>;

  return (
    <div className="w-full bg-gray-900 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-8 text-primary text-center">
          👥 ByteFeast Users ({users.length})
        </h2>

        <div className="overflow-x-auto bg-gray-800 rounded-2xl shadow-2xl border border-gray-700">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-center text-primary text-lg">ID</th>
                <th className="text-center text-primary text-lg">Name</th>
                <th className="text-center text-primary text-lg">Email</th>
                <th className="text-center text-primary text-lg">Privilege</th>
                <th className="text-center text-primary text-lg">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {users.map((u) => (
                <tr key={u.id} className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors">
                  <td className="text-center font-mono text-gray-500">{u.id}</td>
                  <td className="text-center font-semibold">
                    {u.first_name || u.last_name 
                      ? `${u.first_name || ''} ${u.last_name || ''}` 
                      : "Anonymous Eater"}
                  </td>
                  <td className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <FiMail className="text-primary/60" />
                      {u.email}
                    </div>
                  </td>
                  <td className="text-center">
                    {u.is_staff ? (
                      <span className="badge badge-primary gap-1 font-bold py-3 px-4">
                        <FiShield size={14} /> Admin
                      </span>
                    ) : (
                      <span className="badge badge-ghost gap-1 py-3 px-4 text-gray-400">
                        <FiUser size={14} /> Customer
                      </span>
                    )}
                  </td>
                  <td className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      {/* Check for is_active which is standard in Django */}
                      {u.is_active !== false ? (
                        <span className="text-emerald-400 flex items-center gap-2 font-medium">
                          <span className="h-2 w-2 rounded-full bg-emerald-500"></span> Active
                        </span>
                      ) : (
                        <span className="text-red-400 flex items-center gap-2 font-medium">
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