import { useParams } from 'react-router-dom'
import useProject from '@/hooks/useProject'
import { useQuery } from '@tanstack/react-query'
import { fetchPlayerHistory } from '@/services/bot-api'


const usePlayerQuery = () => {
  const { project } = useProject()
  const { player } = useParams()

  return useQuery({
    queryKey: ['player', project, player],
    queryFn: () => fetchPlayerHistory(project.code, player!),
  })
}

export default usePlayerQuery
