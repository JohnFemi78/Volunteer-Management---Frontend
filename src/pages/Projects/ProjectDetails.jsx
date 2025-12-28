import Reac, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { projects } from "../../mock/data";
import Card from "../../components/ui/Card";
import { getProjectById } from "../../api/projects";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProject() {
      try {
        setLoading(true);
        const data = await getProjectById(id); //axios call
        setProject(data);
      } catch (error) {
        console.error(error)
        setError("Unable to load project");
      }finally {
        setLoading(false)
      }
    }
    loadProject();
  }, [id]);

  if (loading) return <div className='p-4'>Loading project...</div>;
  if (error) return <div className='p-4 text-red-500'>{error}</div>;
  if (!project) return <div className='p-4'>Project not found</div>;


  return (
    <div className="max-w-5xl mx-auto p-4">
      <Card className="p-4">
        <h2 className="text-2xl font-semibold">{project.projectName}</h2>
        <p className="text-sm text-slate-500 mt-2">{project.description}</p>

        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-slate-500">Start</div>
            <div>{project.startDate}</div>
          </div>

          <div>
            <div className="text-slate-500">End</div>
            <div>{project.endDate}</div>
          </div>

          <div>
            <div className="text-slate-500">Status</div>
            <div>{project.status}</div>
          </div>
        </div>
      </Card>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="font-semibold">Assigned Volunteers</h3>
          <p className="text-sm text-slate-500">No assigned volunteers (mock)</p>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold">Project Activity</h3>
          <p className="text-sm text-slate-500">No activity (mock)</p>
        </Card>
      </div>
    </div>
  );
}
