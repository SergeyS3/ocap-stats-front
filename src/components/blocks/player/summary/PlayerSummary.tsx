import Block from '@/layouts/Block'
import PlayerSummaryTable from '@/components/blocks/player/summary/PlayerSummaryTable'
import PlayerSummaryFragsPie from '@/components/blocks/player/summary/PlayerSummaryFragsPie'
import PlayerSummaryGamesPie from '@/components/blocks/player/summary/PlayerSummaryGamesPie'


const PlayerSummary = () =>
  <Block>
    <div className='flex-wrap'>
      <PlayerSummaryTable />
      <div className='flex-wrap'>
        <PlayerSummaryFragsPie />
        <PlayerSummaryGamesPie />
      </div>
    </div>
  </Block>

export default PlayerSummary
