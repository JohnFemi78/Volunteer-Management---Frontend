import React, {useState, useEffect} from "react";
import Card  from "../../components/ui/Card";
import { getAssignsById } from "../../api/assigns";
import { useParams } from "react-router-dom";


export default function Attendance() {
  const [assignment, setAssignment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const {id} = useParams();

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
  }, [id]);

  if (isLoading) return <p>Loading...</p>;
  if (error)  return <p className="text-red-500">{error}</p>;
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <h2 className="text-2xl font-semibold mb-4 text-slate-800">
          Assignment Details
        </h2>   
          <div>
            <span className="font-medium text-slate-600">Volunteer ID: </span>  
            <span className="text-slate-800">{assignment.volunteerId}</span>
          </div>
          <div>
            <span className="font-medium text-slate-600">Project ID: </span>  
            <span className="text-slate-800">{assignment.projectId}</span>
          </div>
         
          <div>  
            <span className="font-medium text-slate-600">End Date: </span>  
            <span className="text-slate-800">{formatDate(assignment.assignedDate)}</span>
          </div>    
          <div>  
            <span className="font-medium text-slate-600">Status: </span>  
            <span className="text-slate-800">{assignment.status}</span>
          </div>  
          <div>  
            <span className="font-medium text-slate-600">Role: </span>  
            <span className="text-slate-800">{assignment.role}</span>
          </div>
      </Card>
      <h2>
        <button
          className="mt-4 text-blue-600 hover:underline"
          onClick={() => window.history.back()}
        >
          Back
        </button>
      </h2>
      
    </div>
  );
}
