import React, { useState } from 'react';
import { createProject } from '../../api/projects';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';

export default function CreateProject() {
    const navigate = useNavigate();
    const emptyForm = {
      projectName: '',
      description: '',
      startDate: '',
      endDate: '',
      status: ''
    };
    const [form, setForm] = useState(emptyForm);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    
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
            
      await createProject(form);
      setForm(emptyForm);
      navigate("projects");
        } catch (error) {
          console.error(error);
          setError("Failed to create project");  
        } finally {
          setLoading(false);
        }
    }


  return (
  <div className="max-w-xl mx-auto">
    <card className="flex justify-center">
    <p className="font-semibold text-3xl text-indigo-600 cursor-pointer hover:underline transition"
     onClick={() => navigate('/projects')}
     >Back</p>
    </card>
    <Card className="p-6 rounded-xl shadow-sm bg-white">
      <h2 className="text-2xl font-semibold mb-6 text-slate-800">
        Create Project
      </h2>

      {error && (
        <p className="text-red-600 text-sm mb-4 bg-red-50 p-2 rounded">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Project Name */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Project Name
          </label>
          <input
            type="text"
            name="projectName"
            value={form.projectName}
            placeholder="Enter project Name"
            onChange={handleChange}
            className="w-full rounded-md border border-slate-300 px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Project Description */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Project Desription
          </label>
          <input
            type="text"
            name="description"
            value={form.description}
            placeholder="Enter Project Description"
            onChange={handleChange}
            className="w-full rounded-md border border-slate-300 px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Start Date
          </label>
          <input
            type='date'
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-300 px-3 py-2 bg-white
                       focus:outline-none focus:ring-2 focus:ring-blue-500">   
          </input>
        </div>
        {/* End Date */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            End Date
          </label>
          <input
            type='date'
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-300 px-3 py-2 bg-white
                       focus:outline-none focus:ring-2 focus:ring-blue-500">   
          </input>
        </div>
        {/* Project Status */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Project Status
          </label>
          <select name='status'
          value={form.status}
           onChange={handleChange}
            className="w-full rounded-md border border-slate-300 px-3 py-2 bg-white
                       focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">SelectStatus</option>  
            <option value="ongoing">Ongoing</option>  
            <option value="completed">Completed</option>  
            <option value="paused">Paused</option>  
          </select>
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
          {loading ? "Saving..." : "Create Project"}
        </button>
      </form>
    </Card>
  </div>
);
}
