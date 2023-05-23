import { CCol, CRow, CContainer, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CButton, CCard, CForm, CCardBody, CCloseButton } from '@coreui/react'
import { cilColorBorder, cilPlus } from '@coreui/icons'
import { useState } from 'react'
import CIcon from '@coreui/icons-react'
import { axiosPrivate } from '../../api/axios'
import BaseForm from '../../Forms/baseForm'
import { ModalBase } from '../../Forms/modalBase'
import { useOutletContext } from 'react-router-dom'
export const Clienti = () => {
  const [areeTerritoriali, clienti, clientiAssegnati, comuni, fornitori, refresh, setRefresh] = useOutletContext()
  const [isNuovoClienteVisible, setIsNuovoClienteVisible] = useState(false)
  const [showMore, setShowMore] = useState("")
  const [validated, setValidated] = useState(false)
  const [clienteTemp, setClienteTemp] = useState({
      cliente_id: "",
      comune_id: [],
      ragione_sociale: "",
      cod_cliente: "",
      sito_legale: "",
      sito_operativo: "",
      vat_number: "",
      codice_fiscale: "",
      email: "",
      pec: "",
      unic_code: "",
      tel: "",
      contratto: ""
  })
  const formData = [
    [
      {
        required: true,
        id: "ragione_sociale",
        label: "Ragione Sociale",
        type : "input",
        area_territoriale_id: "",
        cliente_id: ""
      },
      {
        required: true,
        id: "cod_cliente",
        label: "Cod cliente",
        type : "input",
        placeholder: ""
      },
      {
        required: false,
        id: "comune_id",
        label: "Comune",
        type : "multi-select",
        options: comuni?.map(comune => ({text: comune.comune, value: comune.comune_id}))
      }
    ],
    [
      {
        required: false,
        id: "sito_legale",
        label: "Sede legale",
        type : "input",
        placeholder: ""
      },
      {
        required: false,
        id: "sito_operativo",
        label: "Sede operativa",
        type : "input",
        placeholder: ""
      },
      {
        required: false,
        id: "vat_number",
        label: "P. IVA",
        type : "input",
        placeholder: ""
      },
    ],
    [
      {
        required: false,
        id: "email",
        label: "E-mail",
        type : "input",
        placeholder: ""
      },
      {
        required: false,
        id: "pec",
        label: "Pec",
        type : "input",
        placeholder: ""
      },
      {
        required: false,
        id: "contratto",
        label: "Contratto",
        type : "input",
        placeholder: ""
      }
    ],
    [
      {
        required: false,
        id: "unic_code",
        label: "Codice univoco",
        type : "input",
        placeholder: ""
      },
      {
        required: false,
        id: "tel",
        label: "Telefono",
        type : "input",
        placeholder: ""
      },
      {}
    ],
  ]

  const handleSubmit = async (e) =>{
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      setValidated(false)
      return 0
    }
    setValidated(true)
    try{
        await axiosPrivate.post("/cliente/updateCliente", clienteTemp)
        setRefresh(refresh + 1)
    }
    catch (err){
        console.log(err)
    }
}

  return (
    <>
      <ModalBase title="Aggiungi cliente" isVisible={isNuovoClienteVisible} onClose={() => setIsNuovoClienteVisible(false)} apiUrl="/cliente" formData={formData} setRefresh={setRefresh} data={clienteTemp} setData={setClienteTemp}/>
        <CContainer className='py-4 px-4 contrast mt-3 rounded-1' fluid>
          <CCol className='px-0 d-flex justify-content-end'>
            <CButton shape="rounded-1 primary border-0 size-text d-flex align-items-center shadow-sm mb-2" onClick={() => setIsNuovoClienteVisible(true)}><CIcon size='lg' icon={cilPlus} />Nuovo cliente</CButton> 
          </CCol>
          <CTable>
            <CTableHead className='background'>
              <CTableRow className='color-base size-text'>
                <CTableHeaderCell className='border-end border-3 weight-600 px-3' scope="row">Cliente</CTableHeaderCell>
                <CTableHeaderCell className='border-end border-3 weight-600 px-3' scope="row">Ragione sociale</CTableHeaderCell>
                <CTableHeaderCell className='border-end border-3 weight-600 px-3' scope="row">Azioni</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody className='color-base size-text'>
              {clienti?.map(cliente =>(
                <>
                <CTableRow className='align-middle' key={cliente.cliente_id}>
                  <CTableHeaderCell className='weight-400'>{cliente.cod_cliente}</CTableHeaderCell>
                  <CTableHeaderCell className='weight-400'>{cliente.ragione_sociale}</CTableHeaderCell>
                  <CTableHeaderCell><CButton onClick={() => {if (showMore === cliente.cliente_id){
                    setShowMore("")
                  }
                  else{
                    setClienteTemp({...cliente, comune_id: clientiAssegnati.filter(comune => comune.cliente_id === cliente.cliente_id).map(comune_assegnato => comune_assegnato.comune_id)})
                    setShowMore(cliente.cliente_id)}} 
                  }
                  className="w-50 justify-content-center align-items-center d-flex p-1 mx-2 color-base rounded-3 border-0 size-text weight-600 background"><CIcon size='sm' icon={cilColorBorder} />&nbsp;Modifica</CButton></CTableHeaderCell>
                    
                </CTableRow>
                {showMore === cliente.cliente_id && <CTableRow className='align-middle' key={-cliente.cliente_id}>
                  <CTableHeaderCell colSpan={5}>
                    <CCard className='background-light border-0 shadow-sm'>
                      <CCardBody className="justify-content-center rounded-1 p-3">
                        <CRow className='d-flex justify-content-end'>
                          <CCloseButton onClick={() => setShowMore("")}/>
                        </CRow>
                        <CForm noValidate validated={validated} onSubmit={handleSubmit}>
                            <BaseForm state={clienteTemp} setStateFunction={setClienteTemp} data_set={formData}/>
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