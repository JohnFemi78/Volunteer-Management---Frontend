import React, { useState, useEffect} from 'react'
import { deleteAttendanceById, getAttendance } from '../../api/attendance';
import Card from "../../components/ui/Card";
import { useNavigate } from 'react-router-dom';
import { isAdmin } from "/utils/auth";

export default function AttendanceList() {
    const [attendance, setAttendance] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const ADMIN = isAdmin();

    useEffect(() => {
      async function loadAttendance() {
        try {
           const res = await getAttendance();
           setLoading(true);
           setAttendance(res.data); 
        } catch (err) {
            console.error(err);
            setError("Failed to load Attendance");
        }finally {
            setLoading(false);
        }
      }
      loadAttendance();
    }, []);
    
    async function handleDelete(id) {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this attendance?"
        )
        if (!confirmDelete) return;

        try {
            await deleteAttendanceById(id);
            // remove delete volunteer from UI
            setAttendance((prev) => prev.filter((a) => a.id !== id));
        } catch (err) {
            console.error(err);
            setError("Failed to delete attendance")
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
        <h2 className="text-2xl font-semibold">Attendance</h2>

        <button
          className="btn-primary"
          onClick={() => navigate("/attendance/create")}
        >
          Add Attendance
        </button>
      </div>

      {attendance.length === 0 ? (
        <Card>
          <p className="text-slate-500">No attendance records found</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {attendance.map((a) => (
            <Card key={a.id} className="flex justify-between items-center">
              <div>
                <div className="font-medium">{a.projectId}</div>
                <div className="text-sm text-slate-500">{a.volunteerId}</div>
                <div className="text-sm text-slate-500">{a.status}</div>
              </div>

              <div className="flex gap-2">
                <button
                  className="btn-secondary"
                  onClick={() => navigate(`/attendance/edit/${a.id}`)}
                >
                  Edit
                </button>

                {isAdmin && (
                  <button
                    className="btn-danger"
                    onClick={() => handleDelete(a.id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
