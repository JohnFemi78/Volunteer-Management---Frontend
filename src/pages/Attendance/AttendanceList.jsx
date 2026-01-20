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
   <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  {/* Header */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
    <div>
      <h2 className="text-2xl font-bold text-slate-800">Attendance</h2>
      <p className="text-sm text-slate-500">
        Manage volunteer attendance records
      </p>
    </div>

    <button
      onClick={() => navigate("/attendance/create")}
      className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      + Add Attendance
    </button>
  </div>

  {/* Empty State */}
  {attendance.length === 0 ? (
    <Card className="py-16 text-center">
      <p className="text-slate-500 text-sm">
        No attendance records found.
      </p>
    </Card>
  ) : (
    <Card className="overflow-hidden border border-slate-200 rounded-xl">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                Volunteer
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                Project
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                Status
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                Date
              </th>
              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 bg-white">
            {attendance.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-slate-50 transition"
              >
                <td className="px-5 py-4 text-sm text-slate-800 whitespace-nowrap">
                  {item.volunteer?.firstName} {item.volunteer?.lastName}
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {item.id}
                </td>

                {/* Status Badge */}
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium
                      ${
                        item.status === "PRESENT"
                          ? "bg-green-100 text-green-700"
                          : item.status === "ABSENT"
                          ? "bg-red-100 text-red-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="px-5 py-4 text-sm text-slate-600 whitespace-nowrap">
                  {new Date(item.date).toLocaleDateString()}
                </td>

                <td className="px-5 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() =>
                        navigate(`/attendanceDetails/${item.id}`)
                      }
                      className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 transition"
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        navigate(`/attendance/edit/${item.id}`)
                      }
                      className="rounded-md border border-blue-300 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 transition"
                    >
                      Edit
                    </button>

                    {ADMIN && (
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="rounded-md border border-red-300 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition"
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
      </div>
    </Card>
  )}
</div>

  );
}
