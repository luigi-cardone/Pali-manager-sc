import React, { useEffect, useState } from 'react'
import { CRow, CCol, CFormInput, CInputGroup, CInputGroupText } from '@coreui/react'
import { useOutletContext } from 'react-router-dom'

export const VerRettilineita = () => {
    const [plData, setPlData] = useOutletContext()
    const [misureTirafondi, setMisureTirafondi] = useState([])
    useEffect(() =>{
        const currentMisure = []
        if (!plData.verifica_rettilineita.diametro) plData.verifica_rettilineita["diametro"] = ""
        for(let i = 0; i < plData.dati_generali?.n_tirafondi; i++){
            currentMisure.push({...currentMisure, [i] : plData.verifica_rettilineita.diametro[i] ? plData.verifica_rettilineita?.diametro[i] : ""})
        }
        setMisureTirafondi(currentMisure)
    },[plData.dati_generali.n_tirafondi])

    useEffect(() =>{
        console.log(plData.verifica_rettilineita)
    }, [plData.verifica_rettilineita])
    return (
            <CRow>
            <CCol>
                <div className='size-subHeader color-base weight-700'>Diametro (mm)</div>
                {misureTirafondi.map((misura, index) => (
                    <CInputGroup key={index} className='rounded-1 w-75 my-2'>
                        <CInputGroupText className='size-text color-base weight-400 py-1 border-light'>Tirafondo n.{index + 1}</CInputGroupText>
                        <CFormInput
                        defaultValue={misura[index]}
                        onChange={e => setPlData({...plData, verifica_rettilineita: {...plData.verifica_rettilineita, diametro : {...plData.verifica_rettilineita.diametro, [index] : e.target.value}}})}
                        placeholder=""
                        className='size-text color-base weight-400 py-1 border-light'
                        />
                    </CInputGroup>
                ))}
            </CCol>
            <CCol>
                <div className='size-subHeader color-base weight-700'>Zona di misura</div>
                <CInputGroup className='rounded-1 w-75 my-2'>
                    <CInputGroupText className='size-text color-base weight-400 py-1 border-light'>0°</CInputGroupText>
                    <CFormInput
                        onChange={e => setPlData({...plData, verifica_rettilineita: {...plData.verifica_rettilineita, zona_misura : {...plData.verifica_rettilineita.zona_misura, gradi_0 : e.target.value}}})}
                        placeholder="24"
                        defaultValue={plData.verifica_rettilineita.zona_misura.gradi_0}
                        className='size-text color-base weight-400 py-1 border-light'
                        />
                </CInputGroup>
                <CInputGroup className='rounded-1 w-75 my-2'>
                    <CInputGroupText className='size-text color-base weight-400 py-1 border-light'>90°</CInputGroupText>
                    <CFormInput
                        onChange={e => setPlData({...plData, verifica_rettilineita: {...plData.verifica_rettilineita, zona_misura : {...plData.verifica_rettilineita.zona_misura, gradi_90 : e.target.value}}})}
                        defaultValue={plData.verifica_rettilineita.zona_misura.gradi_90}
                        placeholder=""
                        className='size-text color-base weight-400 py-1 border-light'
                        />
                </CInputGroup>
                <CInputGroup className='rounded-1 w-75 my-2'>
                    <CInputGroupText className='size-text color-base weight-400 py-1 border-light'>180°</CInputGroupText>
                    <CFormInput
                        onChange={e => setPlData({...plData, verifica_rettilineita: {...plData.verifica_rettilineita, zona_misura : {...plData.verifica_rettilineita.zona_misura, gradi_180 : e.target.value}}})}
                        placeholder=""
                        defaultValue={plData.verifica_rettilineita.zona_misura.gradi_180}
                        className='size-text color-base weight-400 py-1 border-light'
                        />
                </CInputGroup>
                <CInputGroup className='rounded-1 w-75 my-2'>
                    <CInputGroupText className='size-text color-base weight-400 py-1 border-light'>270°</CInputGroupText>
                    <CFormInput
                        onChange={e => setPlData({...plData, verifica_rettilineita: {...plData.verifica_rettilineita, zona_misura : {...plData.verifica_rettilineita.zona_misura, gradi_270 : e.target.value}}})}
                        placeholder=""
                        defaultValue={plData.verifica_rettilineita.zona_misura.gradi_270}
                        className='size-text color-base weight-400 py-1 border-light'
                        />
                </CInputGroup>
            </CCol>
        </CRow>
    )
}
