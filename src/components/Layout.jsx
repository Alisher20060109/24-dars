import React from 'react'
import Headers from './Headers'
import { Outlet } from 'react-router-dom'
import Footers from './Footers'

const Layout = () => {
  return (
    <>
     <Headers/> 
     <main>
        <Outlet/>
     </main>
     <Footers/>
    </>
  )
}

export default Layout
