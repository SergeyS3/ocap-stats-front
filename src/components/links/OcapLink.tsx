import blufor from '@/assets/images/blufor.svg'
import './OcapLink.css'


type Props = {
  missionFile: Game['missionFile']
  kill?: GameScoreKill
}

const OcapLink = ({ missionFile, kill }: Props) => {
  const params: ConstructorParameters<typeof URLSearchParams>[0] = {
    file: missionFile,
    zoom: '2.3',
    x: '-128',
    y: '128',
  }

  if (kill)
    params['frame'] = '' + Math.ceil(+new Date(`1970-01-01T${kill.timeMark}Z`) / 1230)

  return (
    <a
      className='ocap-link'
      href={`https://ocap.red-bear.ru/?${new URLSearchParams(params).toString()}`}
      target='_blank'
      title={`OCAP${kill && ` @ ${kill.timeMark}`}`}
      rel='noreferrer'
    >
      <img src={blufor} alt='OCAP' />
    </a>
  )
}

export default OcapLink
