import Nav from '@/layouts/Nav'
import Header from '@/layouts/Header'
import '@/layouts/Page.css'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'


const Page = () =>
  <>
    <Nav />
    <div>
      <Header />
      <main>
        <Outlet />
        <ToastContainer />
      </main>
    </div>
  </>

export default Page
