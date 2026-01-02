import React, { useEffect, useState } from "react";
import Card  from "../../components/ui/Card"
import { getVolunteers, getVolunteerById, deleteVolunteer } from "../../api/volunteers";
import { isAdmin } from "/utils/auth";
import { useNavigate } from "react-router-dom";
import VolunteerDetails from "./VolunteerDetails";

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
    // //View Volunteer Details
    // async function handleView(id) {
    //   try {
    //     await getVolunteerById(id);
    //     setVolunteer(volunteer.data.volunter)    
    //   } catch (error) {
    //     console.error(error);
    //     setError("Unable to fetch volunteer details.");
    //   }
    // }

    if (loading) {
      return <div className="p-6">Loading volunteers...</div>
    }
    
    if (error) {
      return <div className="p-6 text-red-600">{error}</div>
    }
  
  
  return (
    <div className="flex- max-w-5xl mx-auto p-6">
      <div className="flex-column justify-center items-center mb-6">
        <h2 className="text-2xl font-semibold">Volunteers</h2>

        <button className="btn-primary" 
        onClick={() =>
           navigate("/volunteers/create")}>
            Add Volunteer
        </button>

        {volunteers.length === 0 ? (
          <Card>
            <p className="text-slate-500">No Volunteers found </p>
          </Card>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {volunteers.map((volunteer) => (
    <div
      key={volunteer.id}
      className="flex items-start justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
    >
      <div>
        <h4 className="font-semibold text-gray-900">
          {volunteer.firstName} {volunteer.lastName}
        </h4>

        <p className="mt-1 text-sm text-gray-600">
          Phone: {volunteer.phone}
        </p>

        <p className="mt-1 text-sm text-gray-600">
          Skills: {volunteer.skills?.join(", ")}
        </p>
      </div>

      <button className="text-sm font-medium text-indigo-600 hover:underline" onClick={() => navigate(`/volunteer/${volunteer.id}`)}>
        View
      </button>
      <br />
      <button onClick={() => handleDelete(volunteer.id)} className="text-sm font-medium text-indigo-600 hover:underline">
        Delete
      </button>
    </div>
  ))}
</div>

        )} 
      </div>

    </div>
  );
}
