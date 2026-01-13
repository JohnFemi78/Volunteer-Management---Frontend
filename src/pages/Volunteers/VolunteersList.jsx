import React, { useEffect, useState } from "react";
import Card  from "../../components/ui/Card"
import { getVolunteers, deleteVolunteer } from "../../api/volunteers";
import { isAdmin } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

export default function VolunteersList() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const ADMIN = isAdmin();

  useEffect(() => {
    async function loadVolunteers() {
      setLoading(true);
        try {
        const volunteers = await getVolunteers();
        setVolunteers(volunteers.data.volunteers || []);
    
      } catch (err) {
        console.error(err);
        setError("Failed to load volunteers");
      } finally {
        setLoading(false);
      }
    }

    loadVolunteers();
  }, []);

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this volunteer?"
    );
    if (!confirmDelete) return;
    
    try {
      await deleteVolunteer(id);
      // remove deleted volunteer from UI
      setVolunteers((prev) => prev.filter((v) => v.id !==id))
    } catch (err) {
      console.error(err);
      setError("Delete Failed")
      }
    }
   // update the volunteers list
  //  async function handleEdit(id) {
  //   const confirmEdit = window.confirm(
  //     "Are you sure you want to edit this volunteer?"
  //   );
  //   if (!confirmEdit) return;
  //   try {
  //     setLoading(true);
      
  //   } catch (error) {
  //     console.error(error);
  //     setError("Edit Failed")
  //   }
  //  }

    if (loading) {
      return <div className="p-6">Loading volunteers...</div>
    }
    
    if (error) {
      return <div className="p-6 text-red-600">{error}</div>
    }
  
  
  return (
    <div className="max-w-6xl mx-auto p-6">
  {/* Header */}
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-2xl font-semibold">Volunteers</h2>

    <button
      className="btn-primary"
      onClick={() => navigate("/volunteer/create")}
    >
      Add Volunteer
    </button>
  </div>

  {volunteers.length === 0 ? (
    <Card>
      <p className="text-slate-500">No Volunteers found</p>
    </Card>
  ) : (
    <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        {/* TABLE HEAD */}
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
              Name
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
              Phone
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
              Skills
            </th>
            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>

        {/* TABLE BODY */}
        <tbody className="divide-y divide-gray-100">
          {volunteers.map((volunteer) => (
            <tr
              key={volunteer.id}
              className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
            >
              <td className="px-4 py-3 font-medium text-gray-900">
                {volunteer.firstName} {volunteer.lastName}
              </td>

              <td className="px-4 py-3 text-sm text-gray-600">
                {volunteer.phone || "-"}
              </td>

              <td className="px-4 py-3 text-sm text-gray-600">
                {Array.isArray(volunteer.skills) && volunteer.skills.length > 0
                  ? volunteer.skills.join(", ")
                  : "—"}
              </td>

              <td className="px-4 py-3">
                <div className="flex justify-end gap-4">
                  <button  
                    onClick={() => navigate(`/volunteer/${volunteer.id}`)}
                    className="text-sm font-medium text-green-600 hover:underline"
                  >
                    View
                  </button>
                  <button
                    onClick={() => navigate(`/volunteer/edit/${volunteer.id}`)}
                    className="text-sm font-medium text-indigo-600 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(volunteer.id)}
                    className="text-sm font-medium text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

  );
}
