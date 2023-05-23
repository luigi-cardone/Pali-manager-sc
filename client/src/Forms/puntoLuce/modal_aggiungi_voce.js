import { CModal, CModalHeader, CModalBody, CModalTitle, CFormInput, CFormCheck, CButton } from '@coreui/react'
import { useState } from 'react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { axiosPrivate } from '../../api/axios'
import { CMultiSelect } from '@coreui/react-pro'

export const ModalAggiungiVoce = (props) => {
    const [tempVoce, setTempVoce] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async () =>{
          setIsLoading(true)
          try{
              await axiosPrivate.post("voci/createVoce", {voce: tempVoce})
              props.setRefresh(!props.refresh)
              setIsLoading(false)
          }
          catch (err){
              setIsLoading(false)
          }
      }

    return (
            <CModal size="xl" visible={props.isVisible} onClose={() => props.onClose()}>
            <CModalHeader style={{backgroundColor: "#E5F4FF"}}>
                <CModalTitle>{props.title}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <div className='d-flex'>
                    <CFormInput
                    placeholder="Aggiungi voce"
                    className='size-text color-base weight-400 rounded-1 py-1 border-light w-75'
                    onChange={e => setTempVoce(e.target.value)}
                    />
                    <CButton onClick={handleSubmit} shape="rounded-1 primary border-0 size-text d-flex align-items-center shadow-sm mx-2 weight-600 px-2"><CIcon size='sm' icon={cilPlus}/></CButton>
                </div>
                <CMultiSelect onChange={options => props.setPlData({...props.plData, voci: options.map(option => option.value)})} placeholder="Seleziona" size="sm" className='mt-2 size-text color-base weight-400 rounded-1 py-0 border-light w-75' options={props.voci.map(voce => ({text: voce.voce, value: voce.voce}))} />
            </CModalBody>
            </CModal>
    )
}
