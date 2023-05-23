import {useState} from 'react'
import { CRow, CCol, CFormSelect } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPenAlt, cilPlus } from '@coreui/icons'
import { useOutletContext } from 'react-router-dom'
import { ModalSezioneTesta } from '../../../Forms/puntoLuce/modal_sezione_testa'
import { ModalSezioneCustom } from '../../../Forms/puntoLuce/modal_modello_custom'
import { ModalSezioneBase } from '../../../Forms/puntoLuce/modal_sezione_base'
import BASE_URL from '../../../config/baseURL'


export const VerStrutturale = () => {
  const [plData, setPlData] = useOutletContext()
  const [isModalVisible, setIsModalVisible] = useState("")

  return (
    <>
    <ModalSezioneBase title="Modifica Dati Sezione Base" isVisible={isModalVisible === "sezione_testa"} data={plData.verifica_strutturale.sezione_base} setPlData={setPlData} plData={plData} onClose={() => setIsModalVisible("")} />
    <ModalSezioneCustom title="Aggiungi sezione" isVisible={isModalVisible === '0'} data={{}} setPlData={setPlData} plData={plData} onClose={() => setIsModalVisible("")} />
    <ModalSezioneTesta title="Modifica Dati Sezione di Testa" isVisible={isModalVisible === "sezione_base"} data={plData.verifica_strutturale.sezione_testa} setPlData={setPlData} plData={plData} onClose={() => setIsModalVisible("")}/>
      <CRow>
        <CCol>
            <div className='size-text color-base weight-600 mb-2'>Scegli Modello</div>
            <CFormSelect
            className='size-text color-base weight-400 rounded-1 py-1 border-light w-75'
            onChange={e => setPlData({...plData, verifica_strutturale : {...plData.verifica_strutturale, modello: e.target.value}})}
            >
              <option>Seleziona modello</option>
              <option className='size-text color-base'>Torri 2 Tronchi</option>
            </CFormSelect>
            <div className='size-text color-base weight-700 my-2 cursor-pointer' onClick={() => setIsModalVisible("sezione_testa")}>SEZIONE DI TESTA <CIcon size='sm' icon={cilPenAlt}/></div>
            {
              Object.keys(plData.verifica_strutturale).filter(sezione => sezione !== "sezione_testa" && sezione !== "sezione_base" && sezione !== "modello" && sezione !== "img").map((sezione, index) => (
                <>
                  <div key={sezione} className='size-text color-base weight-700 my-2 cursor-pointer' onClick={() => setIsModalVisible(sezione)}>{plData.verifica_strutturale[sezione].nome_sezione.toUpperCase()}<CIcon size='sm' icon={cilPenAlt}/></div>
                  <ModalSezioneCustom key={index} title={plData.verifica_strutturale[sezione].nome_sezione.toUpperCase()} isVisible={isModalVisible === sezione} data={plData.verifica_strutturale[sezione]} setPlData={setPlData} plData={plData} onClose={() => setIsModalVisible("")} />
                </>
                ))
              }
            <div className='size-text color-base weight-700 my-2 cursor-pointer' onClick={() => setIsModalVisible("0")}>AGGIUNGI SEZIONE <CIcon size='sm' icon={cilPlus}/></div>
            <div className='size-text color-base weight-700 mb-2 cursor-pointer' onClick={() => setIsModalVisible("sezione_base")}>SEZIONE BASE <CIcon size='sm' icon={cilPenAlt}/></div>
        </CCol>
        <CCol>
            <div className='size-text color-base weight-600 mb-2'>Anteprima Disegno Grafico</div>
            <img onError={(e) => e.target.style.display = "none"} alt='img_verifica_strutturale' src={BASE_URL+plData.dati_generali.verifica_strutturale_file}/>
        </CCol>
      </CRow>
    </>
  )
}
