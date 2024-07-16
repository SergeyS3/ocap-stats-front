import { useModal } from '@/context/ModalContext'
import GameScoreKillsModal, { Props as GameScoreKillsModalProps } from '@/components/blocks/game/GameScoreKillsModal'


const GameScoreKills = (props: GameScoreKillsModalProps) => {
  const { openModal } = useModal()

  const kills = props.kills.length

  if (!kills)
    return <></>

  return (
    <button className='btn-link' onClick={() => openModal(<GameScoreKillsModal {...props} />)}>
      {kills}
    </button>
  )
}

export default GameScoreKills
