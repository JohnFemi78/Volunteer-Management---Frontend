import React,{useEffect, useState} from "react";
import Card from '../components/ui/Card'
import { getVolunteers } from "../api/volunteers";
import { getProjects } from "../api/projects";
import { getAttendance } from "../api/attendance";
import { getAssigns } from "../api/assigns";
import { Users, FolderKanban, CalendarCheck, ClipboardList } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";


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
        setAttendance(attendanceRes.data.attendance || []);
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
  // Chart Data
const attendanceChart = attendance.slice(0, 7).map((a) => ({
  date: a?.date?.slice(5, 10) || "",
  status: a?.status === "Present" ? 1 : 0
}));

  return (
    <div className="max-w-7xl mx-auto p-6">
  
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          NGO Volunteer Dashboard
        </h1>
        <p className="text-slate-500">
          Overview of volunteer activities and projects
        </p>
      </div>
  
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
  
        <Card className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Total Volunteers</p>
            <p className="text-3xl font-bold">{totalVolunteers}</p>
          </div>
          <Users className="text-blue-500" size={32}/>
        </Card>
  
        <Card className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Projects</p>
            <p className="text-3xl font-bold">{totalProjects}</p>
          </div>
          <FolderKanban className="text-purple-500" size={32}/>
        </Card>
  
        <Card className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Attendance Today</p>
            <p className="text-3xl font-bold">{attendanceToday}</p>
          </div>
          <CalendarCheck className="text-green-500" size={32}/>
        </Card>
  
        <Card className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Active Assignments</p>
            <p className="text-3xl font-bold">{activeAssigns}</p>
          </div>
          <ClipboardList className="text-orange-500" size={32}/>
        </Card>
  
      </div>
  
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  
        {/* Volunteer Activity */}
        <div className="lg:col-span-2">
          <Card className="p-6">
  
            <h3 className="text-xl font-semibold mb-4">
              Recent Volunteers
            </h3>
  
            {volunteers.length === 0 ? (
              <p className="text-sm text-slate-500">
                No volunteers yet
              </p>
            ) : (
              <ul className="divide-y">
  
                {volunteers.slice(0,5).map((v) => (
                  <li
                    key={v.id}
                    className="flex justify-between items-center py-4"
                  >
  
                    <div className="flex items-center gap-3">
  
                      {/* Avatar */}
                      <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-semibold">
                        {v.firstName?.charAt(0)}
                      </div>
  
                      <div>
                        <p className="font-medium">
                          {v.firstName} {v.lastName}
                        </p>
  
                        <p className="text-sm text-slate-500">
                          {Array.isArray(v.skills)
                            ? v.skills.join(", ")
                            : "No skills listed"}
                        </p>
                      </div>
  
                    </div>
  
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                      Active
                    </span>
  
                  </li>
                ))}
  
              </ul>
            )}
  
          </Card>
        </div>
  
        {/* Attendance Chart */}
        <div>
          <Card className="p-6">
  
            <h3 className="text-xl font-semibold mb-4">
              Attendance Activity
            </h3>
  
            {attendanceChart.length === 0 ? (
              <p className="text-sm text-slate-500">
                No attendance data yet
              </p>
            ) : (
  
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={attendanceChart}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="status" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
  
            )}
  
          </Card>
        </div>
  
      </div>
  
    </div>
  );
}
