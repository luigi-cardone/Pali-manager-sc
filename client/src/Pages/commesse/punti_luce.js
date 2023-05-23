import { CAlert, CCol, CContainer, CHeaderBrand, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CBadge } from '@coreui/react'
import { cilVerticalAlignCenter } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { NavLink, useOutletContext } from 'react-router-dom'
import { useState, useEffect } from 'react'
import STATI from '../../Classes/stati'
import VERIFICA from '../../Classes/verifica'
import useAxiosFunction from '../../hooks/useAxiosFunction'
export const PuntiLuce = () => {
  const [commessa, setCommessa] = useOutletContext()
  const [error, loading, axiosFetch] = useAxiosFunction()
  const [pls, setPls] = useState([])
  const [refresh, setRefresh] = useState(false)

  useEffect(() =>{
    axiosFetch({...axiosFetch, url: "/pls"}, setPls)
}, [refresh])

  return (
        <CContainer className='py-4 px-4 contrast mt-3 rounded-1' fluid>
            <CCol className='d-flex justify-content-start mb-2'>
             <CHeaderBrand className='size-header weight-600 d-flex align-items-center'><CIcon size='lg' className='color-highlight' icon={cilVerticalAlignCenter}/>&nbsp;Tutti i punti luce</CHeaderBrand>
            </CCol>
            <CTable>
              <CTableHead className='background'>
                <CTableRow className='color-base size-text'>
                  <CTableHeaderCell className='border-end border-3 weight-600 px-3' scope="row">Codice Punto Luce</CTableHeaderCell>
                  <CTableHeaderCell className='border-end border-3 weight-600 px-3' scope="row">Impianto</CTableHeaderCell>
                  <CTableHeaderCell className='border-end border-3 weight-600 px-3' scope="row">Indirizzo</CTableHeaderCell>
                  <CTableHeaderCell className='border-end border-3 weight-600 px-3' scope="row">Stato Punto Luce</CTableHeaderCell>
                  <CTableHeaderCell scope="row" className='weight-600 px-3'>Tipologia di PL</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody className='color-base size-text'>
                {pls.map(pl =>(
                  <CTableRow className='align-middle' key={pl.pl_id}>
                    <CTableHeaderCell><NavLink to={`${commessa.commessa_cod}/${pl.pl_id}/`} className='nav-link weight-400'>{pl.nome}</NavLink></CTableHeaderCell>
                    <CTableHeaderCell className='weight-400'>{pl.impianto}</CTableHeaderCell>
                    <CTableHeaderCell className='weight-400'>{pl.indirizzo}</CTableHeaderCell>
                    <CTableHeaderCell className='d-flex justify-content-center'><CAlert color="success" className="d-flex align-items-center rounded-0 py-1 m-0 color-success">{STATI[pl.stato]}</CAlert></CTableHeaderCell>
                    <CTableHeaderCell><CBadge className="p-2 m-0 color-black rounded-3 size-text weight-400 background">{VERIFICA[pl.tipo_verifica_palo]}</CBadge></CTableHeaderCell>
                  </CTableRow>
                )
                )}
              </CTableBody>
            </CTable>
        </CContainer>
  )
}
