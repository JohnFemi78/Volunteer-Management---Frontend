import React,{useEffect, useState} from "react";
import Card from '../components/ui/Card'
import { getVolunteers } from "../api/volunteers";
import { getProjects } from "../api/projects";
import { getAttendance } from "../api/attendance";
import { getAssigns } from "../api/Assigns";


export default function Dashboard() {
  const [volunteers, setVolunteers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState([]);
  const [assigns, setAssigns] = useState([]);
  const totalVolunteers = volunteers.length;
  const totalProjects = projects.length;


  //To get today attendance count
  const today = new Date().toDateString(); //normalize to date string
  const attendanceToday = attendance.filter(a => a.date && new Date(a.date).toDateString() === today).length;
// To get active Assignments count
  const activeAssigns = assigns.filter(a => a.status === 'active').length;
  


  useEffect(() => {
    async function loadDashboard() {
      try {

        const [volRes, projRes, attendanceRes, assignsRes] = await Promise.all([
          getVolunteers(),
          getProjects(),
          getAttendance(),
          getAssigns(),
        ]);
        
        setVolunteers(volRes.data);
        setProjects(projRes.data);
        setAttendance(attendanceRes.data);
        setAssigns(assignsRes.data);
      } catch (err) {
        console.error("Dashboard load failed", err);
      }finally {
        setLoading(false);
      }

    }

    loadDashboard();
  
  }, []);

  if (loading) {
    return<div className="p-6">Loading dashboard...</div>;
  }
  return (
    <div className="container-max mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="flex flex-col">
          <div className="text-sm text-slate-500">Total Volunteers</div>
          <div className="text-2xl font-semibold">{totalVolunteers}</div>
        </Card>
        <Card className="flex flex-col">
          <div className="text-sm text-slate-500">Total Projects</div>
          <div className="text-2xl font-semibold">{totalProjects}</div>
        </Card>
        <Card className="flex flex-col">
          <div className="text-sm text-slate-500">Attendance Today</div>
          <div className="text-2xl font-semibold">{attendanceToday}</div>
        </Card>
        <Card className="flex flex-col">
          <div className="text-sm text-slate-500">Active Assignments</div>
          <div className="text-2xl font-semibold">
            {activeAssigns}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <h3 className="text-lg font-semibold mb-3">
              Recent Volunteer Signups
            </h3>
            <ul className="space-y-3">
              {volunteers.slice(0, 5).map((v) => (
                <li key={v.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">
                      {v.firstName} {v.lastName}
                    </div>
                    <div className="text-sm text-slate-500">
                      {Array.isArray(v.skills) ? v.skills.join(",") : "-"}
                    </div>
                  </div>
                  <div className="text-sm text-slate-400">Active</div>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div>
          <Card>
            <h3 className="text-lg font-semibold mb-3">Activity Timeline</h3>
            <div className="text-sm text-slate-500">
              No recent activity (mock)
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
