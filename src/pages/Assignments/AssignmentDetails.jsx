import React, {useState, useEffect} from "react";
import Card  from "../../components/ui/Card";
import { getAssignsById } from "../../api/assigns";
import { useParams, useNavigate } from "react-router-dom";


export default function Attendance() {
  const [assignment, setAssignment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const {id} = useParams();
  const navigate = useNavigate();

  function formatDate(dateString) {
  if (!dateString) return "-";
  return new Date(dateString).toISOString().split("T")[0];
}

  useEffect(() => {

    let isMounted = true;
    async function loadAssignment() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await getAssignsById(id);
        if(isMounted) {
          setAssignment(res.data.assignment);
        }
     
      } catch (error) {
        console.error(error);
        if(isMounted){
          
          setError("Failed to load Assignment");
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadAssignment();

    return () => {
      isMounted = false;
    };  
  }, [id]);
  if (!assignment) return null;

  if (isLoading) return <p>Loading...</p>;
  if (error)  return <p className="text-red-500">{error}</p>;
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="p-6 shadow-md border border-gray-200 rounded-xl">
        
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Assignment Details
        </h2>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  
          {/* Volunteer */}
          <div>
            <p className="text-sm text-slate-500">Volunteer ID</p>
            <p className="text-lg font-medium text-slate-800">
              {assignment.volunteerId}
            </p>
          </div>
  
          {/* Project */}
          <div>
            <p className="text-sm text-slate-500">Project ID</p>
            <p className="text-lg font-medium text-slate-800">
              {assignment.projectId}
            </p>
          </div>
  
          {/* Assigned Date */}
          <div>
            <p className="text-sm text-slate-500">Assigned Date</p>
            <p className="text-lg font-medium text-slate-800">
              {formatDate(assignment.assignedDate)}
            </p>
          </div>
  
          {/* Role */}
          <div>
            <p className="text-sm text-slate-500">Role</p>
            <p className="text-lg font-medium text-slate-800">
              {assignment.role}
            </p>
          </div>
  
          {/* Status */}
          <div>
            <p className="text-sm text-slate-500 mb-1">Status</p>
  
            <span
              className={`px-3 py-1 text-sm rounded-full font-medium ${
                assignment.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {assignment.status}
            </span>
          </div>
  
        </div>
  
        {/* Divider */}
        <div className="border-t border-gray-200 mt-6 pt-4 flex justify-end">
  
          <button
            className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
  
        </div>
  
      </Card>
    </div>
  );
}
