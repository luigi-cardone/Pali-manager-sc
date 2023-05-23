import { CModal, CModalHeader, CModalBody, CModalTitle, CButton, CForm, CCallout } from '@coreui/react'
import { useEffect, useState } from 'react'
import { axiosPrivate } from '../api/axios'
import Spinner from '../Components/spinner'
import BaseForm from './baseForm'
export const ModalBase = (props) => {
    const [validated, setValidated] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState({error: false, message: ""})
    const [success, setSuccess] = useState({success: false, message: ""})
    const [dataTemp, setDataTemp] = useState(props.data)
    const formData = props.formData
    const handleSubmit = async (e) =>{
        e.preventDefault()
        const form = e.currentTarget
        if (form.checkValidity() === false) return 0
        setValidated(true)
        setIsLoading(true)
        try{
            const res = await axiosPrivate.post(props.apiUrl, dataTemp)
            if(res.data.error) setError({error: true, message: res.data.message})
            else setSuccess({success: true, message: res.data.message})
            props.setRefresh(true)
            setIsLoading(false)
        }
        catch (err){
            console.log(err)
            setIsLoading(false)
        }
    }

    useEffect(() =>{
        props?.setData({...props.data, dataTemp})
    }, [dataTemp])

    return (
        <>
            { isLoading && <Spinner/>}
            <CModal size="xl" visible={props.isVisible} onClose={() => props.onClose()}>
            <CModalHeader style={{backgroundColor: "#E5F4FF"}}>
                <CModalTitle>{props.title}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                {success.success &&  <CCallout className="py-2" color="success">
                    <h1 className="size-header m-0">Successo</h1>
                    <p className="size-text m-0">{success.message}</p>
                </CCallout>}
                {error.error && <CCallout className="py-2" color="danger">
                    <h1 className="size-header m-0">Errore</h1>
                    <p className="size-text m-0">{error.message}</p>
                </CCallout>}
                <CForm onSubmit={handleSubmit} noValidate validated={validated}>
                    <BaseForm state={dataTemp} setStateFunction={setDataTemp} data_set={formData} />
                    <CButton type='submit' shape="rounded-1 primary border-0 size-text d-flex align-items-center shadow-sm my-2">Crea</CButton> 
                </CForm>
            </CModalBody>
            </CModal>
        </>
    )
}