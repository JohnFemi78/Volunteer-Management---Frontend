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
      navigate("/volunteers");
    } catch (err) {
      setError("Failed to create volunteer");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Create Volunteer</h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            name="firstName"
            placeholder="firstName"
            className="input"
            onChange={handleChange}
          />
          <input
            name="lastName"
            placeholder="lastName"
            className="input"
            onChange={handleChange}
          />
          <input
            name="phone"
            placeholder="phone"
            className="input"
            onChange={handleChange}
          />

          <select name="gender" className="input" onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
          <input
            name="skills"
            placeholder="Skills (comma seprated)"
            className="input"
            onChange={handleChange}
          />
          <input
            name="image"
            placeholder="image URL"
            className="input"
            onChange={handleChange}
          />
          <input
            name="state"
            placeholder="State"
            className="input"
            onChange={handleChange}
          />
          <input
            name="lga"
            placeholder="LGA"
            className="input"
            onChange={handleChange}
          />

          <button disabled={loading} className="btn-primary w-full">
            {loading ? "Saving..." : "Create Volunteer"}
          </button>
        </form>
      </Card>
    </div>
  );
}
