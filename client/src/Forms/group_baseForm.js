import { CFormInput, CFormSelect, CCol, CRow, CInputGroup, CInputGroupText } from "@coreui/react"
function GBaseForm (props){
    const state = props.state
    const setStateFunction = props.setStateFunction
    const data_set = props.data_set
    return (
        data_set.map((row, index) =>
            <CRow key={index} className='w-100 justify-content-center mt-1'>
                {row.map((col, index) =>
                    <CCol key={index}>
                        {col.type === 'select'?
                            (
                            <CInputGroup className='rounded-1 w-75 my-2'>
                                <CInputGroupText className='size-text color-base weight-400 py-1 border-light'>{col.label}</CInputGroupText>
                                <CFormSelect disabled={col.disabled} options={[{value: "", label: "Seleziona"}].concat(col.options)} value={state[col]} required={col.required} onChange={e => setStateFunction({...state, [col.id] : e.target.value})} aria-label="Default select example" className='size-text color-base weight-400 rounded-1 py-1 border-light w-75'/>
                            </CInputGroup>
                            )
                        : col.type === 'input'?
                            (
                            <CInputGroup className='rounded-1 w-75 my-2'>
                            {col.label !== "" && <CInputGroupText className='size-text color-base weight-400 py-1 border-light'>{col.label}</CInputGroupText>}
                            <CFormInput
                                placeholder={col.placeholder}
                                onChange={e => setStateFunction({...state, [col.id] : e.target.value})}
                                value={state[col.id]}
                                disabled={col.disabled}
                                className='size-text color-base weight-400 rounded-1 py-1 border-light w-75'
                                required={col.required}
                                readOnly={col.readOnly || false}
                                />
                            </CInputGroup>
                            )
                        : col.type === 'title'?
                            <div className='size-text color-base weight-700 mb-2'>{col.label.toUpperCase()}</div>
                        : col.type === 'sub_title'?
                            <div className='size-text color-base weight-600 mb-2'>{col.label}</div>
                        : <></>
                        }
                    </CCol>
                )}
            </CRow>
        )
        )
    }
    
    
    export default GBaseForm