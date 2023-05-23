import { CCol, CRow, CContainer, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CButton, CCard, CForm, CCardBody, CCloseButton } from '@coreui/react'
import { cilColorBorder, cilPlus } from '@coreui/icons'
import React, { useState } from 'react'
import CIcon from '@coreui/icons-react'
import { axiosPrivate } from '../../api/axios'
import BaseForm from '../../Forms/baseForm'
import { ModalBase } from '../../Forms/modalBase'
import { useOutletContext } from 'react-router-dom'
export const AreeTerritoriali = () => {
  const [areeTerritoriali, clienti, clientiAssegnati, comuni, fornitori, refresh, setRefresh] = useOutletContext()
  const [isNuovoTerritorioVisible, setIsNuovoTerritorioVisible] = useState(false)
  const [showMore, setShowMore] = useState("")
  const [validated, setValidated] = useState(false)
  const [areaTerritoritorialeTemp, setAreaTerritorialeTemp] = useState({
      area_territoriale_id: "",
      nome: ""
  })

  const formData = [
    [
      {
        required: true,
        id: "nome",
        label: "Nome",
        type : "input",
        placeholder: ""
      }
    ]
  ]

  const handleSubmit = async (e) =>{
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
    }
    setValidated(true)
    try{
        await axiosPrivate.post("/areaTerritoriale/updateAreaTerritoriale", areaTerritoritorialeTemp)
        setRefresh(refresh + 1)
    }
    catch (err){
        console.log(err)
    }
}

  return (
    <>
      <ModalBase title="Aggiungi nuovo utente" isVisible={isNuovoTerritorioVisible} onClose={setIsNuovoTerritorioVisible} formData={formData} apiUrl="/areaTerritoriale" setRefresh={setRefresh} data={areaTerritoritorialeTemp} setData={setAreaTerritorialeTemp} />
        <CContainer className='py-4 px-4 contrast mt-3 rounded-1' fluid>
          <CCol className='px-0 d-flex justify-content-end'>
            <CButton shape="rounded-1 primary border-0 size-text d-flex align-items-center shadow-sm mb-2" onClick={() => setIsNuovoTerritorioVisible(true)}><CIcon size='lg' icon={cilPlus} />Nuova area territoriale</CButton> 
          </CCol>
          <CTable>
            <CTableHead className='background'>
              <CTableRow className='color-base size-text'>
                <CTableHeaderCell className='border-end border-3 weight-600 px-3' scope="row">Nome</CTableHeaderCell>
                <CTableHeaderCell className='border-end border-3 weight-600 px-3' scope="row">Azioni</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody className='color-base size-text'>
              {areeTerritoriali?.map(territorio =>(
                <>
                <CTableRow className='align-middle' key={territorio.area_territoriale_id}>
                  <CTableHeaderCell className='weight-400'>{territorio.nome}</CTableHeaderCell>
                  <CTableHeaderCell><CButton onClick={() => {if (showMore === territorio.area_territoriale_id){
                    setShowMore("")
                  }
                  else{
                    setAreaTerritorialeTemp({ attivo: territorio.attivo, nome: territorio.nome, area_territoriale_id: territorio.area_territoriale_id})
                    setShowMore(territorio.area_territoriale_id)}} 
                  }
                  className="w-50 justify-content-center align-items-center d-flex p-1 mx-2 color-base rounded-3 border-0 size-text weight-600 background"><CIcon size='sm' icon={cilColorBorder} />&nbsp;Modifica</CButton></CTableHeaderCell>
                    
                </CTableRow>
                {showMore === territorio.area_territoriale_id && <CTableRow className='align-middle' key={-territorio.area_territoriale_id}>
                  <CTableHeaderCell colSpan={5}>
                    <CCard className='background-light border-0 shadow-sm'>
                      <CCardBody className="justify-content-center rounded-1 p-3">
                        <CRow className='d-flex justify-content-end'>
                          <CCloseButton onClick={() => setShowMore("")}/>
                        </CRow>
                        <CForm noValidate validated={validated} onSubmit={handleSubmit}>
                            <BaseForm state={areaTerritoritorialeTemp} setStateFunction={setAreaTerritorialeTemp} data_set={formData}/>
                            <CCol className='d-flex my-1 justify-content-end'>
                              <CButton type='submit' shape="rounded-1 primary border-0 size-text d-flex align-items-center shadow-md my-2">Aggiorna</CButton>
                            </CCol>
                        </CForm>
                      </CCardBody>
                    </CCard>
                  </CTableHeaderCell>
                </CTableRow>}
                </>
              )
              )}
            </CTableBody>
          </CTable>
        </CContainer>
    </>
  )
}
