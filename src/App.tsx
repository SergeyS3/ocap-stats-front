import 'react-toastify/dist/ReactToastify.min.css'
import '@/assets/css/index.css'
import '@/assets/css/colors.css'
import '@/assets/css/fonts.css'
import '@/assets/css/table.css'
import '@/assets/css/inputs.css'
import HomePage from '@/pages/HomePage'
import GamesPage from '@/pages/GamesPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PlayersPage from '@/pages/PlayersPage'
import NotFoundPage from '@/pages/NotFoundPage'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import ApiFetchError from './errors/ApiFetchError'
import routes from '@/config/routes'
import Page from '@/layouts/Page'
import PlayerPage from '@/pages/PlayerPage'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: 'always',
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
  queryCache: new QueryCache({
    onError: e => {
      console.error(e)

      toast.error(e instanceof ApiFetchError ? e.message : 'Произошла ошибка')
    },
  }),
})

const App = () =>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Page />}>
          <Route index element={<HomePage />} />
          <Route path={routes.games(':project')} element={<GamesPage />} />
          <Route path={routes.players(':project')} element={<PlayersPage />} />
          <Route path={routes.player(':project', ':player')} element={<PlayerPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>

export default App
