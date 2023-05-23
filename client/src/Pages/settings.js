import { CRow, CNavbar } from '@coreui/react'
import { cilGlobeAlt, cilAddressBook, cilInstitution, cilTruck} from '@coreui/icons'
import {NavLink, Outlet} from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { useEffect, useState } from 'react'
import useAxiosFunction from '../hooks/useAxiosFunction'
import Spinner from '../Components/spinner'

export const Settings = () => {
  const [error, loading, axiosFetch] = useAxiosFunction()
  const [clienti, setClienti] = useState([])
  const [clientiAssegnati, setClientiAssegnati] = useState([])
  const [areeTerritoriali, setAreeTerritoriali] = useState([])
  const [comuni, setComuni] = useState([])
  const [fornitori, setFornitori] = useState([])
  const [refresh, setRefresh] = useState(0)
  const menuItems = [
    {
      text: "Aree territoriali",
      icon: cilGlobeAlt,
      to: ''
    },
    {
      text: "Clienti",
      icon: cilAddressBook,
      to: 'clienti'
    },
    {
      text: "Comuni",
      icon: cilInstitution,
      to: 'comuni'
    },
    {
      text: "Fornitori",
      icon: cilTruck,
      to: 'fornitori'
    }
    ]
  useEffect(() =>{
    axiosFetch({...axiosFetch, url: "/clienti"}, setClienti)
    axiosFetch({...axiosFetch, url: "/fornitori"}, setFornitori)
    axiosFetch({...axiosFetch, url: "/comuni/clienti"}, setClientiAssegnati)
    axiosFetch({...axiosFetch, url: "/comuni"}, setComuni)
    axiosFetch({...axiosFetch, url: "/areeTerritoriali"}, setAreeTerritoriali)
  },[refresh])

  return (
  <>
    {loading && <Spinner/>}
    <CRow className="m-0">
    <CNavbar className="contrast rounded-1 w-100 d-flex justify-content-start rounded-1 px-2 m-0" expand='lg' colorScheme='light'>
          {menuItems.map(item => 
            (
              <NavLink className={({isActive, isPending}) =>`${isActive? "color-highlight" : "color-base"} size-text weight-600 d-flex align-items-center p-2 mx-1 nav-link`} to={item.to} end={item.to === ""}>
                <CIcon icon={item.icon} />&nbsp; {item.text}
              </NavLink>
          ))}
    </CNavbar>
    </CRow>
    <CRow className="m-0">
      <Outlet context={[areeTerritoriali, clienti, clientiAssegnati, comuni, fornitori, refresh, setRefresh]}/>
    </CRow>
  </>
  )
}