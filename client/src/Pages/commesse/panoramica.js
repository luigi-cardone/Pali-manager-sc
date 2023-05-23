import React, { useEffect, useState } from 'react'
import { CContainer, CRow, CCol, CForm, CButton } from '@coreui/react'
import BaseForm from '../../Forms/baseForm'
import { useOutletContext } from 'react-router-dom'
import STATI from '../../Classes/stati'
import useAuth from "../../hooks/useAuth"
import useAxiosFunction from '../../hooks/useAxiosFunction'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

export const Panoramica = (props) => {
    const axiosPrivate = useAxiosPrivate()
    const [commessa, setCommessa] = useOutletContext()
    const [error, loading, axiosFetch] = useAxiosFunction()
    const {auth} = useAuth()
    const [validated, setValidated] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [fornitori, setFornitori] = useState([])
    const [referenti, setReferenti] = useState([])
    const formData = [
        [
            {
                required: false,
                id: "referente_id",
                label: "Referente cliente",
                type : "select",
                options : referenti.map(referente => ({label: `${referente.nome} ${referente.cognome}`, value: referente.user_id}))
            },
            {
                disabled: true,
                id: "referente_email",
                label: "E-mail referente",
                type: "input"
            },
            {
                disabled: true,
                id: "referente_tel",
                label: "Telefono referente",
                type: "input"
            }
        ],
        [
            {
                disabled: true,
                required: false,
                id: "fornitore_id_1",
                label: "Fornitore",
                type : "select",
                options : fornitori.map(fornitore => ({label: fornitore.ragione_sociale, value: fornitore.fornitore_id}))
            },
            {
                required: false,
                id: "fornitore_id_2",
                label : "2° Fornitore",
                type : "select",
                options : fornitori.map(fornitore => ({label: fornitore.ragione_sociale, value: fornitore.fornitore_id}))
            },
            {

            }
        ],
        [
            {
                required: false,
                id: "data_inizio",
                label: "Data inizio",
                type : "date"
            },
            {
                required: false,
                id: "data_fine",
                label: "Data fine",
                type : "date"
            },
            {
                required: false,
                id: "configurazione",
                label: "Configurazione",
                type : "select",
                options : []
            }
        ],
    ]


    useEffect(() =>{
        axiosFetch({...axiosFetch, url: "/fornitori"}, setFornitori)
        axiosFetch({...axiosFetch, url: "/users"}, (users) => setReferenti(users.filter(user => user.referente)))
    }, [])

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            return 0
        }
        setValidated(true)
        try{
            await axiosPrivate.post("/commessa/updateCommessa", {...commessa, modificato_da_id: auth.user_id})
            setIsLoading(false)
        }
        catch (err){
            console.log(err)
            setIsLoading(false)
        }
    }

  return (
    <>
    <CContainer className="my-3 p-4 contrast justify-content-center rounded-1">
        <CRow className=' w-100 justify-content-center'>
            <CCol>
                <div className='size-text color-base weight-600'>Referente cliente</div>
                <div className='size-text color-base weight-400'>{commessa.referente_nome} {commessa.referente_cognome}</div>
            </CCol>
            <CCol>
                <div className='size-text color-base weight-600'>Comune</div>
                <div className='size-text color-base weight-400'>{commessa.comune}</div>
            </CCol>
            <CCol>
                <div className='size-text color-base weight-600'>Cliente</div>
                <div className='size-text color-base weight-400'>{commessa.ragione_sociale}</div>
            </CCol>
            <CCol>
                <div className='size-text color-base weight-600'>Stato commessa</div>
                <div className='size-text color-base weight-400'>{STATI[commessa.status]}</div>
            </CCol>
        </CRow>
        <CRow className='mt-4 w-100 justify-content-center'>
            <CCol>
                <div className='size-text color-base weight-600'>Creata da</div>
                <div className='size-text color-base weight-400'>{commessa.nome} {commessa.cognome} il {new Date(commessa.data_creazione).toLocaleDateString()} {new Date(commessa.data_creazione).toLocaleTimeString()}</div>
            </CCol>
            <CCol>
                <div className='size-text color-base weight-600'>Modificata da</div>
                <div className='size-text color-base weight-400'>{commessa.nome_mod} {commessa.cognome_mod} il {new Date(commessa.data_modifica).toLocaleDateString()} {new Date(commessa.data_modifica).toLocaleTimeString()}</div>
            </CCol>
            <CCol>
                
            </CCol>
            <CCol>
            </CCol>
        </CRow>
    </CContainer>
    <CForm className="my-3 p-4 contrast justify-content-center rounded-1" validated={validated} onSubmit={handleSubmit}>
        {<BaseForm state={commessa} setStateFunction={setCommessa} data_set={formData} />}
        <CButton type='submit' shape="color-base rounded-1 w-25 contrast border-0 size-text d-flex justify-content-center shadow-sm weight-600 mt-2">Salva</CButton> 
    </CForm>
    </>
  )
}
