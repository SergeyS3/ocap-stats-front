import './Header.css'
import { Project } from '../services/bot-api'


type Props = {
  project: Project
  onProjectChange: (project: Project) => any
}

const Header = ({ project: selectedProject, onProjectChange }: Props) => {
  const projectNames: Record<Project, string> = {
    [Project.tvt1]: 'TvT 1',
    [Project.tvt2]: 'TvT 2',
  }

  return (
    <div className='header'>
      Проект:
      <select
        className='form-control'
        value={selectedProject}
        onChange={e => onProjectChange(e.target.value as Project)}
      >
        {Object.values(Project).map(project =>
          <option key={project} value={project}>{projectNames[project]}</option>,
        )}
      </select>
    </div>
  )
}

export default Header
