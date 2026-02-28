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
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-blue-50 p-8">
    <div className="max-w-6xl mx-auto">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Projects
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage and organize your volunteer projects
          </p>
        </div>

        <button
          onClick={() => navigate("/CreateProject")}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium shadow-md hover:bg-indigo-700 hover:shadow-lg transition"
        >
          + Add Project
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center text-gray-500 mt-10">
          Loading projects...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 mb-6 rounded-xl bg-red-50 text-red-600 border border-red-200">
          {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && projects.length === 0 && (
        <div className="bg-white rounded-2xl shadow-md p-10 text-center border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700">
            No Projects Yet
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Start by creating your first project.
          </p>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
          key={project.id}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 border border-gray-100 flex flex-col justify-between"
        >
          {/* Top Section */}
          <div>
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-semibold text-gray-800">
                {project.projectName}
              </h3>
        
              {/* Example Status Badge (optional) */}
              {project.status && (
                <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600 font-medium">
                  {project.status}
                </span>
              )}
            </div>
        
            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {project.projectDescription}
            </p>
        
            {/* Small Project Details */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 border-t pt-4">
              <div>
                <p className="font-medium text-gray-700">Start Date</p>
                <p>{project.startDate ? new Date(project.startDate).toLocaleDateString() : "N/A"}</p>
              </div>
        
              <div>
                <p className="font-medium text-gray-700">End Date</p>
                <p>{project.endDate ? new Date(project.endDate).toLocaleDateString() : "N/A"}</p>
              </div>
            </div>
          </div>
        
          {/* Action Buttons */}
          <div className="flex gap-2 mt-6">
            <button
              onClick={() => navigate(`/projects/${project.id}`)}
              className="flex-1 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
            >
              View Details
            </button>
        
            <button
              onClick={() => navigate(`/projects/edit/${project.id}`)}
              className="px-4 py-2 rounded-xl border border-indigo-300 text-indigo-600 text-sm hover:bg-indigo-50 transition"
            >
              Edit
            </button>
        
            <button
              onClick={() => handleDeleteProject(project.id)}
              className="px-4 py-2 rounded-xl border border-red-300 text-red-600 text-sm hover:bg-red-50 transition"
            >
              Delete
            </button>
          </div>
        </div>
        ))}
      </div>

    </div>
  </div>
);
}
