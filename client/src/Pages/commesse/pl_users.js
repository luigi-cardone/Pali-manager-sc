import { CCol, CContainer, CHeaderBrand, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CBadge, CButton } from '@coreui/react'
import { cilPeople, cilUserX } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useOutletContext } from 'react-router-dom'
import ROLES_LIST from '../../Classes/roles'
import { axiosPrivate } from '../../api/axios'

export const PlUsers = () => {
  const [commessa, setCommessa, commessa_id, commessaUsers, setRefresh, refresh] = useOutletContext()

  
  const handleDelete = async (user_id) =>{
    try{
        await axiosPrivate.post("/commessa/deleteCommessaUser/"+user_id)
        setRefresh(refresh + 1)
    }
    catch (err){
        console.log(err)
    }
  }

  return (
        <CContainer className='py-4 px-4 contrast mt-3 rounded-1' fluid>
            <CCol className='d-flex justify-content-start mb-2'>
             <CHeaderBrand className='size-header weight-600 d-flex align-items-center'><CIcon size='lg' className='color-highlight' icon={cilPeople}/>&nbsp;Utenti</CHeaderBrand>
            </CCol>
            <CTable>
              <CTableHead className='background'>
                <CTableRow className='color-base size-text'>
                  <CTableHeaderCell className='border-end border-3 weight-600 px-3' scope="row">Nominativo</CTableHeaderCell>
                  <CTableHeaderCell className='border-end border-3 weight-600 px-3' scope="row">Email</CTableHeaderCell>
                  <CTableHeaderCell className='border-end border-3 weight-600 px-3' scope="row">Stato</CTableHeaderCell>
                  <CTableHeaderCell className='border-end border-3 weight-600 px-3' scope="row">Ultimo accesso</CTableHeaderCell>
                  <CTableHeaderCell scope="row" className='weight-600 px-3'>Azioni</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody className='color-base size-text'>
                {commessaUsers.map(user =>(
                  <CTableRow className='align-middle' key={user.user_id}>
                    <CTableHeaderCell>{user.nome} {user.cognome}</CTableHeaderCell>
                    <CTableHeaderCell className='weight-400'>{user.email}</CTableHeaderCell>
                    <CTableHeaderCell className='weight-400'><CBadge className="p-2 m-0 color-black rounded-3 size-text weight-400 background"> {ROLES_LIST[user.role]} </CBadge></CTableHeaderCell>
                    <CTableHeaderCell className='weight-400'>{new Date(user.last_login).toLocaleDateString()} {new Date(user.last_login).toLocaleTimeString()}</CTableHeaderCell>
                    <CTableHeaderCell><CButton onClick={() => handleDelete(user.user_id)} color='danger' className="w-50 justify-content-center align-items-center d-flex p-1 m-0 color-contrast rounded-3 size-text weight-600"><CIcon size='sm' icon={cilUserX} />&nbsp;Elimina</CButton></CTableHeaderCell>
                  </CTableRow>
                )
                )}
              </CTableBody>
            </CTable>
        </CContainer>
  )
}
