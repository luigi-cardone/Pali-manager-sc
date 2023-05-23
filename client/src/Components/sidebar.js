import '../styles/side-bar.scss'
import {CSidebar, CSidebarBrand, CSidebarNav, CNavItem, CSidebarToggler} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { menuItems } from '../config/sidebar_menu'
import appName from '../config/app_name'
import logo from '../assets/globalcorr.png'
export const SideBar = () => {
    const [sidebarMinimized, setSidebarMinimized] = useState(false)

  return (
    <CSidebar colorscheme='light' style={{minHeight: "100vh"}} className='bg-light contrast' narrow={sidebarMinimized}>
       <CSidebarBrand className='primary px-3 d-flex justify-content-between weight-900'>{!sidebarMinimized && <img src={logo} alt="" className="d-inline-block align-top w-25"/>}{!sidebarMinimized && appName} <CSidebarToggler onClick={() => setSidebarMinimized(!sidebarMinimized)} /></CSidebarBrand>
       <CSidebarNav className={`contrast ${sidebarMinimized? "p-1 m-2" : "p-3"}`}>
        {menuItems.map((item) =>(
            <CNavItem className='my-1' key={item.name}>
                <NavLink className={({isActive, isPending}) =>`${isActive? "color-contrast primary" : "color-base"} nav-link d-flex justify-around size-subHeader rounded-2 p-0`} to={item.to}>
                    <CIcon className="m-2" size="lg" icon={item.icon}/>
                    {!sidebarMinimized && item.name}
                </NavLink>
            </CNavItem>
        ))}
       </CSidebarNav>
    </CSidebar>
  )
}