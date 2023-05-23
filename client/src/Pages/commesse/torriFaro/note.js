import { useState } from 'react'
import { CCol, CRow } from '@coreui/react'
import { useOutletContext } from 'react-router-dom'
import { CMultiSelect } from '@coreui/react-pro'


export const Note = (props) => {
    const [plData, setPlData] = useOutletContext()
    const [tempNotes, setTempNotes] = useState([])
    const [oldNotes, setOldNotes] = useState([
        "Base fusto Corrosa",
        "Cordini Corrosi",
        "Cordini Rivestiti",
        "Lucchetto torre Mancante",
        "Plinto fortemente Lesionato",
        "Plinto lievemente Lesionato",
        "Plinto Verificato",
        "Presenza Acqua interno torre",
        "Tirafondi Corrosi",
        "Torre Faro Inghisata"
    ])
    return (
            <CRow>
            <CCol>
                <CMultiSelect optionsMaxHeight="20" virtualScroller onChange={selects => setPlData({...plData, note: tempNotes.concat(selects.map(select => select.value))})} placeholder="Inserisci nota" size="sm" className='size-text color-base weight-400 rounded-1 py-0 border-light w-75' options={oldNotes.map(note => ({text: note, value: note}))} />
            </CCol>
            <CCol>
                {
                    <ul className='mt-1'>
                    {plData.note.map((nota, index) =>
                        <li key={index} className='size-text'>{nota}</li>
                        )}
                    </ul>
                }
            </CCol>
        </CRow>
    )
}
