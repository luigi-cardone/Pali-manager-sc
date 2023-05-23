import { CCol, CRow, CContainer, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CButton, CCard, CForm, CCardBody, CCloseButton } from '@coreui/react'
import { cilColorBorder, cilPlus } from '@coreui/icons'
import React, { useState } from 'react'
import CIcon from '@coreui/icons-react'
import { axiosPrivate } from '../../api/axios'
import BaseForm from '../../Forms/baseForm'
import { ModalBase } from '../../Forms/modalBase'
import { useOutletContext } from 'react-router-dom'
export const Comuni = () => {
  const [areeTerritoriali, clienti, clientiAssegnati, comuni, fornitori, refresh, setRefresh] = useOutletContext()
  const [isNuovoComuneVisible, setIsNuovoComuneVisible] = useState(false)
  const [showMore, setShowMore] = useState("")
  const [validated, setValidated] = useState(false)
  const [comuneTemp, setComuneTemp] = useState({
      comune_id: "",
      comune: "",
      acronimo: "",
      cod_provincia: "",
      area_territoriale_id: "",
      cliente_id: []
  })

  const formData = [
    [
      {
        required: true,
        id: "comune",
        label: "Comune",
        type : "input",
        area_territoriale_id: "",
        cliente_id: ""
      },
      {
        required: true,
        id: "acronimo",
        label: "Acronimo",
        type : "input",
        placeholder: ""
      },
      {
        required: true,
        id: "cod_provincia",
        label: "Codice provincia",
        type : "input",
        placeholder: ""
      },
    ],
    [
      {
        required: true,
        id: "area_territoriale_id",
        label: "Area Territoriale",
        type : "select",
        options: areeTerritoriali.map(territorio => ({label: territorio.nome, value: territorio.area_territoriale_id}))
      },
      {
        required: true,
        id: "cliente_id",
        label: "Clienti associati",
        type : "multi-select",
        options: clienti.map(cliente => ({text: cliente.ragione_sociale, value: cliente.cliente_id}))
      },
      {}
    ]
  ]

  const handleSubmit = async (e) =>{
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false || comuneTemp.cliente_id.length === 0) {
      setValidated(false)
      return 0
    }
    setValidated(true)
    try{
        await axiosPrivate.post("/comune/updateComune", comuneTemp)
        setRefresh(refresh + 1)
    }
    catch (err){
        console.log(err)
    }
}

  return (
    <>
      <ModalBase title="Aggiungi comune" isVisible={isNuovoComuneVisible} onClose={() => setIsNuovoComuneVisible(false)} apiUrl="/comune" formData={formData} setRefresh={setRefresh} data={comuneTemp} setData={setComuneTemp}/>
        <CContainer className='py-4 px-4 contrast mt-3 rounded-1' fluid>
          <CCol className='px-0 d-flex justify-content-end'>
            <CButton shape="rounded-1 primary border-0 size-text d-flex align-items-center shadow-sm mb-2" onClick={() => setIsNuovoComuneVisible(true)}><CIcon size='lg' icon={cilPlus} />Nuova area territoriale</CButton> 
          </CCol>
          <CTable>
            <CTableHead className='background'>
              <CTableRow className='color-base size-text'>
                <CTableHeaderCell className='border-end border-3 weight-600 px-3' scope="row">Nome</CTableHeaderCell>
                <CTableHeaderCell className='border-end border-3 weight-600 px-3' scope="row">Acronimo</CTableHeaderCell>
                <CTableHeaderCell className='border-end border-3 weight-600 px-3' scope="row">Cod. Provincia</CTableHeaderCell>
                <CTableHeaderCell className='border-end border-3 weight-600 px-3' scope="row">Area Territoriale</CTableHeaderCell>
                <CTableHeaderCell className='border-end border-3 weight-600 px-3' scope="row">Azioni</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody className='color-base size-text'>
              {comuni?.map(comune =>(
                <>
                <CTableRow className='align-middle' key={comune.comune_id}>
                  <CTableHeaderCell className='weight-400'>{comune.comune}</CTableHeaderCell>
                  <CTableHeaderCell className='weight-400'>{comune.acronimo}</CTableHeaderCell>
                  <CTableHeaderCell className='weight-400'>{comune.cod_provincia}</CTableHeaderCell>
                  <CTableHeaderCell className='weight-400'>{areeTerritoriali.find(territorio => territorio.area_territoriale_id === comune.area_territoriale_id)?.nome}</CTableHeaderCell>
                  <CTableHeaderCell><CButton onClick={() => {if (showMore === comune.comune_id){
                    setShowMore("")
                  }
                  else{
                    setComuneTemp({...comune, cliente_id: clientiAssegnati.filter(cliente => cliente.comune_id === comune.comune_id).map(cliente_assegnato => cliente_assegnato.cliente_id)})
                    setShowMore(comune.comune_id)}} 
                  }
                  className="w-50 justify-content-center align-items-center d-flex p-1 mx-2 color-base rounded-3 border-0 size-text weight-600 background"><CIcon size='sm' icon={cilColorBorder} />&nbsp;Modifica</CButton></CTableHeaderCell>
                    
                </CTableRow>
                {showMore === comune.comune_id && 
                <CTableRow className='align-middle' key={-comune.comune_id}>
                  <CTableHeaderCell colSpan={5}>
                    <CCard className='background-light border-0 shadow-sm'>
                      <CCardBody className="justify-content-center rounded-1 p-3">
                        <CRow className='d-flex justify-content-end'>
                          <CCloseButton onClick={() => setShowMore("")}/>
                        </CRow>
                        <CForm noValidate validated={validated} onSubmit={handleSubmit}>
                            <BaseForm state={comuneTemp} setStateFunction={setComuneTemp} data_set={formData}/>
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