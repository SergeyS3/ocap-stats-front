import './Header.css'
import useProject, { type ProjectCode, projects } from '@/hooks/useProject'


const Header = () => {
  const { project, setProject } = useProject()

  return (
    <div className='header'>
      Проект:
      <select
        className='form-control'
        value={project.code}
        onChange={e => setProject(e.target.value as ProjectCode)}
      >
        {projects.map(project =>
          <option key={project.code} value={project.code}>{project.name}</option>,
        )}
      </select>
    </div>
  )
}

export default Header
