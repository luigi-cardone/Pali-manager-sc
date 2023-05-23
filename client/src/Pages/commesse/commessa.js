import { CCol, CHeaderBrand, CRow, CButton, CNavbar, CContainer, CCollapse, CForm } from "@coreui/react"
import { cilApps, cilBriefcase, cilGrid, cilPeople, cilPlus, cilTask, cilVerticalAlignCenter } from "@coreui/icons"
import CIcon from "@coreui/icons-react"
import { Outlet, NavLink, useParams } from "react-router-dom"
import {ModalBase} from '../../Forms/modalBase'
import { useState, useEffect } from "react"
import BaseForm from "../../Forms/baseForm"
import ROLES_LIST from "../../Classes/roles"
import useAxiosFunction from "../../hooks/useAxiosFunction"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
export const Commessa = (props) => {
  const { commessa_id } = useParams()
  const axiosPrivate = useAxiosPrivate()
  const [error, loading, axiosFetch] = useAxiosFunction()
  const [isNuovoPlVisible, setIsNuovoPlVisible] = useState(false)
  const [users, setUsers] = useState([])
  const [commessaUsers, setCommessaUsers] = useState([])
  const [usersId, setUsersId] = useState({users_id : []})
  const [showSubMenu, setshowSubMenu] = useState(false)
  const [showSubMenuItem, setshowSubMenuItem] = useState("")
  const [commessa, setCommessa] = useState({})
  const [refresh, setRefresh] = useState(false)
  const [plTemp, setPlTemp] = useState({
    nome: "",
    indirizzo: "",
    impianto: "",
    targhetta: "",
    latitudine: "",
    longitudine: "",
    materiale: "",
    anzianita: "",
    altezza: "",
    tipologia_palo: "",
    indicazioni: "",
    note: "",
    commessa_id: commessa_id
})
  const formData = [
    [
        {
            required: false,
            id: "nome",
            label: "Punto Luce",
            type : "input",
            placeholder: ""
        },
        {
            required: false,
            id: "indirizzo",
            label: "Indirizzo",
            type : "input",
            placeholder: ""
        },
        {
            required: false,
            id: "impianto",
            label: "Impianto",
            type : "input",
            placeholder: ""
        }
    ],
    [
        {
            required: false,
            id: "targhetta",
            label: "Targhetta",
            type : "input",
            placeholder: ""
        },
        {
            required: false,
            id: "latitudine",
            label : "Latitudine",
            type : "input",
            placeholder : ""
        },
        {
            required: false,
            id: "longitudine",
            label : "Longitudine",
            type : "input",
            placeholder : ""
        }
    ],
    [
        {
            required: false,
            id: "materiale",
            label: "Materiale",
            type : "input",
            placeholder : ""
        },
        {
            required: false,
            id: "anzianita",
            label: "Anzianità",
            type : "input",
            placeholder : ""
        },
        {
            required: false,
            id: "altezza",
            label: "Altezza",
            type : "input",
            placeholder : ""
        }
    ],
    [
        {
            required: false,
            id: "tipologia_palo",
            label: "Tipologia palo",
            type : "input",
            placeholder : ""
        },
        {
            required: false,
            id: "tipo_verifica_palo",
            label : "Tipo verifica palo",
            type : "select",
            options : ["Torrefaro", "Puntoluce"]
        },
        {
            required: false,
            id: "indicazioni",
            label : "Indicazioni",
            type : "select",
            options : ["Artistico - Cestello", "Artistico - Gru", "Artistico - Paranco", "Artistico - PdC", "Demolizione basetta", "Demolizione zoccolo"]
        }
    ],
    [
        {
            required: false,
            id: "note",
            label: "Note",
            type : "input",
            placeholder: ""
        },
    ]
]
  const menuItems = [
      {
      text: "Panoramica",
      icon: cilApps,
      to: ''
    },
      {
      text: "Utenti",
      icon: cilPeople,
      to: 'users'
    },
      {
      text: "Punti Luce",
      icon: cilVerticalAlignCenter,
      to: 'punti_luce'
    },
      {
      text: "Azioni di Gruppo",
      icon: cilGrid,
      to: 'group_actions'
    },
      {
      text: "Check e validazione",
      icon: cilTask,
      to: 'check_and_validation'
    }
    ]
  const subMenuItems = [
    {
      label: "Aggiungi operatore",
      id: "aggiungi_operatore",
      form: (<BaseForm state={usersId} setStateFunction={setUsersId} data_set={[[
        {
          required: false,
          id: "users_id",
          type : "multi-select",
          options: users.filter(user => !commessaUsers.map(commessUser => commessUser.user_id).includes(user.user_id) && user.role === ROLES_LIST.findIndex(role => role === "Operatore")).map(user => ({text: `${user.nome} ${user.cognome}`, value: user.user_id}))
        }
      ]]}/>)
    },
    {
      label: "Aggiungi validatore",
      id: "aggiungi_validatore"
    },
    {
      label: "Aggiungi utente cliente",
      id: "aggiungi_utente_cliente"
    }
  ]
  useEffect(() =>{
    const getCommessa = async () =>{
      try{
          const res = await axiosPrivate.get("/commessa/commessa/"+commessa_id)
          const data = {...res.data[0], data_inizio : new Date(res.data[0].data_inizio).toISOString().slice(0, 19).replace('T', ' '), data_fine :  new Date(res.data[0].data_fine).toISOString().slice(0, 19).replace('T', ' ')}
          setCommessa(data)
      }
      catch (err){
        console.log(err)
      }
    }
    const getCommessaUsers = async () =>{
      try{
          const res = await axiosPrivate.get("commessa/getCommessaUsers/"+commessa_id)
          setCommessaUsers(res.data)
      }
      catch (err){
        console.log(err)
      }
    }
    getCommessaUsers()
    axiosFetch({...axiosFetch, url: "/users"}, setUsers)
    getCommessa()
  },[refresh])

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try{
        await axiosPrivate.post("/commessa/updateCommessaUsers", {commessa_id, users_id : usersId.users_id})
        setRefresh(refresh + 1)
    }
    catch (err){
        console.log(err)
    }
  }

