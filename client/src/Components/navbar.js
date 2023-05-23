import { CAvatar, CNavbar, CContainer, CNavbarNav, CNavItem, CNavLink } from '@coreui/react'
import CIcon from '@coreui/icons-react'; 
import {cilAppsSettings, cilListRich, cilBell, cilEnvelopeOpen} from '@coreui/icons'
import useAuth from '../hooks/useAuth';

export const Navbar = () => {
  const {auth} = useAuth()

  return (
    <CNavbar className='primary' style={{"--cui-navbar-padding-y": "0rem"}} expand='lg' colorScheme='dark'>
      <CContainer className='justify-content-end'>
          <CNavbarNav className='align-items-center'>
            <CNavItem>
              <CNavLink href='#'>
                <CIcon icon={cilBell} />
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href='#'>
                <CIcon icon={cilListRich} />
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href='#'>
                <CIcon icon={cilEnvelopeOpen} />
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href='#' active>
                <CAvatar size='md' status="success">{auth.nome?.charAt(0).toUpperCase()}{auth.cognome?.charAt(0).toUpperCase()}</CAvatar>
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href='#'>
                <CIcon icon={cilAppsSettings} />
              </CNavLink>
            </CNavItem>
          </CNavbarNav>
      </CContainer>
    </CNavbar>
  )
}
