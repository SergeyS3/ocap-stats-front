import Block from '@/layouts/Block'
import useTitle from '@/hooks/useTitle'


const NotFoundPage = () => {
  useTitle('Страница не найдена')

  return (
    <Block>
      Страница не найдена.
    </Block>
  )
}
export default NotFoundPage
