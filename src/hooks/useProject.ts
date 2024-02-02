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

const getProject = (code: ProjectCode): Project | undefined => projects.find(p => p.code === code)

const useProject = (): UseProjectResult => {
  const { getLocalStorageItem, setLocalStorageItem } = useLocalStorage()
  const { project: urlProjectCode } = useParams<{ project: ProjectCode }>()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  let project: Project

  if (urlProjectCode) {
    project = getProject(urlProjectCode)!

    if (!project) {
      location.href = '/404'
      throw new Error('project not found')
    }

    if (urlProjectCode !== getLocalStorageItem('project'))
      setLocalStorageItem('project', urlProjectCode)
  } else
    project = getProject(getLocalStorageItem('project')) ?? getProject('rb-tvt2')!

  const setProject: UseProjectResult['setProject'] = code => {
    setLocalStorageItem('project', code)
    navigate(pathname.replace(`/${project!.code}/`, `/${code}/`))
  }

  return { project, setProject }
}

export default useProject
