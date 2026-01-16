import React, { useState, useEffect } from "react";
import Card from "../../components/ui/Card";
import { getProjects, deleteProjectById } from "../../api/projects";
import { useNavigate } from "react-router-dom";

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProject() {
      setLoading(true);
      try {
        const res = await getProjects();
        setProjects(res.data);
      } catch (err) {
        console.error(err);
        setError("failed to load Projects");
      } finally {
        setLoading(false);
      }
    }
    
    loadProject();
  }, []);

  async function handleDeleteProject(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (!confirmDelete) return;
    try {
      await deleteProjectById(id);
      
      //remove deleted project from UI
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error(error);
      setError("Delete Failed");
    }
  }
  if (loading) {
    return <div className="p-6">Loading projects...</div>;
  }
  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Projects</h2>

        <button
          className="btn-primary text-1xl text-blue-600 hover:underline cursor-pointer"
          onClick={() => navigate("/CreateProject")}
        >
          Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <Card>
          <p className="text-slate-500 text-center">No Project Found</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <Card key={project.id}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">{project.projectName}</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    {project.projectDescription}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    className="btn-secondary"
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    View
                  </button>

                  <button
                    className="btn-danger"
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
