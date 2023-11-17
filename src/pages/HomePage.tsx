import useTitle from '@/hooks/useTitle'
import Block from '@/layouts/Block'


const HomePage = () => {
  useTitle('RB OCAP stats')

  return (
    <Block>
      Здесь можно посмотреть что знает бот дискорд сервера [CA] из окапа РБ по играм TvT
    </Block>
  )
}

export default HomePage
