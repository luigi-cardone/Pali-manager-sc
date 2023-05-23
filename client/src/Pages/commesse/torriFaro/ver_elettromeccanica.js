import React, { useState } from 'react'
import { CRow, CCol, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { useOutletContext } from 'react-router-dom'
import { axiosPrivate } from "../../../api/axios"
import { ModalAggiungiVoce } from '../../../Forms/puntoLuce/modal_aggiungi_voce'


export const VerElettromeccanica = (props) => {
    const [plData, setPlData] = useOutletContext()
    const [isVisibleAggiungiVoce, setIsVisibleAggiungiVoce] = useState(false)
    const [voci, setVoci] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)

    useState(() =>{
        const getVoci = async () =>{
            setIsLoading(true)
            try{
                const res = await axiosPrivate.get("/voci")
                setVoci(res.data)
                setIsLoading(false)
            }
            catch (err){
                setIsLoading(false)
            }
        }
        getVoci()
        setRefresh(false)
    }, [refresh])
  return (
    <div>
        <ModalAggiungiVoce refresh={refresh} title="Aggiungi voce" isVisible={isVisibleAggiungiVoce} onClose={() => setIsVisibleAggiungiVoce(false)} setRefresh={setRefresh} voci={voci} setPlData={setPlData} plData={plData}/>
        <CRow>
            <CCol></CCol>
            <CCol className=' d-flex justify-content-end'>
                <CButton onClick={() => setIsVisibleAggiungiVoce(true)} shape="rounded-1 primary border-0 size-text d-flex align-items-center shadow-sm mx-2 weight-600"><CIcon size='lg' icon={cilPlus} />Aggiungi voce</CButton> 
            </CCol>
        </CRow>
        <CRow>
            <div className='size-subHeader color-base weight-700'>Riepilogo:</div>
            <ul className='mx-2 mt-1'>
                {plData.voci.map(voce =>
                    <li key={voce} className='mx-4 size-text'>{voce}</li>
                    )}
            </ul>
        </CRow>
    </div>
  )
}