return (
<>
  <ModalBase title="Aggiungi Pl" isVisible={isNuovoPlVisible} onClose={() => setIsNuovoPlVisible(false)} formData={formData} apiUrl="/pl/createPl" setRefresh={setRefresh} data={plTemp} setData={setPlTemp}/>
  <CRow className="justify-content-between py-3">
    <CCol>
      <CHeaderBrand className='size-header weight-600'><CIcon size='lg' icon={cilBriefcase}/>&nbsp;{commessa.commessa_cod}</CHeaderBrand>
    </CCol>
    <CCol className="d-flex justify-content-end px-0">
      <CCol className="d-flex justify-content-end px-2">
        <CButton shape="rounded-1 primary border-0 size-text d-flex align-items-center shadow-sm mx-2 weight-600" onClick={() => setIsNuovoPlVisible(true)}><CIcon size='lg' icon={cilPlus}/>Nuovo Punto Luce</CButton> 
        <CButton onClick={() => setshowSubMenu(!showSubMenu)} shape="rounded-1 contrast color-base border-0 size-text d-flex align-items-center shadow-sm weight-600">Azioni</CButton>
        {showSubMenu && <CContainer style={{position: "absolute", zIndex: "100", width: "200px", top: "170px"}} className="contrast color-base border-0 size-text d-flex flex-column align-items-center weight-600 shadow-sm">
          <CForm onSubmit={handleSubmit}>
          { subMenuItems.map(item =>
            (
              <div>
                <CButton onClick={() => setshowSubMenuItem(item.id)} key={item.id} shape="contrast color-base border-0 size-text d-flex align-items-center weight-400 shadow-none w-100">{item.label}</CButton>
                <CCollapse visible={showSubMenuItem === item.id}>
                  <CCol>
                    {item.form ? (
                      <>
                        {item.form}
                        <CButton type="submit" className="rounded-1 primary border-0 size-text d-flex align-items-center shadow-sm mx-2 weight-600 mt-1 w-100">Aggiungi</CButton> 
                      </>
                      ) : <></>}
                  </CCol>
                </CCollapse>
              </div>
            )
            )}
            </CForm>
        </CContainer>}
      </CCol>
    </CCol>
  </CRow>
  <CRow className="m-0">
  <CNavbar className="contrast rounded-1 w-100 d-flex justify-content-start rounded-1 px-2 m-0" expand='lg' colorScheme='light'>
        {menuItems.map(item => 
          (
            <NavLink key={item.text} className={({isActive, isPending}) =>`${isActive? "color-highlight" : "color-base"} size-text weight-600 d-flex align-items-center p-2 mx-1 nav-link`} to={item.to} end={item.to === ""}>
              <CIcon icon={item.icon} />&nbsp; {item.text}
            </NavLink>
        ))}
  </CNavbar>
  </CRow>
  <CRow className="m-0">
    <Outlet context={[commessa, setCommessa, commessa_id, commessaUsers, setRefresh, refresh]}/>
  </CRow>
</>
)
}
