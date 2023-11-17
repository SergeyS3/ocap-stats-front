import Block from '@/layouts/Block'
import useTitle from '@/hooks/useTitle'


const NotFound = () => {
  useTitle('Страница не найдена')

  return (
    <Block>
      Страница не найдена.
    </Block>
  )
}
export default NotFound
