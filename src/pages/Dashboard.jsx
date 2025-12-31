import React,{useEffect, useState} from "react";
import Card from '../components/ui/Card'
import { getVolunteers } from "../api/volunteers";
import { getProjects } from "../api/projects";
import { getAttendance } from "../api/attendance";
import { getAssigns } from "../api/Assigns";
import { data } from "react-router-dom";


export default function Dashboard() {
  const [volunteers, setVolunteers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState([]);
  const [assigns, setAssigns] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() => {
    let isMounted = true;
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError(null);

        const [volRes, projRes, attendanceRes, assignsRes] = await Promise.all([
          getVolunteers(),
          getProjects(),
          getAttendance(),
          getAssigns(),
        ]);
       
        if (!isMounted) return;
        
        setVolunteers(volRes.data.volunteers || []);
        setProjects(projRes.data || []);
        setAttendance(attendanceRes.data || []);
        setAssigns(assignsRes.data.assignments || []);     
      } catch (err) {
        console.error("Dashboard load failed", err);
        if (isMounted) {
          setError("Unable to load dashboard data.")
        }
      }finally {
        if (isMounted) {
          setLoading(false);
        }
        
      }
      
    };

    loadDashboard();
    return () => {
      isMounted = false
    };
  }, []);

  const totalVolunteers = volunteers.length;
  const totalProjects = projects.length;

  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  const attendanceToday = attendance.filter((a) =>
    a?.date?.startsWith(today)
  ).length;

 const activeAssigns = assigns.filter(a => a.status?.toLowerCase() === "active").length;

  // ---------- UI states ----------
  if (loading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }
  return (
    <div className="max-w-7xl mx-auto">
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <div className="text-sm text-slate-500">Total Volunteers</div>
          <div className="text-2xl font-semibold">{totalVolunteers}</div>
        </Card>

        <Card>
          <div className="text-sm text-slate-500">Total Projects</div>
          <div className="text-2xl font-semibold">{totalProjects}</div>
        </Card>

        <Card>
          <div className="text-sm text-slate-500">Attendance Today</div>
          <div className="text-2xl font-semibold">{attendanceToday}</div>
        </Card>

        <Card>
          <div className="text-sm text-slate-500">Active Assignments</div>
          <div className="text-2xl font-semibold">{activeAssigns}</div>
        </Card>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <h3 className="text-lg font-semibold mb-3">
              Recent Volunteer Signups
            </h3>

            {volunteers.length === 0 ? (
              <div className="text-sm text-slate-500">
                No volunteers yet.
              </div>
            ) : (
              <ul className="space-y-3">
                {volunteers.slice(0, 5).map((v) => (
                  <li
                    key={v.id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <div className="font-medium">
                        {v.firstName || "—"} {v.lastName || ""}
                      </div>
                      <div className="text-sm text-slate-500">
                        {Array.isArray(v.skills)
                          ? v.skills.join(", ")
                          : "No skills listed"}
                      </div>
                    </div>
                    <div className="text-sm text-slate-400">
                      Active
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        <div>
          <Card>
            <h3 className="text-lg font-semibold mb-3">
              Activity Timeline
            </h3>
            <div className="text-sm text-slate-500">
              No recent activity yet.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
