import { CCol, CRow, CContainer, CHeaderBrand, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CBadge, CButton, CFormInput, CInputGroup, CInputGroupText, CCard, CForm, CCardBody, CCloseButton } from '@coreui/react'
import { cilContact, cilPeople, cilSearch, cilUser, cilUserPlus, cilFilter } from '@coreui/icons'
import React, { useEffect, useState } from 'react'
import CIcon from '@coreui/icons-react'
import {axiosPrivate} from '../api/axios'
import Spinner from '../Components/spinner'
import BaseForm from '../Forms/baseForm'
import ROLES_LIST from '../Classes/roles'
import { ModalBase } from '../Forms/modalBase'
import useAxiosFunction from '../hooks/useAxiosFunction'
export const Users = () => {
  const [error, loading, axiosFetch] = useAxiosFunction()
  const [users, setUsers] = useState([])
  const [clienti, setClienti] = useState([])
  const [comuni, setComuni] = useState([])
  const [fornitori, setFornitori] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [showMore, setShowMore] = useState("")
  const [showAdminModal, setShowAdminModal] = useState(false)
  const [validated, setValidated] = useState(false)
  const [userTemp, setUserTemp] = useState({})

  const userForm = [
    [
      {
          required: false,
          id: "attivo",
          label: "Attivo",
          type : "checkbox"
      },
      {
        required: false,
        id: "referente",
        label: "Utente referente",
        type : "checkbox"
      },
      {}
    ],
    [
        {
            required: true,
            id: "cognome",
            label: "Cognome",
            type : "input",
            placeholder: ""
        },
        {
            required: true,
            id: "nome",
            label: "Nome",
            type : "input",
            placeholder: ""
        },
        {
            required: true,
            id: "email",
            label: "E-mail",
            type : "input",
            placeholder: ""
        }
      ],
      [
        {
          required: false,
          id: "tel",
          label: "Telefono",
          type : "input",
          placeholder: ""
        },
        {
          required: false,
          id: "role",
          label: "Ruolo",
          type : "select",
          options: ROLES_LIST.map((role, index) => ({label: role, value: index}))
        },
        {
          required: false,
          id: "cliente_id",
          label: "Cliente",
          type : "select",
          options: clienti.map(cliente => ({label: cliente.ragione_sociale, value: cliente.cliente_id}))
        }
    ],
    [
      {
          required: false,
          id: "comune_id",
          label: "Comune",
          type : "select",
          options: comuni.map(comune => ({label: comune.comune, value: comune.comune_id}))
      },
      {
        required: false,
        id: "fornitore_id",
        label: "Fornitore",
        type : "select",
        options: fornitori.map(fornitore => ({label: fornitore.cod_fornitore, value: fornitore.fornitore_id}))
      },
      {}
    ]
  ]

  const handleSubmit = async (e) =>{
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      return 0
    }
    setValidated(true)
    setIsLoading(true)
    try{
        await axiosPrivate.post("/user/updateUser", userTemp)
        setIsLoading(false)
        setRefresh(true)
    }
    catch (err){
        console.log(err)
        setIsLoading(false)
    }
  }

  useEffect(() =>{
    axiosFetch({...axiosFetch, url: "/clienti"}, setClienti)
    axiosFetch({...axiosFetch, url: "/fornitori", setFornitori})
    axiosFetch({...axiosFetch, url: "/comuni"}, setComuni)
    axiosFetch({...axiosFetch, url: "/users"}, setUsers)
  }, [refresh])
  return (
    <>
      { isLoading && <Spinner/>}
      <ModalBase title="Aggiungi nuovo utente" isVisible={showAdminModal} onClose={setShowAdminModal} formData={userForm} apiUrl="/user/createUser" setRefresh={setRefresh} data={userTemp} setData={setUserTemp} />
        <CRow className="justify-content-between m-0 my-3">
        <CCol className='px-0 d-flex justify-content-start'>
          <CButton onClick={() => setShowAdminModal(true)} shape="rounded-1 primary border-0 size-text d-flex align-items-center shadow-sm"><CIcon size='lg' icon={cilUserPlus} />Crea nuovo utente</CButton> 
        </CCol>
        <CCol className='px-0 d-flex justify-content-end'>
          <CButton shape="rounded-1 contrast color-base border-0 size-text d-flex align-items-center shadow-sm mx-2"><CIcon icon={cilFilter} />Filtra per</CButton>
        <CInputGroup className='rounded-1 contrast color-base border-0 size-text d-flex align-items-center w-50 shadow-sm'>
          <CInputGroupText className='rounded-1 contrast color-base border-0 size-text d-flex align-items-center'><CIcon icon={cilSearch}/></CInputGroupText>
          <CFormInput placeholder='Cerca utente' className='rounded-1 contrast color-base border-0 size-text d-flex align-items-center w-50'/>
        </CInputGroup>
        </CCol>
        </CRow>
        <CContainer className='py-4 px-4 contrast mt-3 rounded-1' fluid>
            <CCol className='d-flex justify-content-start mb-2'>
             <CHeaderBrand className='size-header weight-600 d-flex align-items-center'><CIcon size='lg' className='color-black' icon={cilPeople}/>&nbsp;Utenti</CHeaderBrand>
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
                {users?.map(user =>(
                  <>
                  <CTableRow className='align-middle' key={user.user_id}>
                    <CTableHeaderCell>{user.nome}&nbsp;{user.cognome}</CTableHeaderCell>
                    <CTableHeaderCell className='weight-400'>{user.email}</CTableHeaderCell>
                    <CTableHeaderCell className='weight-400'>{user.attivo? <CBadge color='success' className='rounded-4 size-text'><CIcon size='sm' icon={cilUser}/>&nbsp;Attivo</CBadge> : <CBadge color='danger' className='rounded-4 size-text'><CIcon size='sm' icon={cilUser}/>&nbsp;Non attivo</CBadge>}</CTableHeaderCell>
                    <CTableHeaderCell className='weight-400'>{new Date(user.last_login).toLocaleString().replace(",", "")}</CTableHeaderCell>
                    <CTableHeaderCell><CButton onClick={() => {if (showMore === user.user_id){
                      setShowMore("")
                    }
                    else{
                      setUserTemp(user)
                      setShowMore(user.user_id)}} 
                    }
                    className="w-50 justify-content-center align-items-center d-flex p-1 mx-2 color-base rounded-3 border-0 size-text weight-600 background"><CIcon size='sm' icon={cilContact} />&nbsp;Modifica</CButton></CTableHeaderCell>
                      
                  </CTableRow>
                  {showMore === user.user_id && 
                  <CTableRow className='align-middle' key={-user.user_id}>
                    <CTableHeaderCell colSpan={5}>
                      <CCard className='background-light border-0 shadow-sm'>
                        <CCardBody className="justify-content-center rounded-1 p-3">
                          <CRow className='d-flex justify-content-end'>
                            <CCloseButton onClick={() => setShowMore("")}/>
                          </CRow>
                          <CForm noValidate validated={validated} onSubmit={handleSubmit}>
                              <BaseForm state={userTemp} setStateFunction={setUserTemp} data_set={userForm}/>
                              <CCol className='d-flex my-1 justify-content-end'>
                                <CButton type='submit' shape="rounded-1 primary border-0 size-text d-flex align-items-center shadow-md my-2">Aggiorna utente</CButton> 
                                <CButton type='submit' shape="mx-2 rounded-1 contrast color-base border-0 size-text d-flex align-items-center shadow-sm my-2">Invia credenziali</CButton> 
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
