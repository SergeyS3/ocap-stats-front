import { createContext, type Dispatch, type PropsWithChildren, type SetStateAction, useContext, useState } from 'react'
import { type Project, projects } from '@/config/projects'


const defaultProject = projects.find(p => p.code === 'rb-tvt2')!

const ProjectContext = createContext({} as {
  project: Project,
  setProject: Dispatch<SetStateAction<Project>>,
})

export const useProjectContext = () => useContext(ProjectContext)


type Props = PropsWithChildren

const ProjectContextProvider = ({ children }: Props) => {
  const [project, setProject] = useState(defaultProject)

  return (
    <ProjectContext.Provider value={{ project, setProject }}>
      {children}
    </ProjectContext.Provider>
  )
}

export default ProjectContextProvider
