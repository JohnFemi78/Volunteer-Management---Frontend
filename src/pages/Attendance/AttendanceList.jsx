import React, { useState, useEffect } from "react";
import { deleteAttendanceById, getAttendance } from "../../api/attendance";
import Card from "../../components/ui/Card";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../../utils/auth";

export default function AttendanceList() {
  const [attendance, setAttendance] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const ADMIN = isAdmin();

  useEffect(() => {
    async function loadAttendance() {
      try {
        setLoading(true);
        const res = await getAttendance();
        setAttendance(res.data.attendance || []);
        
      } catch (err) {
        console.error(err);
        setError("Failed to load attendance");
      } finally {
        setLoading(false);
      }
    }
    loadAttendance();
  }, []);

  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this attendance?"
    );
    if (!confirmDelete) return;

    try {
      await deleteAttendanceById(id);
      setAttendance((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete attendance");
    }
  }

  if (loading) {
    return <div className="p-6">Loading attendance...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
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
        <Card className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Volunteer
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Project
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Date
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {attendance.map((attendance) => (
                <tr
                  key={attendance.id}
                  className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
                >
                  <td className="px-4 py-3">
                    {attendance.volunteer?.firstName} {attendance.volunteer?.lastName}
                  </td>

                  <td className="px-4 py-3">{attendance.id}</td>
                  <td className="px-4 py-3">{attendance.status}</td>
                  <td className="px-4 py-3">
                    {new Date(attendance.date).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-3">
                      <button
                        className="btn-secondary"
                        onClick={() => navigate(`/attendance/${attendance.id}`)}
                      >
                        View
                      </button>

                      <button
                        className="btn-secondary"
                        onClick={() =>
                          navigate(`/attendance/edit/${attendance.id}`)
                        }
                      >
                        Edit
                      </button>

                      {ADMIN && (
                        <button
                          className="btn-danger"
                          onClick={() => handleDelete(attendance.id)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
