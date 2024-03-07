import Block from '@/layouts/Block'
import PlayerSummaryTable from '@/components/blocks/player/summary/PlayerSummaryTable'
import PlayerSummaryFragsPie from '@/components/blocks/player/summary/PlayerSummaryFragsPie'
import PlayerSummaryGamesPie from '@/components/blocks/player/summary/PlayerSummaryGamesPie'


type Props = {
  playerStats: PlayerStats
}

const PlayerSummary = ({ playerStats }: Props) =>
  <Block>
    <div className='flex-wrap'>
      <PlayerSummaryTable playerStats={playerStats} />
      <div className='flex-wrap'>
        <PlayerSummaryFragsPie playerStats={playerStats} />
        <PlayerSummaryGamesPie playerStats={playerStats} />
      </div>
    </div>
  </Block>

export default PlayerSummary
