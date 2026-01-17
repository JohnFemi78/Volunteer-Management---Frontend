import React, { useState, useEffect } from 'react'
import { getAssigns, deleteAssignsById, getAssignsById } from '../../api/assigns';
import { useNavigate } from 'react-router-dom';


export default function AssignmentLists() {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [assignment, setAssignment] = useState(null);
  
    useEffect(() => {
      async function loadAssignments() {
        try {
          setLoading(true);
          const res = await getAssigns();
          setAssignments(res.data.assignments || []);
        } catch (err) {
          console.error(err);
          setError("Failed to load assignments");
        } finally {
          setLoading(false);
        }
    }
    loadAssignments();
    },[]);

    async function handleView (id) {
      try {
        const assignment = await getAssignsById(id);
        setAssignment(assignment.data.assignment);
        
      
      } catch (error) {
        console.error("View Failed", error);
        setError("Unable to fetch assignment details.");
      }
    };

    async function deleteAssignment(id) {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this assignment?"
      );
      if (!confirmDelete) return;
      try {
        await deleteAssignsById(id);
        setAssignments((prevAssignments) =>
          prevAssignments.filter((assignment) => assignment.id !== id)
        );
      } catch (error) {
        console.error("Delete Failed", error);
        setError("Unable to delete assignment.");
      }
    }

    if (loading) return <div className='p-4'>Loading assignments...</div>;
    if (error) return <div className='p-4 text-red-500'>{error}</div>;
    if (!assignments) return <div className='p-4'>Assignments not found</div>;
    

  return (
          <div className="max-w-6xl mx-auto p-6">
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-2xl font-semibold">Assignments</h2>

    <button
      className="btn-primary"
      onClick={() => navigate("/assignment")}
    >
      Add Assignment
    </button>
  </div>

  {assignments.length === 0 ? (
    <Card>
      <p className="text-slate-500">No Assignments found</p>
    </Card>
  ) : (
    <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
              Volunteer
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
              Project
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
              Duration
            </th>
            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {assignments.map((assignment) => (
            <tr key={assignment.id} className= "odd:bg-white even:bg-gray-50 hover:bg-gray-100">
              <td className="px-4 py-3">
                <div className="font-medium text-gray-900">
                  {assignment.volunteer.firstName}{" "}
                  {assignment.volunteer.lastName}
                </div>
              </td>

              <td className="px-4 py-3">
                <div className="text-sm font-medium text-gray-900">
                  {assignment.project.projectName}
                </div>
                <div className="text-xs text-gray-500">
                  {assignment.project.projectDetails}
                </div>
              </td>

              <td className="px-4 py-3 text-sm text-gray-600">
                {assignment.project.projectStartDate} –{" "}
                {assignment.project.projectEndDate}
              </td>

              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => navigate(`/assignmentDetails/${assignment.id}`)}
                    className="text-sm font-medium text-indigo-600 hover:underline"
                  >
                    View
                  </button>

                  <button onClick={() => navigate(`/assignment/edit/${assignment.id}`)}
                    className="text-sm font-medium text-green-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteAssignment(assignment.id)}
                    className="text-sm font-medium text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>
  );
}
