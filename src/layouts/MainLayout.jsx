import Footer from './Footer'
import Navbar from './Navbar'
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    // "overflow-x-hidden" is the magic pill here. 
    // "flex flex-col min-h-screen" ensures the footer stays at the bottom.
    <div className="flex flex-col min-h-screen overflow-x-hidden relative">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout