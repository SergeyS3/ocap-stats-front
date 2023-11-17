import Nav from '@/layouts/Nav'
import 'react-toastify/dist/ReactToastify.min.css'
import '@/assets/css/colors.css'
import '@/assets/css/fonts.css'
import '@/assets/css/inputs.css'
import './App.css'
import Header from '@/layouts/Header'
import Home from '@/pages/Home'
import Games from '@/pages/Games'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Players from '@/pages/Players'
import NotFound from '@/pages/NotFound'
import { createContext, useState } from 'react'
import { Project } from '@/services/bot-api'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { toast, ToastContainer } from 'react-toastify'
import ApiFetchError from './errors/ApiFetchError'


export const ProjectContext = createContext('' as Project)

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

const App = () => {
  const [project, setProject] = useState(Project.tvt2)

  return (
    <QueryClientProvider client={queryClient}>
      <ProjectContext.Provider value={project}>
        <BrowserRouter>
          <Nav />
          <div>
            <Header project={project} onProjectChange={setProject} />
            <main>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/games' element={<Games />} />
                <Route path='/players' element={<Players />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
              <ToastContainer />
            </main>
          </div>
        </BrowserRouter>
      </ProjectContext.Provider>
    </QueryClientProvider>
  )
}

export default App
