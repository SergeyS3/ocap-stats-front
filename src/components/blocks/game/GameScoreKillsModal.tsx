import OcapLink from '@/components/links/OcapLink'
import PlayerLink from '@/components/links/PlayerLink'


export type Props = {
  missionFile: Game['missionFile']
  kills: GameScoreKill[]
}

const GameScoreKills = ({ missionFile, kills }: Props) =>
  <table>
    <tbody>
      <tr>
        <th>Время</th>
        <th>Игрок</th>
        <th>Оружие</th>
        <th>Дистанция</th>
        <th />
      </tr>
      {kills.map(kill =>
        <tr key={kill.timeMark + kill.victim}>
          <td>{kill.timeMark}</td>
          <td><PlayerLink player={kill.victim} /></td>
          <td>{kill.weapon}</td>
          <td>{kill.distance}</td>
          <td><OcapLink missionFile={missionFile} kill={kill} /></td>
        </tr>,
      )}
    </tbody>
  </table>

export default GameScoreKills
