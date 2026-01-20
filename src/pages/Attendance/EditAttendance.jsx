import React, {useEffect, useState} from 'react'
import { getAttendanceById } from '../../api/attendance';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import { isAdmin } from '../../utils/auth';


export default function EditAttendance() {
  const [attendance, setAttendance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const {id} = useParams();
  const ADMIN = isAdmin;
  const navigate = useNavigate();
  const [form, setForm] = useState({
     projectId: "",
     volunteerId : "",
     date : "",
     status : "",
  })

  useEffect(() => {
    async function LoadAttendance(){
      try {
        setIsLoading(true);
        const res = await getAttendanceById(id);
        const attendance = res?.data?.attendance;
        setAttendance({
           projectId: attendance.projectId || "-",
           volunteerId : attendance.volunteerId || "-",
           date : attendance.date || "-",
           status : attendance.status || "-",
        });
        
      } catch (error) {
        console.error(error);
        setError("Failure to Edit Attendance");
      }finally{
        setIsLoading(false);
      }
    }
    LoadAttendance();
    
  }, [id]);

  if (!ADMIN) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <p className='text-lg text-red-600 font-semibold'>
          Access Denied - Admin Only
        </p>
      </div>
    )
  }

  const formattedDate = new Date().toISOString().split("T")[0];
async function handleSubmit(e) {
  e.preventDefault();
 const payload = {
    projectId: Number(form.projectId),
    volunteerId : Number(attendance.volunteerId),
    date : form.date ,
    status : form.status,
 }
 await getAttendanceById(id, payload);
 navigate('/attendance');
}

async function handleChange(e){
  setForm({...form,
  [e.target.name] :
  e.target.value})
};


  if (isLoading) return <p>Loading...</p>
  if (error) return <p className='text-4xl text-red-500'>{error}</p>

  return (
    
    <div className="max-w-xl mx-auto">
           <p className="text-3xl text-amber-950 hover:bg-blue-200 hover:shadow-amber-300"
            onClick={() => navigate('/assignmentLists')}
            >Back</p>
           <Card className="p-6 rounded-xl shadow-sm bg-white">
             <h2 className="text-2xl font-semibold mb-6 text-slate-800">
               Edit Assignment
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
                 {isLoading ? "Saving..." : "Edit - Attendance"}
               </button>
             </form>
           </Card>
         </div>
        )
      
}
