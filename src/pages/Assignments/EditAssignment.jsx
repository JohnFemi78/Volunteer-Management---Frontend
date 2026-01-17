import React, { useState, useEffect } from 'react';
import { updateAssignById, getAssignsById } from '../../api/assigns';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';

export default function EditAssignment() {
    const {id} = useParams();
    // const [assignment, setAssignment] = useState("");
    const [form, setForm] = useState({
            volunteerId: "",
            projectId: "",
            assignedDate: "",
            role: "",
            status: "",
        });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const formattedDate = new Date().toISOString().split("T")[0];

    useEffect(() => {
        setIsLoading(true);
        async function LoadAssignment(){
            setIsLoading(true);
            try {
               const res = await getAssignsById(id); 
               const assignment = res?.data?.assignment;
               console.log('Assignment Data:', res.data.assignment);
               setForm({
                volunteerId: assignment.volunteerId || "",
                projectId: assignment.projectId || "",
                assignedDate: assignment.assignedDate || "",
                role: assignment.role || "",
                status: assignment.status || "",
               });
               console.log("AssignmentData:", res);
            } catch (error) {
                console.error(error);  
                setError("Failure to load Assignment")             
            }finally{
                setIsLoading(false);
            }
        }
        LoadAssignment();
        }, [id]);
  async function handleChange(e){
    setForm({
      ...form,
      [e.target.name]: e.target.value  
    })
  };

  async function handleSubmit(e){
    e.preventDefault();

    const payload = {
    volunteerId: Number(form.volunteerId),
    projectId: Number(form.projectId),
    assignedDate: new Date(form.assignedDate),
    role: form.role,
    status: form.status,
  };

    await updateAssignById(id, payload);
    navigate('/assignmentLists');
  }
      
  return (
     <div className="max-w-xl mx-auto">
        <p className="text-3xl text-amber-950 hover:bg-blue-200 hover:shadow-amber-300"
         onClick={() => navigate('/assignmentLists')}
         >Back</p>
        <Card className="p-6 rounded-xl shadow-sm bg-white">
          <h2 className="text-2xl font-semibold mb-6 text-slate-800">
            Update Assignment
          </h2>
    
          {error && (
            <p className="text-red-600 text-sm mb-4 bg-red-50 p-2 rounded">
              {error}
            </p>
          )}
    
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Assignment ID */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Volunteer ID
              </label>
              <input
                type="number"
                name="volunteerId"
                value={form.volunteerId}
                placeholder="Enter Volunteer ID"
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 px-3 py-2
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
    
            {/* Project ID */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Project ID
              </label>
              <input
                type="number"
                name="projectId"
                value={form.projectId}
                placeholder="Enter Project ID"
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 px-3 py-2
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
    
            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Assignment Date
              </label>
              <input
                type='date'
                name="assignedDate"
                value={formattedDate}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 px-3 py-2 bg-white
                           focus:outline-none focus:ring-2 focus:ring-blue-500">   
              </input>
            </div>
            {/* Role */}
            <div>
            <label htmlFor="Assignment Role" className='block text-sm font-medium text-slate-600 mb-1'>Role</label>
            <select type="text" name='role' 
            placeholder='Enter Volunteer role'
            onChange={handleChange} className="w-full rounded-md border border-slate-300 px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500"> 
                <option value="">Select Role</option>
                <option value="FIELD_WORKER">Field Worker</option>
                <option value="COMMUNITY_MOBILIZER">Community Mobilizer</option>
                <option value="DATA_COLLECTOR">Data Collector</option>
                <option value="FACILITATOR">Facilitator</option>
            </select>
          </div>

              {/* Assignment Status */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            status
          </label>
          <select name='status' onChange={handleChange}
            className="w-full rounded-md border border-slate-300 px-3 py-2 bg-white
                       focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">SelectStatus</option>  
            <option value="ACTIVE">Ongoing</option>  
            <option value="COMPLETED">Completed</option>  
            <option value="SUSPENDED">Suspended</option>  
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
              {isLoading ? "Saving..." : "Edit - Assignment"}
            </button>
          </form>
        </Card>
      </div>
  )
}
