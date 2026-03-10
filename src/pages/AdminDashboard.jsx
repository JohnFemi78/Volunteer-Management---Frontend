import {useState, useEffect} from 'react';
import { updateStaff, getAllStaff } from '../api/admin';
import { useNavigate } from 'react-router-dom';



export default function AdminDashboard() {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // components/AdminDashboard.jsx
    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await getAllStaff();
            setUsers(response.data) || []; 
            console.log("Response", response.data);
            // Re-fetch users to update the UI
        } catch (err) {
            console.error("Failed to fetch users", err);
            setError("Failed to fetch users", err);
        } finally {
            setLoading (false)}
    };
        
        // Run FetchUsers when the page Loads
        useEffect(() => {
          fetchUsers();
        }, []);

        // function to change the role
        const handleRoleChange = async (userId, newRole) => {
            try {
               setLoading(true); 
            //    Send the ID to the URL and the role to the body
            await updateStaff(userId, {role: newRole});

            // Refresh the list
            fetchUsers();

            } catch (err) {
              console.error("Failed to update role", err);
              setError("Failed to update role");  
            } finally {
                setLoading(false);
            }
        };

        if (loading) {
            return <p>Loading Staff...</p>
        }
        if (error) {
            return <p className='text-red-500'>{error}</p>
        }
        
        return (
            <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard</h2>
              
              {error && <p className="text-red-500 mb-4">{error}</p>}
          
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-gray-100 text-left">
                      <th className="p-4 text-gray-600 font-semibold uppercase text-sm">Name</th>
                      <th className="p-4 text-gray-600 font-semibold uppercase text-sm">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="p-4 text-gray-800 font-medium">{user.firstName}</td>
                        <td className="p-4">
                          <select
                            value={user.role}
                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                            className="p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="STAFF">Staff</option>
                            <option value="MANAGER">Manager</option>
                            <option value="ADMIN">Admin</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition"
                onClick={() => navigate(-1)}
                 >
            Back
          </button>
            </div>
          );
        }