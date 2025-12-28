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

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      async function loadVolunteer() {
        try {
            const res = await getVolunteerById(id);
            setForm(res.data);
            
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
        navigate("/volunteers");

    }

    function renderSkills(e) {
        const value = e.target.value;
        setForm({
            ...form,
            skills: value.split(",").map((s) => s.trim()).filter(Boolean)   
        });
    }

    if (loading) return <div>Loading...</div>
    
    return(
        <Card className="p-6 max-w-xl mx-auto">
            <h2 className="text-xl font-semibold mb-4"> Edit Volunteer</h2>

        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
          />
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />

          <select name="gender" value={form.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
          <input
            name="skills"
            value={form.skills.join(", ")}
            placeholder="skills (comma seprated)"
            onChange={renderSkills}
          />
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
          />
          <input
            name="state"
            value={form.state}
            onChange={handleChange}
          />
          <input
            name="lga"
            value={form.lga}
            onChange={handleChange}
          />

            <button className="btn-primary w-full">
                update Volunteer
            </button>

            </form>


        </Card>
    );
}   