import Nav from '@/layouts/Nav'
import 'react-toastify/dist/ReactToastify.min.css'
import '@/assets/css/colors.css'
import '@/assets/css/fonts.css'
import '@/assets/css/inputs.css'
import './App.css'
import Header from '@/layouts/Header'
import HomePage from '@/pages/HomePage'
import GamesPage from '@/pages/GamesPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PlayersPage from '@/pages/PlayersPage'
import NotFoundPage from '@/pages/NotFoundPage'
import ProjectContextProvider from '@/context/ProjectContextProvider'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { toast, ToastContainer } from 'react-toastify'
import ApiFetchError from './errors/ApiFetchError'
import routes from '@/config/routes'


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
    <ProjectContextProvider>
      <BrowserRouter>
        <Nav />
        <div>
          <Header />
          <main>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path={routes.games} element={<GamesPage />} />
              <Route path={routes.players} element={<PlayersPage />} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
            <ToastContainer />
          </main>
        </div>
      </BrowserRouter>
    </ProjectContextProvider>
  </QueryClientProvider>

export default App
