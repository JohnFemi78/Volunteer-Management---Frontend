import React, {useState, useEffect} from 'react';
import { getAttendanceById } from '../../api/attendance';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';


export default function AttendanceDetails() {
    const [attendance, setAttendance] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate();
    const formatDate = (date) =>
    date ? new Date(date).toISOString().split("T")[0] : "-";

    useEffect(() => {
        let isMounted = true;
      async function LoadAttendance(){
        setIsLoading(true);
        setError(null);
        try {
           const res = await getAttendanceById(id);
           if (isMounted){
               setAttendance(res.data.attendance);
            }
        } catch (error) {
            console.error(error);
            if (isMounted){
                setError("Failed to fetch Attendance")
            }
        }   finally {
            setIsLoading(false);
        };
    };

      LoadAttendance();
        return () => {
        isMounted = false;
  };
    }, [id]);

    if (!id) {
     return <p className="text-red-500">Invalid Attendance ID</p>;
    }

    if (isLoading) return <p>Loading...</p>
    if (error) return <p className='text-red-500'>{error}</p>
    if (!attendance) return <p>No attendance data available.</p>
  return (
      <div>
        <Card>
        <h2 className="text-2xl font-semibold mb-4 text-slate-800">
          Attendance Details
        </h2>
        </Card>
        <Card>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-slate-700">Volunteer ID:</h3>
            {attendance && (
                <p className="text-slate-600">{attendance.volunteerId || "-"}</p>
            )}
            </div>
            <div>
            <h3 className="text-lg font-medium text-slate-700">Project ID:</h3>
            <p className="text-slate-600">{attendance.projectId || "-"}</p>
            </div>
            <div>
            <h3 className="text-lg font-medium text-slate-700">Date:</h3>
            <p className="text-slate-600">{formatDate(attendance.date) || "-"}</p>
            </div>
            <div>
            <h3 className="text-lg font-medium text-slate-700">Status:</h3>
            <p className="text-slate-600">{attendance.status || "-"}</p>
            </div>
            <div>
            <h3 className="text-lg font-medium text-slate-700">Documented By:</h3>
            <p className="text-slate-600">{attendance.recordedBy || "-"}</p>
            </div>
            </div>  
        </Card>
        <Card>
        <div>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => navigate('/attendance')}
            >
                Back to Attendance List
            </button>
        </div>
        </Card>
    
    </div>
  )
}
