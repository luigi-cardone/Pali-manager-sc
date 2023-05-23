import { CCol, CFormInput, CFormTextarea, CRow } from '@coreui/react'
import { CDatePicker } from '@coreui/react-pro'
import { useOutletContext } from 'react-router-dom'

export const Attestato = () => {
  const [plData, setPlData] = useOutletContext()
  return (
    <>
      <div className='size-title weight-700'>ATTESTATO DI ESECUZIONE MISURE</div>
        <div className='size-text color-base weight-400 rounded-1 py-1 border-light' >Il sottoscritto Dott. Ing. Giancarlo Raoli, iscritto con il n. 16776 all’Ordine degl’Ingegneri di 
        Roma e II Liv. UNI ISO 9712, certifica le misure rilevate ed attesta che sulla torre n.</div>
        <CRow className='d-flex'>
        <CFormInput onChange={e => setPlData({...plData, attestato: {...plData.attestato, n_torre: e.target.value}})} size='sm' className='w-25 size-text color-base weight-400 rounded-1 py-1 border-light'/>
        <div className='size-text d-flex w-auto'>&nbsp;installata in&nbsp;</div>
        <CFormInput onChange={e => setPlData({...plData, attestato: {...plData.attestato, luogo: e.target.value}})} size='sm' className='w-25 size-text color-base weight-400 rounded-1 py-1 border-light'/>
        <div className='size-text d-flex w-auto'>&nbsp;nel Comune di&nbsp;</div>
        <CFormInput onChange={e => setPlData({...plData, attestato: {...plData.attestato, comune: e.target.value}})} size='sm' className='w-25 size-text color-base weight-400 rounded-1 py-1 border-light'/>
        </CRow>
        <div className='size-text'>è intervenuto il tecnico:</div>
        <CFormInput onChange={e => setPlData({...plData, attestato: {...plData.attestato, tecnico_1: e.target.value}})} size='sm' className='w-25 size-text color-base weight-400 rounded-1 py-1 border-light my-1'/>
        <CFormInput onChange={e => setPlData({...plData, attestato: {...plData.attestato, tecnico_2: e.target.value}})} size='sm' className='w-25 size-text color-base weight-400 rounded-1 py-1 border-light'/>
        <CFormTextarea rows={14} defaultValue={plData.attestato.misurazioni} onChange={e => setPlData({...plData, attestato: {...plData.attestato, misurazioni: e.target.value}})} className='mt-2 size-text color-base weight-400 rounded-1 py-1 border-light'/>
        <CRow className='d-flex'>
          <CCol>
            <p className='size-title weight-600 d-flex'>Spessimetro</p>
            <CRow className='d-flex'>
            <CFormInput placeholder='Modello' onChange={e => setPlData({...plData, attestato: {...plData.attestato, spessimetro: {...plData.attestato.spessimetro, modello: e.target.value}}})} size='sm' className='w-25 size-text color-base weight-400 rounded-1 py-1 border-light'/>
            <CFormInput placeholder='Matricola' onChange={e => setPlData({...plData, attestato: {...plData.attestato, spessimetro: {...plData.attestato.spessimetro, matricola: e.target.value}}})} size='sm' className='w-25 size-text color-base weight-400 rounded-1 py-1 border-light mx-2'/>
            </CRow>
          </CCol>
          <CCol>
            <p className='size-title weight-600 d-flex'>Corrosimetro</p>
            <CRow className='d-flex'>
            <CFormInput placeholder='Modello' onChange={e => setPlData({...plData, attestato: {...plData.attestato, spessimetro: {...plData.attestato.spessimetro, modello: e.target.value}}})} size='sm' className='w-25 size-text color-base weight-400 rounded-1 py-1 border-light'/>
            <CFormInput placeholder='Matricola' onChange={e => setPlData({...plData, attestato: {...plData.attestato, corrosimetro: {...plData.attestato.spessimetro, matricola: e.target.value}}})} size='sm' className='w-25 size-text color-base weight-400 rounded-1 py-1 border-light mx-2'/>
            </CRow>
          </CCol>
        </CRow>
        <p className='size-title weight-600'>Altro</p>
        <CRow className='d-flex mt-2'>
        <CFormInput placeholder='Chiave dinamometrica' onChange={e => setPlData({...plData, attestato: {...plData.attestato, chiave_dinamometrica: e.target.value}})} size='sm' className='w-25 size-text color-base weight-400 rounded-1 py-1 border-light'/>
        <CFormInput placeholder='Matricola' onChange={e => setPlData({...plData, attestato: {...plData.attestato, chiave_dinamometrica_matricola: e.target.value}})} size='sm' className='w-25 size-text color-base weight-400 rounded-1 py-1 border-light mx-2'/>
        </CRow>
      <div className='size-title weight-700 my-2'>VERIFICA STRUTTURALE DELLA TORRE FARO</div>
        <CRow className='d-flex'>
        <div className='size-text d-flex w-auto'>A seguito delle verifiche eseguite ed in considerazione delle risultanze rilevate, in data&nbsp;</div>
        <CDatePicker onChange={e => setPlData({...plData, attestato: {...plData.attestato, data: e.target.value}})} size='sm' className='w-25 size-text color-base weight-400 rounded-1 py-1 border-light'/>
        <div className='size-text d-flex w-auto'>&nbsp;il sottoscritto Dott. Ing. Giancarlo Raoli certifica che:</div>
        </CRow>
        <CFormTextarea rows={14} defaultValue={plData.attestato.certificazione} onChange={e => setPlData({...plData, attestato: {...plData.attestato, misurazioni: e.target.value}})} className='mt-2 size-text color-base weight-400 rounded-1 py-1 border-light'/>
        <div className='size-text d-flex w-auto'>In futuro si dovranno altresì rispettare le seguenti condizioni:</div>
        <CFormTextarea rows={14} defaultValue={plData.attestato.condizioni} onChange={e => setPlData({...plData, attestato: {...plData.attestato, misurazioni: e.target.value}})} className='mt-2 size-text color-base weight-400 rounded-1 py-1 border-light'/>
        <div className='size-text d-flex w-auto'>Nei casi sopracitati, qualora la verifica risultasse negativa, va immediatamente eseguita una verifica strumentale.</div>
    </>
  )
}
