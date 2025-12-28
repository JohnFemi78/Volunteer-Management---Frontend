import React from 'react'
import { useParams } from 'react-router-dom'
import { volunteers } from '../../mock/data'
import Card from '../../components/ui/Card'

export default function VolunteerDetails(){
  const { id } = useParams()
  const v = volunteers.find(x => String(x.id) === id) || volunteers[0]
  return (
    <div className="container-max mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <div className="text-lg font-semibold">{v.firstName} {v.lastName}</div>
            <div className="text-sm text-slate-500">{v.phone}</div>
            <div className="mt-3">
              <div className="text-sm font-medium">Skills</div>
              <div className="flex gap-2 mt-2">{v.skills.map(s=>(<span key={s} className="px-2 py-1 bg-slate-100 rounded">{s}</span>))}</div>
            </div>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card>
            <h3 className="text-lg font-semibold mb-2">Assigned Projects</h3>
            <div className="text-sm text-slate-500">No projects (mock)</div>
          </Card>

          <Card className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Attendance History</h3>
            <div className="text-sm text-slate-500">No attendance (mock)</div>
          </Card>
        </div>
      </div>
    </div>
  )
}