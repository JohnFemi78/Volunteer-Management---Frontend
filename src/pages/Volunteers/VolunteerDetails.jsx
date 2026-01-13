import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import { getVolunteerById } from "../../api/volunteers";

export default function VolunteerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [volunteer, setVolunteer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    let isMounted = true;

    async function loadVolunteer() {
      try {
        setLoading(true);
        setError(null);

        const response = await getVolunteerById(id);
        // console.log("Volunteer API response:", response.data);

        if (isMounted) {
          
          setVolunteer(response.data.volunteer);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError("Unable to load volunteer");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadVolunteer();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return <div className="p-6">Loading volunteer...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  if (!volunteer) {
    return <div className="p-6">Volunteer not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <button onClick={() => navigate("/Volunteers")} > Back </button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT PANEL */}
        <div className="md:col-span-1">
          <Card>
            <h2 className="text-lg font-semibold">
              {volunteer.firstName} {volunteer.lastName}
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Phone: {volunteer.phone || "-"}
            </p>

            <p className="text-sm text-slate-500 mt-1">
              Gender: {volunteer.gender || "-"}
            </p>

            <div className="mt-4">
              <div className="text-sm font-medium mb-2">Skills</div>

              <div className="flex flex-wrap gap-2">
                {Array.isArray(volunteer.skills) &&
                volunteer.skills.length > 0 ? (
                  volunteer.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 text-xs bg-slate-100 rounded"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-slate-400">
                    No skills listed
                  </span>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* RIGHT PANEL */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <h3 className="text-lg font-semibold mb-2">
              Assigned Projects
            </h3>
            <p className="text-sm text-slate-500">
              No projects assigned yet
            </p>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold mb-2">
              Attendance History
            </h3>
            <p className="text-sm text-slate-500">
              No attendance records available
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
