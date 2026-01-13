import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import { getVolunteerById, updateVolunteer } from "../../api/volunteers";


export default function EditVolunteer() {
    const {id } = useParams();
    const navigate = useNavigate();
    

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        gender: "",
        skills: [],
        image: "",
        state: "",
        lga: "",
    
      });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
      async function loadVolunteer() {
        setLoading(true);
        try {
            const res = await getVolunteerById(id);
            const v = res?.data?.volunteer;
            setForm({
                firstName: v.firstName || "",
                lastName: v.lastName || "",
                phone: v.phone || "",
                gender: v.gender || "",
                skills: Array.isArray(v.skills)
                ? v.skills : typeof v.skills === "string" ?
                v.skills.split(",").map(s => s.trim()) : [],
                image: v.image || "",
                state: v.state || "",
                lga: v.lga || "",
            });
            console.log("ResData:", res.data);
            
        } catch (error) {
        console.error(error)
        }finally {
            setLoading(false);
        }
      }
      loadVolunteer();
    }, [id]);

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await updateVolunteer(id, form);
        navigate(`/volunteer/${id}`);

    }

    function renderSkills(e) {
        const value = e.target.value;
        setForm({
            ...form,
            skills: value.split(",").map((s) => s.trim()).filter(Boolean)   
        });
    }

    if (loading) return <div>Loading...</div>
    
   return (
  <Card className="max-w-xl mx-auto p-6 shadow-sm rounded-xl bg-white">
    <h2 className="text-2xl font-semibold mb-6 text-slate-800">
      Edit Volunteer
    </h2>

    <form onSubmit={handleSubmit} className="space-y-5">
      {/* First Name */}
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">
          First Name
        </label>
        <input
          type="text"
          name="firstName"
          value={form.firstName}
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
          value={form.lastName}
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
          value={form.phone}
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
          value={form.gender}
          onChange={handleChange}
          className="w-full rounded-md border border-slate-300 px-3 py-2
                     bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          value={Array.isArray(form.skills) ? form.skills.join(", ") : ""}
          placeholder="e.g. Teaching, First Aid, Data Collection"
          onChange={renderSkills}
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
          value={form.image}
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
          value={form.state}
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
          value={form.lga}
          onChange={handleChange}
          className="w-full rounded-md border border-slate-300 px-3 py-2
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full rounded-md bg-blue-600 text-white py-2.5
                   font-medium hover:bg-blue-700 transition
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Update Volunteer
      </button>
    </form>
  </Card>
);

}   