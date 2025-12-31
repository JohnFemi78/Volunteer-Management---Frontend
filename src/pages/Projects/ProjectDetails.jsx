import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/ui/Card";
import { getProjectById } from "../../api/projects";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const loadProject = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getProjectById(id);
        if (isMounted) {
          setProject(response.data);
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setError("Unable to load project");
        }
      }finally {
        if (isMounted) {
        setLoading(false);
      }
    }
    };
  
    loadProject();

    return () => {
      isMounted = false;
    };
  }, [id]);
   
  if (loading) return <div className='p-4'>Loading project...</div>;
  if (error) return <div className='p-4 text-red-500'>{error}</div>;
  if (!project) return <div className='p-4'>Project not found</div>;

  const formatDate = (date) => 
    date ? new Date(date).toLocaleDateString() : "-";

  return (
    <div className="max-w-5xl mx-auto p-4">
      <Card className="p-5">
        <h2 className="text-2xl font-semibold">
          {project.projectName || "Untitled Project"}
        </h2>

        <p className="text-sm text-slate-500 mt-2">
          {project.description || "No description provided."}
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-slate-500">Start Date</div>
            <div>{formatDate(project.startDate)}</div>
          </div>

          <div>
            <div className="text-slate-500">End Date</div>
            <div>{formatDate(project.endDate)}</div>
          </div>

          <div>
            <div className="text-slate-500">Status</div>
            <span className="inline-block mt-1 px-2 py-1 rounded bg-slate-100 text-slate-700">
              {project.status || "Unknown"}
            </span>
          </div>
        </div>
      </Card>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="font-semibold">Assigned Volunteers</h3>
          <p className="text-sm text-slate-500 mt-2">
            No assigned volunteers yet.
          </p>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold">Project Activity</h3>
          <p className="text-sm text-slate-500 mt-2">
            No activity recorded yet.
          </p>
        </Card>
      </div>
    </div>
  );
}