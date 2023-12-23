import './Header.css'
import { projects } from '@/config/projects'
import { useProjectContext } from '@/context/ProjectContextProvider'


const Header = () => {
  const { project, setProject } = useProjectContext()

  return (
    <div className='header'>
      Проект:
      <select
        className='form-control'
        value={project.code}
        onChange={e => {
          setProject(projects.find(p => p.code === e.target.value)!)
        }}
      >
        {projects.map(project =>
          <option key={project.code} value={project.code}>{project.name}</option>,
        )}
      </select>
    </div>
  )
}

export default Header
