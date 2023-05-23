import { CFormInput, CFormSelect, CFormCheck, CCol, CRow , OffC, CButton, CLink} from "@coreui/react"
import { CDatePicker } from "@coreui/react-pro"
import { CMultiSelect } from '@coreui/react-pro'
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import GoogleMap from "../Components/googleMap";
import Spinner from "../Components/spinner";
import BASE_URL from "../config/baseURL";
import CIcon from "@coreui/icons-react";
import { cilResizeBoth } from "@coreui/icons";
import { NavLink } from "react-router-dom";
function BaseForm (props){
    const state = props.state
    const setStateFunction = props.setStateFunction
    const data_set = props.data_set
    const render = (status) => {
        if (status === Status.FAILURE) return <div>ERROR</div>;
        return <Spinner />;
      }
    return (
        data_set.map((row, index) =>
            <CRow key={index} className='w-100 justify-content-center mt-1'>
                {row.map((col, index) =>
                    <CCol key={index} className="mx-2">
                        {col.label? <div className='size-text color-base weight-600 mb-2'>{col.label}</div> : <></>}
                        {col.type === 'select'?
                            (<CFormSelect defaultValue={col.options.find(option => option.value === state[col.id] )?.value || col.options.find(option => option ===  state[col.id] ) || {value: "", label: "Seleziona"}} disabled={col.disabled} options={[{value: "", label: "Seleziona"}].concat(col.options)} value={state[col]} required={col.required} onChange={e => setStateFunction({...state, [col.id] : e.target.value})} aria-label="Default select example" className='size-text color-base weight-400 rounded-1 py-1 border-light '>
                            </CFormSelect>)
                            : col.type === 'input'?
                                (<CFormInput
                                    placeholder={col.placeholder}
                                    onChange={e => setStateFunction({...state, [col.id] : e.target.value})}
                                    value={state[col.id]}
                                    disabled={col.disabled}
                                    className='size-text color-base weight-400 rounded-1 py-1 border-light '
                                    required={col.required}
                                    readOnly={col.readOnly || false}
                                    />)
                                    : col.type === 'title'?
                                    (<div className='size-header color-base weight-700 mb-2'>{col.label}</div>)
                                    : col.type === 'checkbox'?
                                    (
                                        <CFormCheck 
                                        value={!state[col.id]}
                                        checked={state[col.id]}
                                        disabled={col.disabled}
                                        onChange={e => setStateFunction({...state, [col.id] : e.target.checked})}
                                        className='size-subHeader color-base weight-600 mb-2 rounded-1' label={col.label}/>
                                        )
                                        : col.type === 'multi-check'?
                                        (
                                            col.checks.map((check, index) =>
                                            <CFormCheck className='size-text color-base weight-400 mb-2 mx-4 rounded-1' 
                                            key={check}
                                            value={check}
                                            checked={state[col.id]?.includes(check)}
                                            onChange={e => e.target.checked ? setStateFunction({...state, [col.id] : [...state[col.id], e.target.value]}) : setStateFunction({...state, [col.id] : state[col.id].filter(check => check !== e.target.value)})}
                                            disabled={col.disabled}
                                            label={check}/>
                                            )
                                            )
                                            : col.type === 'file'?
                                            (
                                            <div className="d-flex">
                                            <CFormInput
                                                type="file"
                                                name={col.id}
                                                required={col.required}
                                                disabled={col.disabled}
                                                onChange={e => setStateFunction({...state, [col.id] : e.target.files[0]})}
                                                className='size-text color-base weight-400 rounded-1 py-1 border-light '
                                                />
                                            {state[col.id] && <NavLink className="size-text weight-600 d-flex align-items-center p-1 mx-1 nav-link" to={BASE_URL + state[col.id]} target="_blank" rel="noopener noreferrer"><CIcon icon={cilResizeBoth}/></NavLink>}
                                            </div>
                                            )
                                                : col.type === 'date'?
                                                (<CDatePicker
                                                    className=''
                                                    disabled={col.disabled}
                                                    locale='It-it'
                                                    size="sm"
                                                    date={state[col.id]}
                                                    footer
                                                    required={col.required}
                                                    onDateChange={date => setStateFunction({...state, [col.id] : new Date(date).toISOString().slice(0, 19).replace('T', ' ')})}
                                                    />)
                                                    : col.type === 'maps'?
                                                    (
                                                        <Wrapper apiKey={"AIzaSyCL8WuUCN0OH4dqp6j8Rz2LPcw8oAlAWJw"} render={render} >
                                                            <GoogleMap center={{lat: Number(state[col.id]?.split(",")[0]), lng: Number(state[col.id]?.split(" ")[1])}} zoom={15}/>
                                                        </Wrapper>
                                                    )
                                                    : col.type === 'multi-select'?
                                                    (
                                                        <CMultiSelect selectionType="text" onChange={selects => setStateFunction({...state, [col.id] : selects.map(select => select.value)})} placeholder="Seleziona" size="sm" className='size-text color-base weight-400 rounded-1 py-1 border-light' options={col.options.map(option => state[col.id]?.includes(option.value) ? {...option, selected : 1} : option)} />
                                                    )
                                                    : <></>
                                                }
                    </CCol>
                )}
            </CRow>
        )
        )
    }
    
    
    export default BaseForm