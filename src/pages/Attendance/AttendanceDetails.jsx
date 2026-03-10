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
        <div className="max-w-4xl mx-auto p-6">
          <Card className="p-6 border border-gray-200 shadow-sm rounded-xl">
      
            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              Attendance Details
            </h2>
      
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
              {/* Volunteer */}
              <div>
                <p className="text-sm text-slate-500">Volunteer ID</p>
                <p className="text-lg font-medium text-slate-800">
                  {attendance.volunteerId || "-"}
                </p>
              </div>
      
              {/* Project */}
              <div>
                <p className="text-sm text-slate-500">Project ID</p>
                <p className="text-lg font-medium text-slate-800">
                  {attendance.projectId || "-"}
                </p>
              </div>
      
              {/* Date */}
              <div>
                <p className="text-sm text-slate-500">Attendance Date</p>
                <p className="text-lg font-medium text-slate-800">
                  {formatDate(attendance.date)}
                </p>
              </div>
      
              {/* Recorded By */}
              <div>
                <p className="text-sm text-slate-500">Recorded By</p>
                <p className="text-lg font-medium text-slate-800">
                  {attendance.recordedBy || "-"}
                </p>
              </div>
      
              {/* Status */}
              <div>
                <p className="text-sm text-slate-500 mb-1">Status</p>
      
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    attendance.status === "Present"
                      ? "bg-green-100 text-green-700"
                      : attendance.status === "Absent"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {attendance.status || "-"}
                </span>
              </div>
      
            </div>
      
            {/* Footer */}
            <div className="border-t border-gray-200 mt-6 pt-4 flex justify-end">
              <button
                className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition"
                onClick={() => navigate("/attendance")}
              >
                Back to Attendance List
              </button>
            </div>
      
          </Card>
        </div>
      );
}
