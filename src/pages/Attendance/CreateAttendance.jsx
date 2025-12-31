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
    <div className="max-w-2xl mx-auto p-6">
    <Card>
      <h2 className="text-xl font-semibold mb-4">
        Create Attendance
      </h2>

      {error && (
        <div className="mb-4 text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Project ID */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Project ID
          </label>
          <input
            type="text"
            name="projectId"
            value={form.projectId}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        {/* Volunteer ID */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Volunteer ID
          </label>
          <input
            type="text"
            name="volunteerId"
            value={form.volunteerId}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Status
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="input"
            required
          >
            <option value="">Select status</option>
            <option value="PRESENT">Present</option>
            <option value="ABSENT">Absent</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Attendance"}
          </button>

          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate("/attendance")}
          >
            Cancel
          </button>
        </div>

      </form>
    </Card>
  </div>
  );
}
