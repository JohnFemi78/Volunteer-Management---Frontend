import React, {useState} from "react";
import Card from "../../components/ui/Card";
import { createAttendance } from "../../api/attendance";
import { useNavigate } from "react-router-dom";

export default function CreateAttendance() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    projectId: "",
    volunteerId : "",
    date : "",
    status : "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  function handleChange(e) {
  setForm({
    ...form,
    [e.target.name]: e.target.value,    
  });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    
    try {
      const payload = {...form};
      console.log(payload);
      await createAttendance(payload);
      navigate("/attendance");
    } catch (err) {
      setError("Failed to create attendance",);
      console.error(err);
    } finally {
      setLoading(false);
      
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center p-6">
    <div className="w-full max-w-xl">
      <Card className="shadow-xl rounded-2xl border border-gray-100 p-8 backdrop-blur-sm bg-white/90">

        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Create Attendance
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Record volunteer attendance for a project
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Project ID */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Project ID
            </label>
            <input
              type="text"
              name="projectId"
              value={form.projectId}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition shadow-sm"
              required
            />
          </div>

          {/* Volunteer ID */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Volunteer ID
            </label>
            <input
              type="text"
              name="volunteerId"
              value={form.volunteerId}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition shadow-sm"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition shadow-sm"
              required
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition shadow-sm"
              required
            >
              <option value="">Select status</option>
              <option value="PRESENT">Present</option>
              <option value="ABSENT">Absent</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white font-medium shadow-md hover:bg-indigo-700 hover:shadow-lg transition disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Attendance"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/attendance")}
              className="flex-1 py-2.5 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>

        </form>
      </Card>
    </div>
  </div>
);
}
