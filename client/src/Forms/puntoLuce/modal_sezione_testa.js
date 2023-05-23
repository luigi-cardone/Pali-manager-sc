import { CModal, CModalHeader, CModalBody, CModalTitle, CForm, CButton } from '@coreui/react'
import GBaseForm from '../group_baseForm'
import { useState } from 'react'
export const ModalSezioneTesta = (props) => {

    const [data, setData] = useState(props.data)
    const onClose = () =>{
        props.onClose()
    }

    const formData = [
        [
            {
                type: "title",
                label: "Tronco e flangia di testa"
            }
        ],
        [
            {
                type: "sub_title",
                label: "Orientamento/SP(mm)"
            }
        ],
        [
            {
                id: "n",
                type: "input",
                label: "N"
            },
            {
                id: "e",
                type: "input",
                label: "E"
            },
            {
                id: "s",
                type: "input",
                label: "S"
            },
            {
                id: "w",
                type: "input",
                label: "W"
            }
        ],
        [
            {
                type: "sub_title",
                label: "Saldature Longitudinali e Circonferenziali"
            }
        ],
        [
            {
                id: "vt",
                type: "select",
                label: "VT",
                options: ["Nessun difetto riscontrato", "Corrosione"]
            }
        ],
        [
            {
                id: "ut",
                type: "select",
                label: "UT",
                options: ["Nessun difetto riscontrato", "Cricca"]
            }
        ],
        [
            {
                id: "mt",
                type: "select",
                label: "MT",
                options: ["Nessun difetto riscontrato", "Cricca"]
            }
        ],
        [
            {
                id: "cfr",
                type: "input",
                label: "CRF",
                placeholder: "85 cm"
            }
        ],
        [
            {
                id: "note",
                type: "input",
                label: "Note",
                placeholder: ""
            }
        ],
        [
            {
                id: "esito",
                type: "select",
                label: "Esito",
                options: ["Conforme", "Non conforme"]
            }
        ]
    ]

    const handleSubmit = (e) =>{
        e.preventDefault()
        props.setPlData({...props.plData, verifica_strutturale: {...props.plData.verifica_strutturale, sezione_testa: data}})
        props.onClose()
    }

    return (
            <CModal size="xl" visible={props.isVisible} onClose={() => onClose()}>
            <CModalHeader style={{backgroundColor: "#E5F4FF"}}>
                <CModalTitle>{props.title}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm onSubmit={handleSubmit}>
                    <GBaseForm state={data} setStateFunction={setData} data_set={formData}  />
                    <CButton type="submit" shape="rounded-1 w-25 primary border-0 size-text d-flex justify-content-center shadow-sm weight-600">Salva</CButton> 
                </CForm>
            </CModalBody>
            </CModal>
    )
}
