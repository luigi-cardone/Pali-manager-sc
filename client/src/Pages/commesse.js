import { CAlert, CRow, CCol, CButton, CContainer, CHeaderBrand, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody } from '@coreui/react'
import { cilPlus, cilFilter, cilBriefcase } from '@coreui/icons'
import { useEffect, useState } from 'react'
import CIcon from '@coreui/icons-react'
import { NavLink } from 'react-router-dom'
import { Statusbar } from '../Components/statusbar'
import STATI from '../Classes/stati'
import { ModalBase } from '../Forms/modalBase'
import useAuth from '../hooks/useAuth'
import VERIFICA from '../Classes/verifica'
import Spinner from '../Components/spinner'
import useAxiosFunction from '../hooks/useAxiosFunction'

export const Commesse = () => {
  const [error, loading, axiosFetch] = useAxiosFunction()
  const [isNuovaCommessaVisible, setIsNuovaCommessaVisible] = useState(false)
  const [commesse, setCommesse] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [comuni, setComuni] = useState([])
  const [clienti, setClienti] = useState([])
  const [referenti, setReferenti] = useState([])
  const [fornitori, setFornitori] = useState([])
  const {auth} = useAuth()
  const statusList = [{
    title: "Inserite",
    status: 7,
    color: "one"
  },
  {
    title: "Senza operatori assegnati",
    status: 25,
    color: "two"
  },
  {
    title: "In corso",
    status: 33,
    color: "three"
  },
  {
    title: "Sospese",
    status: 0,
    color: "four"
  },
  {
    title: "Concluse",
    status: 888,
    color: "five"
  }]
  const [commessaTemp, setCommessaTemp] = useState({user_id : auth.id, modificato_da_id: auth.id, commessa_cod: "", comune_id: ""})
  const formData = [
      [
          {
              required: true,
              id: "comune_id",
              label: "Comune",
              type : "select",
              options : comuni.map(comune => ({label: comune.comune, value: comune.comune_id}))
          },
          {
              required: true,
              id: "cliente_id",
              label: "Cliente",
              type : "select",
              options : clienti.map(cliente => ({label: cliente.ragione_sociale, value: cliente.cliente_id}))
          },
          {
              id: "referente_id",
              label: "Referente cliente",
              type : "select",
              options : referenti.map(referente => ({label: `${referente.nome} ${referente.cognome}`, value: referente.user_id}))
          },
      ],
      [
          {
              required: true,
              id: "fornitore_id_1",
              label: "Fornitore",
              type : "select",
              options : fornitori.map(fornitore => ({label: fornitore.ragione_sociale, value: fornitore.fornitore_id}))
          },
          {
              id: "fornitore_id_2",
              label: "2° Fornitore",
              type : "select",
              options : fornitori.map(fornitore => ({label: fornitore.ragione_sociale, value: fornitore.fornitore_id}))
          },
          {
              required: true,
              id: "data_inizio",
              label: "Data di inizio",
              type : "date"
          }
      ],
      [
          {
              required: true,
              id: "data_fine",
              label: "Data di scadenza",
              type : "date"
          },
          {
              required: false,
              id: "configurazione_id",
              label : "Configurazione",
              type : "select",
              options : []
          },
          {
              id: "azienda_manutentrice",
              label: "Azienda manutentrice",
              type : "input",
              placeholder : ""
          }
      ],
      [
          {
              id: "contatti_manutentore",
              label: "Contatti manutentore",
              type : "input",
              placeholder : ""
          },
          {
              id: "codice_originario",
              label: "Codice commessa originaria",
              type : "input",
              placeholder : ""
          },
          {
              required: true,
              id: "tipo_verifica",
              label : "Tipo verifica commessa",
              type : "select",
              options : VERIFICA.map((tipo, index) => ({label: tipo, value: index}))
          }
      ],
      [
          {
              id: "note",
              label : "Note",
              type : "input",
              placeholder : ""
          }
      ],
      [
          {
              id: "note_interne",
              label : "Note interne",
              type : "input",
              placeholder : ""
          }
      ]
      ]
      
  useEffect(() =>{
    axiosFetch({...axiosFetch, url: "/clienti"}, setClienti)
    axiosFetch({...axiosFetch, url: "/fornitori"}, setFornitori)
    axiosFetch({...axiosFetch, url: "/commesse"}, setCommesse)
    axiosFetch({...axiosFetch, url: "/comuni"}, setComuni)
    axiosFetch({...axiosFetch, url: "/users"}, (users) => setReferenti(users.filter(user => user.referente)))
  },[refresh])

  return (
    <>
      {loading && <Spinner/>}
      <ModalBase isVisible={isNuovaCommessaVisible} onClose={() => setIsNuovaCommessaVisible(false)} title="Nuova commessa" formData={formData} apiUrl="/commessa/createCommessa" setRefresh={setRefresh} data={commessaTemp} setData={setCommessaTemp}/>
      <CRow className="justify-content-between m-0 my-3">
        <CCol className='px-0'>
          <CButton shape="rounded-1 primary border-0 size-text d-flex align-items-center shadow-sm" onClick={() => setIsNuovaCommessaVisible(true)}><CIcon size='lg' icon={cilPlus} />Nuova Commessa</CButton> 
        </CCol>
        <CCol className='d-flex justify-content-end px-0'>
          <CButton shape="rounded-1 contrast color-base border-0 size-text d-flex align-items-center shadow-sm"><CIcon icon={cilFilter} />Filtra per</CButton>
        </CCol> 
      </CRow>
      <CRow className="justify-content-between m-0 my-2 px-0">
        <CContainer className='py-4 px-4 contrast rounded-1' fluid>
            <CCol className='d-flex justify-content-start'>
             <CHeaderBrand className='size-header weight-600'><CIcon size='lg' icon={cilBriefcase}/>&nbsp;Commesse</CHeaderBrand>
            </CCol>
            <div className='d-flex justify-content-between my-4'>
              {statusList.map(el =>
                (<Statusbar key={el.title} status={el.status} title={el.title} color={el.color}/>)
              )}
            </div>
            <CTable>
              <CTableHead className='background'>
                <CTableRow className='color-base size-text'>
                  <CTableHeaderCell className='border-end border-3 weight-600 px-3' scope="row">Codice Commessa</CTableHeaderCell>
                  <CTableHeaderCell className='border-end border-3 weight-600 px-3' scope="row">Comune</CTableHeaderCell>
                  <CTableHeaderCell className='border-end border-3 weight-600 px-3' scope="row">Data Inizio</CTableHeaderCell>
                  <CTableHeaderCell className='border-end border-3 weight-600 px-3' scope="row">Data Fine</CTableHeaderCell>
                  <CTableHeaderCell scope="row" className='weight-600 px-3'>Stato Commessa</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody className='color-base size-text'>
                {commesse.map(commessa =>(
                  <CTableRow className='align-middle' key={commessa.commessa_id}>
                    <CTableHeaderCell><NavLink to={`/Commesse/${commessa.commessa_id}`} className='nav-link weight-400'>{commessa.commessa_cod}</NavLink></CTableHeaderCell>
                    <CTableHeaderCell className='weight-400'>{commessa.comune}</CTableHeaderCell>
                    <CTableHeaderCell className='weight-400'>{new Date(commessa.data_inizio).toLocaleDateString()}</CTableHeaderCell>
                    <CTableHeaderCell className='weight-400'>{new Date(commessa.data_fine).toLocaleDateString()}</CTableHeaderCell>
                    <CTableHeaderCell className='d-flex justify-content-center'><CAlert color="info" className="d-flex align-items-center rounded-0 p-2 m-0">{STATI[commessa.status]}</CAlert></CTableHeaderCell>
                  </CTableRow>
                )
                )}
              </CTableBody>
            </CTable>
        </CContainer>
      </CRow>
    </>
  )
}
