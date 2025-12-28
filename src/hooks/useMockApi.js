import { volunteers, projects } from '../mock/data'

export function useMockApi(){
  return {
    getVolunteers: () => Promise.resolve(volunteers),
    getProjects: () => Promise.resolve(projects)
  }
}