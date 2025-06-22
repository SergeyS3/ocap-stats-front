import { useLocation, useNavigate, useParams } from 'react-router-dom'
import useLocalStorage from '@/hooks/useLocalStorage'


export const projects = [
  { code: 'rb-tvt1', name: 'TvT 1' },
  { code: 'rb-tvt2', name: 'TvT 2' },
] as const satisfies readonly { code: string, name: string }[]

type Project = (typeof projects)[number]
export type ProjectCode = Project['code']

type UseProjectResult = {
  project: Project
  setProject: (code: ProjectCode) => void
}

function getProject(code: ProjectCode): Project
function getProject(code: string | null): Project | undefined
function getProject(code: string | null): Project | undefined {
  return projects.find(p => p.code === code)
}

const useProject = (): UseProjectResult => {
  const { getLocalStorageItem, setLocalStorageItem } = useLocalStorage()
  const { project: urlProjectCode } = useParams<{ project: string }>()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const localStorageProjectCode = getLocalStorageItem('project')

  let project: Project | undefined

  if (urlProjectCode) {
    project = getProject(urlProjectCode)

    if (!project) {
      location.href = '/404'
      throw new Error('project not found')
    }

    if (project.code !== localStorageProjectCode)
      setLocalStorageItem('project', project.code)
  } else
    project = getProject(localStorageProjectCode) ?? getProject('rb-tvt2')

  const setProject: UseProjectResult['setProject'] = code => {
    setLocalStorageItem('project', code)
    void navigate(pathname.replace(`/${project.code}/`, `/${code}/`))
  }

  return { project, setProject }
}

export default useProject
