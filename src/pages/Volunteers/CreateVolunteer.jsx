import React, { useState } from "react";
import Card from "../../components/ui/Card";
import { createVolunteer } from "../../api/volunteers";
import { useNavigate } from "react-router-dom";

export default function CreateVolunteer() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    skills: "",
    image: "",
    state: "",
    lga: "",

  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        ...form,
        skills: form.skills.split(",").map((s) => s.trim()),
      };

      await createVolunteer(payload);
      navigate("/volunteer/create");
    } catch (err) {
      setError("Failed to create volunteer");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

 return (
  <div className="max-w-xl mx-auto">
    <Card className="p-6 rounded-xl shadow-sm bg-white">
      <h2 className="text-2xl font-semibold mb-6 text-slate-800">
        Create Volunteer
      </h2>

      {error && (
        <p className="text-red-600 text-sm mb-4 bg-red-50 p-2 rounded">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter first name"
            onChange={handleChange}
            className="w-full rounded-md border border-slate-300 px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter last name"
            onChange={handleChange}
            className="w-full rounded-md border border-slate-300 px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="e.g. 08012345678"
            onChange={handleChange}
            className="w-full rounded-md border border-slate-300 px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Gender
          </label>
          <select
            name="gender"
            onChange={handleChange}
            className="w-full rounded-md border border-slate-300 px-3 py-2 bg-white
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Skills
          </label>
          <input
            type="text"
            name="skills"
            placeholder="e.g. Teaching, First Aid"
            onChange={handleChange}
            className="w-full rounded-md border border-slate-300 px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            placeholder="https://..."
            onChange={handleChange}
            className="w-full rounded-md border border-slate-300 px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            State
          </label>
          <input
            type="text"
            name="state"
            placeholder="State"
            onChange={handleChange}
            className="w-full rounded-md border border-slate-300 px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* LGA */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            LGA
          </label>
          <input
            type="text"
            name="lga"
            placeholder="Local Government Area"
            onChange={handleChange}
            className="w-full rounded-md border border-slate-300 px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-blue-600 text-white py-2.5
                     font-medium hover:bg-blue-700 transition
                     disabled:opacity-60 disabled:cursor-not-allowed
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {loading ? "Saving..." : "Create Volunteer"}
        </button>
      </form>
    </Card>
  </div>
);

}
