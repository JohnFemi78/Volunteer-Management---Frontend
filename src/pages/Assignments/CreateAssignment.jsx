import React, { useState } from 'react'
import { createAssign } from '../../api/assigns';
import Card from '../../components/ui/Card';
import { useNavigate } from 'react-router-dom';

export default function CreateAssignment() {
    const [form, setForm] = useState({
        volunteerId: "",
        projectId: "",
        assignedDate: "",
        role: "",
        status: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    function changeHandler(e) {
        setForm({...form,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
           const payLoad = {
            ...form,
          volunteerId: Number(form.volunteerId),
          projectId: Number(form.projectId),
           };
           await createAssign(payLoad);
           navigate('/assignment') 
        } catch (error) {
            console.error(error);
            setError('Failed to create assignment')
        }   finally {
            setLoading(false);
        }
    }

  return (
    <div className='max-w-xl mx-auto'>
      <Card className='p-6 rounded-xl shadow-sm bg-white'>
        <h2 className='text-2xl font-semibold mb-6 text-slate-800'>
            Assign Project
        </h2>

        {error && (
            <p className='text-red-600 text-sm mb-4 bg-red-50 p-2 rounded'>
                {error}
            </p>
        )}

        <form onSubmit={handleSubmit} className='space-y-5'>
            {/* Volunteer ID */}
            <div>
            <label htmlFor="volunterId" className='block text-sm font-medium text-slate-600 mb-1'>Volunteer ID</label>
            <input type="number" name='volunteerId' 
            placeholder='Enter Volunteer ID'
            onChange={changeHandler} className="w-full rounded-md border border-slate-300 px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            {/* Project ID */}

            <div>
            <label htmlFor="projectId" className='block text-sm font-medium text-slate-600 mb-1'>Project ID</label>
            <input type="number" name='projectId' 
            placeholder='Enter Project ID'
            onChange={changeHandler} className="w-full rounded-md border border-slate-300 px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            {/* Assignment Date */}

            <div>
            <label htmlFor="assignDate" className='block text-sm font-medium text-slate-600 mb-1'>Date Assigned</label>
            <input type="date" name='assignedDate' 
            placeholder='Date of Assignment'
            onChange={changeHandler} className="w-full rounded-md border border-slate-300 px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>

            {/* Assignment Role */}

            <div>
            <label htmlFor="Assignment Role" className='block text-sm font-medium text-slate-600 mb-1'>Role</label>
            <select type="text" name='role' 
            placeholder='Enter Volunteer role'
            onChange={changeHandler} className="w-full rounded-md border border-slate-300 px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500"> 
                <option value="">Select Role</option>
                <option value="FIELD_WORKER">Field Worker</option>
                <option value="COMMUNITY_MOBILIZER">Community Mobilizer</option>
                <option value="DATA_COLLECTOR">Data Collector</option>
                <option value="FACILITATOR">Facilitator</option>
            </select>
            </div>

            {/* Project Status */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Assignment Status
          </label>
          <select name='status' onChange={changeHandler}
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
          disabled={loading}
          className="w-full rounded-md bg-blue-600 text-white py-2.5
                     font-medium hover:bg-blue-700 transition
                     disabled:opacity-60 disabled:cursor-not-allowed
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {loading ? "Saving..." : "Create Assignment"}
        </button>
            
        </form>

      </Card>
    </div>
  )
}
