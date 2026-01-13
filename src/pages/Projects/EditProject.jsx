import React, { useState, useEffect } from 'react'
import { updateProject, getProjectById } from '../../api/projects';
import { useParams, useNavigate } from 'react-router-dom';


export default function EditProject() {
    const [project, setProject] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate();

    const [form, setForm] = ({
        projectName: '',
        description: '',
        startDate: '',
        endDate: '',
        status: ''
    });

    useEffect(() => {
    async function loadProject() {
        setIsLoading(true);
        try {
          const res = await getProjectById(id);
          const p = res?.data?.project;
          setForm({
            projectName: p.projectName || "",
            description: p.description || "",
            startDate: p.startDate || "",
            endDate: p.endDate || "",
            status: p.status || ""
          });
          console.log("ResData:", res.data);
        } catch (error) {
          console.error(error)  
        } finally{
           setIsLoading(false);
        }
    }
     loadProject(); 
    }, [id]);

    function handleChange(e){
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    };

    async function handleSubmit(e){
        e.preventDefault();
        await updateProject(id, form);
        navigate(`./projects/${id}`);
    };

    if (isLoading) return <div>Loading...</div>
    if (error) return <div className='text-2xl, text-red-500'>{error}</div>

  return (
     <div className="max-w-xl mx-auto">
        <p className="text-3xl text-amber-950 hover:bg-blue-200 hover:shadow-amber-300" onClick={() => navigate('./projects')}>Back</p>
        <Card className="p-6 rounded-xl shadow-sm bg-white">
          <h2 className="text-2xl font-semibold mb-6 text-slate-800">
            Update Project
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
              disabled={isLoading}
              className="w-full rounded-md bg-blue-600 text-white py-2.5
                         font-medium hover:bg-blue-700 transition
                         disabled:opacity-60 disabled:cursor-not-allowed
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isLoading ? "Saving..." : "Update Project"}
            </button>
          </form>
        </Card>
      </div>
    
  )
}
