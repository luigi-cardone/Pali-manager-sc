import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import CIcon from '@coreui/icons-react'
import { cilVerticalAlignCenter } from '@coreui/icons'
import { CHeaderBrand, CContainer, CCol, CForm, CCard, CCardBody, CNavbar, CButton, CRow } from '@coreui/react'
import { useParams, NavLink, Outlet } from 'react-router-dom'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import ReactToPrint from 'react-to-print'
import GrConsultingTorreFaro from '../../../Components/pdfComponents/grConsultingTorrefaro'
export const TorreFaro = (props) => {
    const { pl_id, commessa_cod } = useParams()
    const axiosPrivate = useAxiosPrivate()
    let componentRef = useRef()
    const [isLoading, setIsLoading] = useState(false)
    // const [refresh, setRefresh] = useState(false)
    const menuItems = [
        {
        text: "Dati Generali",
        to: ''
      },
        {
        text: "Visual Test",
        to: 'visual_testing'
      },
        {
        text: "Ultrasonic Test",
        to: 'ultrasonic_testing'
      },
        {
        text: "Magnetic Test",
        to: 'magnetic_testing'
      },
        {
        text: "Ver. Strutturale",
        to: 'ver_strutturale'
      },
        {
        text: "Ver. Elettromeccanica",
        to: 'ver_elettromeccanica'
      },
        {
        text: "Note",
        to: 'note'
      },
        {
        text: "Ver. Rettilineità",
        to: 'ver_rettilineita'
      },
        {
        text: "Attestato",
        to: 'attestato'
      }
      ]
    const [plData, setPlData] = useState({
      pl_id: pl_id,
      dati_generali: {
        committente: "",
        costruttore: "",
        data: "",
        installazione_cantiere: "",
        commessa_cod: commessa_cod,
        tipoligia: "",
        n_torre: "",
        tipoligia_tirafondi: "",
        dist_asse_tirafondi: "",
        n_tirafondi: "",
        diametro_base: "",
        altezza: "",
        materiale: "",
        cond_superficiali: "",
        indirizzo: "",
        planimetria_torre_file: "",
        verifica_strutturale_file: ""
      },
      visual_testing: {
        esame_diretto: false,
        esame_indiretto: false,
        esame_diretto_tipi: [],
        esame_indiretto_tipi: [],
        dist_osservazione: "",
        attrezz_ausiliarie: "",
        angolo_osservazione: "",
        illuminazione: "",
      },
      ultrasonic_testing: {
        spessimetro_marca_modello: "",
        spessimetro_attrezz_ausiliarie: "",
        trasduttore_1_f_d_a: "",
        trasduttore_1_marca_tipo: "",
        trasduttore_2_f_d_a: "",
        trasduttore_2_marca_tipo: "",
        rivelatore_universale_marca_tipo: "",
        rivelatore_universale_attrezz_ausiliarie: "",
      },
      magnetic_testing: {
        marca_modello: "",
        tipologia_corrente: "",
        attrezz_ausiliarie: "",
        distanza: "",
      },
      verifica_strutturale: {
        modello: "",
        sezione_testa: {
          nome_sezione: "Sezione di testa",
          n: "3,5",
          e: "",
          s: "",
          w: "",
          vt: "",
          ut: "",
          mt: "",
          crf: "",
          note: "",
          esito: ""
        },
        sezione_base: {
          nome_sezione: "Sezione di base",
          n: "3,5",
          e: "",
          s: "",
          w: "",
          vt: "",
          ut: "",
          mt: "",
          crf: "",
          note: "",
          esito: ""
        },
        img: "",
      },
      voci: [],
      note: [],
      verifica_rettilineita: {
        diametro: [],
        zona_misura: {
          gradi_0: "",
          gradi_90: "",
          gradi_180: "",
          gradi_270: "",
        },
      },
      attestato: {
        n_torre: "",
        luogo: "",
        comune: "",
        tecnico_1: "",
        tecnico_2: "",
        misurazioni: `1. verifica visiva sulla superficie esterna del sostegno alla base d’incastro e nella parte in elevazione;\n2. verifica della geometria del sostegno;\n3. annotazione di tutte le anomalie riscontrate;\n4. misura UTS dello spessore max e min del palo in più punti se necessario;\n5. caratterizzazione morfologica delle eventuali forme di corrosione presenti sulla superficie esterna del sostegno nella zona d’incastro con il terreno (per terreno si deve intendere il materiale nel quale il palo è allocato);\n6. misura della velocità di corrosione CRT per la zona del palo inserita nel terreno compatibilmente con la messa a terra del palo e l’omogeneità del terreno e in funzione della reale necessità di rilevare tale misura;\n7. realizzazione di una o più foto in funzione di quanto rilevato;\nutilizzando la strumentazione di seguito riportata idonea alla tipologia di verifica in oggetto, regolarmente omologata e sottoposta a periodiche revisioni di taratura annuale:\n`,
        spessimetro: {
          modello: "",
          matricola: ""
        },
        corrosimetro: {
          modello: "",
          matricola: ""
        },
        chiave_dinamometrica: "",
        chiave_dinamometrica_matricola: "",
        data: "",
        certificazione: `1. il FUSTO della Torre Faro N. 1, installata in Centro Mercafir nel Comune di FIRENZE, risulta meccanicamente idoneo al servizio per ulteriori 36 mesi dalla data del controllo ovvero sino al INSERIRE DATA a causa della corrosione della superficie interna.\nSi prescrive di sostituire le parti corrose e forate (tubolari e grigliato Keller) della struttura porta fari ed eseguire un trattamento anticorrosivo di tutte le parti corrose presenti sulla torre mediante pulitura dell'ossido ed applicazione di primer .`,
        condizioni: `1. verificare la struttura visivamente ogni 24 mesi od ogni qualvolta viene effettuato un intervento di qualunque tipo se la corrosione è assente. \n2. verificare la torre faro ogni qualvolta la zona circostante è interessata da lavori stradali che richiedano l’uso di macchinari;\n3. verificare la torre ogni qualvolta viene colpita da scariche atmosferiche;\n4. verificare la torre se interessata urti considerevoli di qualunque natura, versamenti di liquidi corrosivi, fessurazione evidente del basamento in cls`
      }
    });

    const handleSavePl = async () =>{
      setIsLoading(true)
      try{
        await axiosPrivate.post("pl/updateTorreFaro", plData, { headers: {'Content-Type' : 'multipart/form-data'}})
        setIsLoading(false)
      }
      catch (err){
        setIsLoading(false)
      }
    }

    useEffect(() =>{
      const getTorreFaro = async () =>{
        setIsLoading(true)
        try{
          const res = await axiosPrivate.get("/pl/getTorreFaro/"+pl_id)
          setPlData({...plData, 
            dati_generali: {...JSON.parse(res.data[0]?.dati_generali), planimetria_torre_file: res.data[0]?.planimetria_torre_file, verifica_strutturale_file: res.data[0]?.verifica_strutturale_file} || plData.dati_generali,
            visual_testing: JSON.parse(res.data[0]?.visual_testing) || plData.visual_testing,
            ultrasonic_testing: JSON.parse(res.data[0]?.ultrasonic_testing) || plData.ultrasonic_testing,
            magnetic_testing: JSON.parse(res.data[0]?.magnetic_testing) || plData.magnetic_testing,
            verifica_strutturale: JSON.parse(res.data[0]?.verifica_strutturale) || plData.verifica_strutturale,
            voci: JSON.parse(res.data[0]?.voci) || [],
            note: JSON.parse(res.data[0]?.voci) || [],
            verifica_rettilineita: JSON.parse(res.data[0]?.verifica_rettilineita) || plData.verifica_rettilineita,
            attestato: JSON.parse(res.data[0]?.attestato) || plData.attestato
          })
          }
          catch (err){
          }
        }
        getTorreFaro()
        setIsLoading(false)
    }, [])

    return (
    <>
    <div className='m-2 p-2' style={{ display: "none" }}>
     <GrConsultingTorreFaro plData={plData} ref={(el) => (componentRef = el)} />
    </div>
    <CContainer className="my-3 contrast justify-content-center rounded-1">
        <CNavbar className="contrast rounded-1 w-100 d-flex justify-content-start rounded-1 m-0 py-3" expand='lg' colorScheme='light'>
          {menuItems.map((item, index) => 
          (
              <NavLink key={index} className={({isActive, isPending}) => `${(isActive)? "color-highlight" : "color-base"} size-text weight-600 d-flex align-items-center nav-link`} to={item.to} end>
                  <CIcon icon={item.icon} />&nbsp;{item.text}
              </NavLink>
          ))}
        </CNavbar>
    </CContainer>
    <CContainer className="my-3 p-4 contrast justify-content-center rounded-1">
        <CCol className='d-flex justify-content-between mb-3'>
            <CHeaderBrand className='size-header weight-600 d-flex align-items-center'><CIcon size='lg' className='color-highlight' icon={cilVerticalAlignCenter}/>&nbsp;{commessa_cod}</CHeaderBrand>
            <CRow className='w-25 justify-content-end'>
              <ReactToPrint
                trigger={() => <CButton shape="color-base rounded-1 contrast w-50 border-0 size-text d-flex justify-content-center shadow-sm weight-600">Scarica PDF</CButton> }
                content={() => componentRef}>
                
              </ReactToPrint>
              <CButton onClick={handleSavePl} shape="rounded-1 primary w-50 border-0 size-text d-flex justify-content-center shadow-sm weight-600">Salva punto luce</CButton> 
            </CRow>
        </CCol>
        <CCard className='background-light border-0 shadow-sm'>
            <CCardBody>
            <CForm encType="multipart/form-data" className="justify-content-center rounded-1 px-3 py-2">
              <Outlet context={[plData, setPlData]}/>
            </CForm>
            </CCardBody>
        </CCard>
    </CContainer>
    </>
    )
}
