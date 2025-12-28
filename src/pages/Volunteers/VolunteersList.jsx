import React, { useEffect, useState } from "react";
import Card  from "../../components/ui/Card"
import { getVolunteers, deleteVolunteer } from "../../api/volunteers";
import {useNavigate} from "react-router-dom"
import { isAdmin } from "/utils/auth";

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
        setVolunteers(volunteers);
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
    if (loading) {
      return <div className="p-6">Loading volunteers...</div>
    }
    
    if (error) {
      return <div className="p-6 text-red-600">{error}</div>
    }
  
  
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Volunteers</h2>

        <button className="btn-primary" onClick={() =>
           navigate("/volunteers/create")}>
            Add Volunteer
        </button>

        {volunteers.length === 0 ? (
          <Card>
            <p className="text-slate-500">No Volunteers found </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {volunteers.map((v) => (
              <Card key={v.id} className="flex justify-between items-center">
                <div>
                  <div className="font-medium">
                    {v.firstName} {v.lastName}
                  </div>
                  <div className="text-sm text-slate-500">
                      {v.phone || "-"}
                  </div>
                  <div className="text-sm text-slate-500">
                    {Array.isArray(v.skills) ? v.skills.join(",") : "-"}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="btn-secondary"
                  onClick={() => navigate(`/volunteers/edit/${v.id}`)}>
                    Edit
                  </button>

                  {ADMIN && (
                    <button className="btn-danger"
                    onClick={() => handleDelete(v.id)}>
                    Delete
                    </button>
                  )}
                </div>
              </Card>
            ))}

          </div>
        )} 
      </div>

    </div>
  );
}
