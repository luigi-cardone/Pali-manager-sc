import {CCol, CFormCheck, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow} from '@coreui/react'
import logo from './assets/logo gr.png'
import intestazione1 from './assets/img_intestazione_1.jpg'
import intestazione2 from './assets/img_intestazione_2.png'
import intestazione3 from './assets/img_intestazione_3.png'
import bollo from './assets/bollo.png'
import React, { useEffect, useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import BASE_URL from '../../config/baseURL'
function GrConsultingTorreFaro({plData}, ref){
  // const [plData, setPlData] = useState({
  //   pl_id: "pl_id",
  //   dati_generali: {
  //     committente: "",
  //     costruttore: "",
  //     data: "",
  //     installazione_cantiere: "",
  //     commessa_cod: "commessa_cod",
  //     tipoligia: "",
  //     n_torre: "",
  //     tipoligia_tirafondi: "",
  //     dist_asse_tirafondi: "",
  //     n_tirafondi: "",
  //     diametro_base: "",
  //     altezza: "",
  //     materiale: "",
  //     cond_superficiali: "",
  //     indirizzo: "",
  //     planimetria_torre_file: "",
  //     verifica_strutturale_file: ""
  //   },
  //   visual_testing: {
  //     esame_diretto: false,
  //     esame_indiretto: false,
  //     esame_diretto_tipi: [],
  //     esame_indiretto_tipi: [],
  //     dist_osservazione: "",
  //     attrezz_ausiliarie: "",
  //     angolo_osservazione: "",
  //     illuminazione: "",
  //   },
  //   ultrasonic_testing: {
  //     spessimetro_marca_modello: "",
  //     spessimetro_attrezz_ausiliarie: "",
  //     trasduttore_1_f_d_a: "",
  //     trasduttore_1_marca_tipo: "",
  //     trasduttore_2_f_d_a: "",
  //     trasduttore_2_marca_tipo: "",
  //     rivelatore_universale_marca_tipo: "",
  //     rivelatore_universale_attrezz_ausiliarie: "",
  //   },
  //   magnetic_testing: {
  //     marca_modello: "",
  //     tipologia_corrente: "",
  //     attrezz_ausiliarie: "",
  //     distanza: "",
  //   },
  //   verifica_strutturale: {
  //     modello: "",
  //     sezione_testa: {
  //       n: "3,5",
  //       e: "",
  //       s: "",
  //       w: "",
  //       vt: "",
  //       ut: "",
  //       mt: "",
  //       crf: "",
  //       note: "",
  //       esito: ""
  //     },
  //     sezione_base: {
  //         n: "3,5",
  //         e: "",
  //         s: "",
  //         w: "",
  //         vt: "",
  //         ut: "",
  //         mt: "",
  //         crf: "",
  //         note: "",
  //         esito: ""
  //     },
  //     img: "",
  //   },
  //   voci: [],
  //   note: [],
  //   verifica_rettilineita: {
  //     diametro: [],
  //     zona_misura: {
  //       gradi_0: "",
  //       gradi_90: "",
  //       gradi_180: "",
  //       gradi_270: "",
  //     },
  //   },
  //   attestato: {
  //     n_torre: "",
  //     luogo: "",
  //     comune: "",
  //     tecnico_1: "",
  //     tecnico_2: "",
  //     misurazioni: `1. verifica visiva sulla superficie esterna del sostegno alla base d’incastro e nella parte in elevazione;\n2. verifica della geometria del sostegno;\n3. annotazione di tutte le anomalie riscontrate;\n4. misura UTS dello spessore max e min del palo in più punti se necessario;\n5. caratterizzazione morfologica delle eventuali forme di corrosione presenti sulla superficie esterna del sostegno nella zona d’incastro con il terreno (per terreno si deve intendere il materiale nel quale il palo è allocato);\n6. misura della velocità di corrosione CRT per la zona del palo inserita nel terreno compatibilmente con la messa a terra del palo e l’omogeneità del terreno e in funzione della reale necessità di rilevare tale misura;\n7. realizzazione di una o più foto in funzione di quanto rilevato;\nutilizzando la strumentazione di seguito riportata idonea alla tipologia di verifica in oggetto, regolarmente omologata e sottoposta a periodiche revisioni di taratura annuale:\n`,
  //     spessimetro: {
  //       modello: "",
  //       matricola: ""
  //     },
  //     corrosimetro: {
  //       modello: "",
  //       matricola: ""
  //     },
  //     chiave_dinamometrica: "",
  //     chiave_dinamometrica_matricola: "",
  //     data: "",
  //     certificazione: `1. il FUSTO della Torre Faro N. 1, installata in Centro Mercafir nel Comune di FIRENZE, risulta meccanicamente idoneo al servizio per ulteriori 36 mesi dalla data del controllo ovvero sino al INSERIRE DATA a causa della corrosione della superficie interna.\nSi prescrive di sostituire le parti corrose e forate (tubolari e grigliato Keller) della struttura porta fari ed eseguire un trattamento anticorrosivo di tutte le parti corrose presenti sulla torre mediante pulitura dell'ossido ed applicazione di primer .`,
  //     condizioni: `1. verificare la struttura visivamente ogni 24 mesi od ogni qualvolta viene effettuato un intervento di qualunque tipo se la corrosione è assente. \n2. verificare la torre faro ogni qualvolta la zona circostante è interessata da lavori stradali che richiedano l’uso di macchinari;\n3. verificare la torre ogni qualvolta viene colpita da scariche atmosferiche;\n4. verificare la torre se interessata urti considerevoli di qualunque natura, versamenti di liquidi corrosivi, fessurazione evidente del basamento in cls`
  //   }
  // })
  // console.log(plData)
  // const axiosPrivate = useAxiosPrivate()
  // useEffect(() =>{
  //   const getTorreFaro = async () =>{
  //     try{
  //       const res = await axiosPrivate.get("/pl/getTorreFaro/"+3)
  //       setPlData({...plData, 
  //         dati_generali: {...JSON.parse(res.data[0]?.dati_generali), planimetria_torre_file: res.data[0]?.planimetria_torre_file, verifica_strutturale_file: res.data[0]?.verifica_strutturale_file} || plData.dati_generali,
  //         visual_testing: JSON.parse(res.data[0]?.visual_testing) || plData.visual_testing,
  //         ultrasonic_testing: JSON.parse(res.data[0]?.ultrasonic_testing) || plData.ultrasonic_testing,
  //         magnetic_testing: JSON.parse(res.data[0]?.magnetic_testing) || plData.magnetic_testing,
  //         verifica_strutturale: JSON.parse(res.data[0]?.verifica_strutturale) || plData.verifica_strutturale,
  //         voci: JSON.parse(res.data[0]?.voci) || [],
  //         note: JSON.parse(res.data[0]?.voci) || [],
  //         verifica_rettilineita: JSON.parse(res.data[0]?.verifica_rettilineita) || plData.verifica_rettilineita,
  //         attestato: JSON.parse(res.data[0]?.attestato) || plData.attestato
  //       })
  //       }
  //       catch (err){
  //       }
  //     }
  //     getTorreFaro()
  // }, [])
  const style = {
    body:{
      background: "white"
    },
    page:{
      background: "white",
      height: "1400px",
      width: "1000px"
    },
    logo: {
      width: "100px",
      height: "auto"
    },
    intestazione: {
      width: "100px",
      height: "auto"
    },
    table: {
      border: "1px solid black"
    }
  }
  return (
    <div ref={ref} className="" style={style.body}>
      <CCol style={style.page}>
        <div className='d-flex justify-content-between'>
          <img style={style.logo} alt='' src={logo}/>
          <div className='d-flex'>
            <img style={style.intestazione} alt='' src={intestazione1}/>
            <img style={style.intestazione} alt='' src={intestazione2}/>
            <img style={style.intestazione} alt='' src={intestazione3}/>
          </div>
        </div>
        <h2 className='text-center mt-2 size-title'>VERIFICA STRUTTURALE DELLA TORRE FARO</h2>
        <CTableHeaderCell style={{fontSize: "25px"}} className='border-danger border border-4 text-center d-flex justify-content-center'>DATI GENERALI DELLA TORRE</CTableHeaderCell>
        <CTable bordered borderColor="dark" className='m-0'>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Committente</CTableHeaderCell>
            <CTableHeaderCell scope="col">Costruttore</CTableHeaderCell>
            <CTableHeaderCell scope="col">Data</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableDataCell>{plData.dati_generali.plData}</CTableDataCell>
            <CTableDataCell>{plData.dati_generali.costruttore}</CTableDataCell>
            <CTableDataCell>{plData.dati_generali.data}</CTableDataCell>
          </CTableRow>
        </CTableBody>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell colSpan={2} scope="col">Installazione/Cantiere</CTableHeaderCell>
            <CTableHeaderCell scope="col">Commessa</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableDataCell colSpan={2}>{plData.dati_generali.installazione_cantiere}</CTableDataCell>
            <CTableDataCell>{plData.dati_generali.commessa_cod}</CTableDataCell>
          </CTableRow>
        </CTableBody>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell colSpan={2} scope="col">Tipologia Torre</CTableHeaderCell>
            <CTableHeaderCell scope="col">N. Torre</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableDataCell colSpan={2}>{plData.dati_generali.tipoligia}</CTableDataCell>
            <CTableDataCell>{plData.dati_generali.n_torre}</CTableDataCell>
          </CTableRow>
        </CTableBody>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Tipologia Tirafondi</CTableHeaderCell>
            <CTableHeaderCell scope="col">Dist. Asse Tirafondi – Fusto Torre (cm)</CTableHeaderCell>
            <CTableHeaderCell scope="col">N. Tirafond</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableDataCell>{plData.dati_generali.tipoligia_tirafondi}</CTableDataCell>
            <CTableDataCell>{plData.dati_generali.dist_asse_tirafondi}</CTableDataCell>
            <CTableDataCell>{plData.dati_generali.n_tirafondi}</CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
      <CTable bordered borderColor="dark">
        <CTableHead>
            <CTableRow>
              <CTableHeaderCell className='w-50' scope="col">Diametro alla Base (cm)</CTableHeaderCell>
              <CTableHeaderCell className='w-50' scope="col">Altezza Torre (m)</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <CTableDataCell>{plData.dati_generali.diametro_base}</CTableDataCell>
              <CTableDataCell>{plData.dati_generali.altezza}</CTableDataCell>
            </CTableRow>
          </CTableBody>
        <CTableHead>
            <CTableRow>
              <CTableHeaderCell className='w-50' scope="col">Materiale</CTableHeaderCell>
              <CTableHeaderCell className='w-50' scope="col">Condizioni Superficiali</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <CTableDataCell>{plData.dati_generali.materiale}</CTableDataCell>
              <CTableDataCell>{plData.dati_generali.cond_superficiali}</CTableDataCell>
            </CTableRow>
          </CTableBody>
      </CTable>
      </CCol>
      <CCol style={style.page}>
        <div className='d-flex justify-content-between'>
          <img style={style.logo} alt='' src={logo}/>
          <div className='d-flex'>
            <img style={style.intestazione} alt='' src={intestazione1}/>
            <img style={style.intestazione} alt='' src={intestazione2}/>
            <img style={style.intestazione} alt='' src={intestazione3}/>
          </div>
        </div>
        <h2 className='text-center mt-2 size-title'>VERIFICA STRUTTURALE DELLA TORRE FARO</h2>
        <CTableHeaderCell style={{fontSize: "25px"}} className='border-danger border border-4 text-center d-flex justify-content-center'>VISUAL TESTING (VT) – TECNICA ED ATTREZZATURE</CTableHeaderCell>
        <CTable bordered borderColor="dark" className='m-0'>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell className='text-center' scope="col">Esame Diretto <CFormCheck readOnly checked={plData.visual_testing.esame_diretto === "true"} /></CTableHeaderCell>
            <CTableHeaderCell className='text-center' scope="col">Esame indiretto <CFormCheck readOnly checked={plData.visual_testing.esame_indiretto === "false"} /></CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
            <CTableRow>
              <CTableDataCell className='w-50'>
                <div className='d-flex justify-content-between'>
                Non Assistito <CFormCheck readOnly checked={plData.visual_testing.esame_diretto_tipi.includes("Non Assistito")}/>
                </div>
                </CTableDataCell>
              <CTableDataCell><div className='d-flex justify-content-between'>Fotografico <CFormCheck readOnly checked={plData.visual_testing.esame_diretto_tipi.includes("Fotografico")}/></div></CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell><div className='d-flex justify-content-between'>Assistito con lente <CFormCheck readOnly checked={plData.visual_testing.esame_diretto_tipi.includes("Assistito con lente")}/></div></CTableDataCell>
              <CTableDataCell><div className='d-flex justify-content-between'>Video <CFormCheck readOnly checked={plData.visual_testing.esame_diretto_tipi.includes("Video")}/></div></CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell><div className='d-flex justify-content-between'>Assistito con specchio <CFormCheck readOnly checked={plData.visual_testing.esame_diretto_tipi.includes("Assistito con specchio")}/></div></CTableDataCell>
              <CTableDataCell><div className='d-flex justify-content-between'>Altro <CFormCheck readOnly checked={plData.visual_testing.esame_diretto_tipi.includes("Altro")}/></div></CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell><div className='d-flex justify-content-between'>Assistito con Endoscopio <CFormCheck readOnly checked={plData.visual_testing.esame_diretto_tipi.includes("Assistito con Endoscopio")}/></div></CTableDataCell>
              <CTableDataCell></CTableDataCell>
            </CTableRow>
          </CTableBody>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell className='w-50' scope="col">Distanza di Osservazione</CTableHeaderCell>
              <CTableHeaderCell className='w-50' scope="col">Angolo di Osservazione</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <CTableDataCell>{plData.visual_testing.dist_osservazione}</CTableDataCell>
              <CTableDataCell>{plData.visual_testing.angolo_osservazione}</CTableDataCell>
            </CTableRow>
          </CTableBody>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell className='w-50' scope="col">Attrezzature Ausiliarie</CTableHeaderCell>
              <CTableHeaderCell className='w-50' scope="col">Illuminazione</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <CTableDataCell>{plData.visual_testing.attrezz_ausiliarie}</CTableDataCell>
              <CTableDataCell>{plData.visual_testing.illuminazione}</CTableDataCell>
            </CTableRow>
          </CTableBody>
      </CTable>
      <CTableHeaderCell style={{fontSize: "25px"}} className='border-danger border border-4 text-center d-flex justify-content-center'>ULTRASONIC TESTING (UT) – TECNICA ED ATTREZZATURE</CTableHeaderCell>
      <CTable bordered borderColor="dark" className='m-0'>
          <CTableHead>
          <CTableRow>
            <CTableHeaderCell className='w-50 text-center' scope="col">SPESSIMETRO</CTableHeaderCell>
            <CTableHeaderCell className='w-50 text-center' scope="col">TRASDUTTORE</CTableHeaderCell>
          </CTableRow>
          </CTableHead>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell className='w-50' scope="col">Marca/Modello</CTableHeaderCell>
              <CTableHeaderCell className='w-50' scope="col">Marca/Tipo</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <CTableDataCell>{plData.ultrasonic_testing.spessimetro_marca_modello}</CTableDataCell>
              <CTableDataCell>{plData.ultrasonic_testing.trasduttore_1_marca_tipo}</CTableDataCell>
            </CTableRow>
          </CTableBody>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell className='w-50' scope="col">Attrezzature Ausiliarie</CTableHeaderCell>
              <CTableHeaderCell className='w-50' scope="col">Frequenza/Dimensione/Angolo</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <CTableDataCell>{plData.ultrasonic_testing.spessimetro_attrezz_ausiliarie}</CTableDataCell>
              <CTableDataCell>{plData.ultrasonic_testing.trasduttore_1_f_d_a}</CTableDataCell>
            </CTableRow>
          </CTableBody>
          <CTableHead>
          <CTableRow>
            <CTableHeaderCell className='w-50 text-center' scope="col">RILEVATORE UNIVERSALE</CTableHeaderCell>
            <CTableHeaderCell className='w-50 text-center' scope="col">TRASDUTTORE</CTableHeaderCell>
          </CTableRow>
          </CTableHead>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell className='w-50' scope="col">Marca/Modello</CTableHeaderCell>
              <CTableHeaderCell className='w-50' scope="col">Marca/Tipo</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <CTableDataCell>{plData.ultrasonic_testing.rivelatore_universale_marca_tipo}</CTableDataCell>
              <CTableDataCell>{plData.ultrasonic_testing.trasduttore_2_marca_tipo}</CTableDataCell>
            </CTableRow>
          </CTableBody>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell className='w-50' scope="col">Attrezzature Ausiliarie</CTableHeaderCell>
              <CTableHeaderCell className='w-50' scope="col">Frequenza/Dimensione/Angolo</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <CTableDataCell>{plData.ultrasonic_testing.rivelatore_universale_attrezz_ausiliarie}</CTableDataCell>
              <CTableDataCell>{plData.ultrasonic_testing.trasduttore_2_f_d_a}</CTableDataCell>
            </CTableRow>
          </CTableBody>
      </CTable>
      <CTableHeaderCell style={{fontSize: "25px"}} className='border-danger border border-4 text-center d-flex justify-content-center'>MAGNETIC TESTING (MT) – TECNICA ED ATTREZZATURE</CTableHeaderCell>
      <CTable bordered borderColor="dark" className='m-0'>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell className='w-50' scope="col">Marca/Modello</CTableHeaderCell>
              <CTableHeaderCell className='w-50' scope="col">Tipologia/Corrente</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <CTableDataCell>{plData.magnetic_testing.marca_modello}</CTableDataCell>
              <CTableDataCell>{plData.magnetic_testing.tipologia_corrente}</CTableDataCell>
            </CTableRow>
          </CTableBody>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell className='w-50' scope="col">Attrezzature Ausiliarie</CTableHeaderCell>
              <CTableHeaderCell className='w-50' scope="col">Distanza</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <CTableDataCell>{plData.magnetic_testing.attrezz_ausiliarie}</CTableDataCell>
              <CTableDataCell>{plData.magnetic_testing.distanza}</CTableDataCell>
            </CTableRow>
          </CTableBody>
      </CTable>
      </CCol>
      <CCol style={style.page}>
        <div className='d-flex justify-content-between'>
          <img style={style.logo} alt='' src={logo}/>
          <div className='d-flex'>
            <img style={style.intestazione} alt='' src={intestazione1}/>
            <img style={style.intestazione} alt='' src={intestazione2}/>
            <img style={style.intestazione} alt='' src={intestazione3}/>
          </div>
        </div>
        <h2 className='text-center mt-2 size-title'>CERTIFICATO DI COLLAUDO TORRE FARO</h2>
        <h3 style={{fontSize: "20px"}} className='text-center mt-4 size-title weight-700'>SCHEDA DELLA VERIFICA ELETTROMECCANICA</h3> 
        <CTable bordered borderColor="dark" className='m-0'>
        <CTableHead style={{backgroundColor: "#fe6060", color: "white"}}>
        <CTableRow>
            <CTableHeaderCell scope="col">N°</CTableHeaderCell>
            <CTableHeaderCell style={{width: "80%"}} scope="col">DESCRIZIONE ATTIVITÀ’ SVOLTA</CTableHeaderCell>
            <CTableHeaderCell scope="col">Eseguita</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {plData.voci.map((voce, index) =>(
            <CTableRow key={index}>
              <CTableDataCell className='text-center'>{index + 1}</CTableDataCell>
              <CTableDataCell>{voce}</CTableDataCell>
              <CTableDataCell className='text-center'>OK</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
        </CTable>
      </CCol>
      <CCol style={style.page}>
        <div className='d-flex justify-content-between'>
          <img style={style.logo} alt='' src={logo}/>
          <div className='d-flex'>
            <img style={style.intestazione} alt='' src={intestazione1}/>
            <img style={style.intestazione} alt='' src={intestazione2}/>
            <img style={style.intestazione} alt='' src={intestazione3}/>
          </div>
        </div>
        <h2 className='text-center mt-2 size-title'>VERIFICA STRUTTURALE DELLA TORRE FARO</h2>
        <CTable bordered borderColor="dark" className='m-0'>
        <CTableHead style={{backgroundColor: "#fe6060", color: "white"}}>
        <CTableRow>
            <CTableHeaderCell scope="col">Riferimento N°</CTableHeaderCell>
            <CTableHeaderCell style={{width: "80%"}} scope="col">NOTE - COMMENTI - ANOMALIE</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {plData.note.map((nota, index) =>(
            <CTableRow key={index}>
              <CTableDataCell className='text-center'>{index + 1}</CTableDataCell>
              <CTableDataCell>{nota}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
        </CTable>
        <CRow>
          <CCol>

          </CCol>
        </CRow>
        <CRow className='d-flex p-1'>
              {plData.verifica_rettilineita.diametro.map((misura, index) =>{
                if((index + 1)  % 5 === 3) return (
                <CCol key={index} className='m-1' xs={4}>
                <CTable bordered borderColor="dark" className='m-0'>
                    <CTableHead style={{backgroundColor: "#fe6060", color: "white"}}>
                    <CTableRow>
                        <CTableHeaderCell scope="col">N°</CTableHeaderCell>
                        <CTableHeaderCell className="text-center" scope="col">Misura</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                    <CTableRow>
                      <CTableDataCell className='text-center'>{index - 1}</CTableDataCell>
                      <CTableDataCell className='text-center'>{plData.verifica_rettilineita.diametro[index - 2]}</CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableDataCell className='text-center'>{index}</CTableDataCell>
                      <CTableDataCell className='text-center'>{plData.verifica_rettilineita.diametro[index - 1]}</CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableDataCell className='text-center'>{index + 1}</CTableDataCell>
                      <CTableDataCell className='text-center'>{misura}</CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableDataCell className='text-center'>{index + 2}</CTableDataCell>
                      <CTableDataCell className='text-center'>{plData.verifica_rettilineita.diametro[index + 1] ? plData.verifica_rettilineita.diametro[index + 1] : ""}</CTableDataCell>
                    </CTableRow>
                    <CTableRow>
                      <CTableDataCell className='text-center'>{index + 3}</CTableDataCell>
                      <CTableDataCell className='text-center'>{plData.verifica_rettilineita.diametro[index + 2] ? plData.verifica_rettilineita.diametro[index + 2] : ""}</CTableDataCell>
                    </CTableRow>
                    </CTableBody>
                  </CTable>
                  </CCol>
                )
                else return <></>
              })}
        </CRow>
        <h3 style={{fontSize: "20px"}} className='text-center mt-4 size-title weight-700'>VERIFICA RETTILINEITA’</h3> 
        <CRow>
          <CCol>
            
          </CCol>
          <CCol>
          <CTable bordered borderColor="dark" className='m-0'>
            <CTableHead style={{backgroundColor: "#fe6060", color: "white"}}>
            <CTableRow>
                <CTableHeaderCell scope="col">0°</CTableHeaderCell>
                <CTableHeaderCell scope="col">90°</CTableHeaderCell>
                <CTableHeaderCell scope="col">180°</CTableHeaderCell>
                <CTableHeaderCell scope="col">270°</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
                <CTableRow>
                  <CTableDataCell className='text-center'>{plData.verifica_rettilineita.zona_misura.gradi_0}</CTableDataCell>
                  <CTableDataCell className='text-center'>{plData.verifica_rettilineita.zona_misura.gradi_90}</CTableDataCell>
                  <CTableDataCell className='text-center'>{plData.verifica_rettilineita.zona_misura.gradi_180}</CTableDataCell>
                  <CTableDataCell className='text-center'>{plData.verifica_rettilineita.zona_misura.gradi_270}</CTableDataCell>
                </CTableRow>
            </CTableBody>
          </CTable>
          </CCol>
        </CRow>
      </CCol>
      <CCol style={style.page}>
        <div className='d-flex justify-content-between'>
          <img style={style.logo} alt='' src={logo}/>
          <div className='d-flex'>
            <img style={style.intestazione} alt='' src={intestazione1}/>
            <img style={style.intestazione} alt='' src={intestazione2}/>
            <img style={style.intestazione} alt='' src={intestazione3}/>
          </div>
        </div>
        <h2 className='text-center mt-2 size-title'>VERIFICA STRUTTURALE DELLA TORRE FARO</h2>
        <h3 style={{fontSize: "20px"}} className='text-center mt-4 size-title weight-700'>VERIFICA STRUTTURALE</h3> 
        <CRow>
          <CCol className='mx-1'>
            <img style={{maxHeight: "1114px"}} className='img-fluid' alt='' src={BASE_URL + plData.dati_generali.verifica_strutturale_file} />
          </CCol>
          <CCol xs={7}>
            {
              Object.keys(plData.verifica_strutturale).filter(sezione => sezione !== "modello" && sezione !== "img").map(sezione =>(
                <div key={sezione} className='mb-3'>
                  <CTable className='mb-0' bordered borderColor="dark">
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell className='w-50 weight-700' colSpan={2} scope="col">{plData.verifica_strutturale[sezione].nome_sezione}</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                  </CTable>
                  {(!(plData.verifica_strutturale[sezione].n === "" || !plData.verifica_strutturale[sezione].n) ||
                    !(plData.verifica_strutturale[sezione].e === "" || !plData.verifica_strutturale[sezione].e) ||
                    !(plData.verifica_strutturale[sezione].w === "" || !plData.verifica_strutturale[sezione].w) ||
                    !(plData.verifica_strutturale[sezione].s === "" || !plData.verifica_strutturale[sezione].s)) &&
                    (
                    <CTable className='mb-0' bordered borderColor="dark">
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell className='w-50 weight-700' scope="col">Orientamento</CTableHeaderCell>
                            <CTableDataCell className='text-center'>N</CTableDataCell>
                            <CTableDataCell className='text-center'>E</CTableDataCell>
                            <CTableDataCell className='text-center'>S</CTableDataCell>
                            <CTableDataCell className='text-center'>W</CTableDataCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        <CTableRow>
                          <CTableHeaderCell>S (mm)</CTableHeaderCell>
                          <CTableDataCell>{plData.verifica_strutturale[sezione].n}</CTableDataCell>
                          <CTableDataCell>{plData.verifica_strutturale[sezione].e}</CTableDataCell>
                          <CTableDataCell>{plData.verifica_strutturale[sezione].s}</CTableDataCell>
                          <CTableDataCell>{plData.verifica_strutturale[sezione].w}</CTableDataCell>
                        </CTableRow>
                      </CTableBody>
                    </CTable>
                    )}
                    <CTable className='mb-0' bordered borderColor="dark">
                      <CTableBody>
                        {plData.verifica_strutturale[sezione].vt && plData.verifica_strutturale[sezione].vt !== "" && (
                          <CTableRow>
                            <CTableHeaderCell>VT</CTableHeaderCell>
                            <CTableDataCell colSpan={2}>{plData.verifica_strutturale[sezione].vt}</CTableDataCell>
                          </CTableRow>
                        )}
                        {plData.verifica_strutturale[sezione].ut && plData.verifica_strutturale[sezione].ut !== "" && (
                          <CTableRow>
                            <CTableHeaderCell>UT</CTableHeaderCell>
                            <CTableDataCell colSpan={2}>{plData.verifica_strutturale[sezione].ut}</CTableDataCell>
                          </CTableRow>
                        )}
                        {plData.verifica_strutturale[sezione].mt && plData.verifica_strutturale[sezione].mt !== "" && (
                          <CTableRow>
                            <CTableHeaderCell>MT</CTableHeaderCell>
                            <CTableDataCell colSpan={2}>{plData.verifica_strutturale[sezione].mt}</CTableDataCell>
                          </CTableRow>
                        )}
                        {plData.verifica_strutturale[sezione].crf && plData.verifica_strutturale[sezione].crf !== "" && (
                          <CTableRow>
                            <CTableHeaderCell>CRF</CTableHeaderCell>
                            <CTableDataCell colSpan={2}>{plData.verifica_strutturale[sezione].crf}</CTableDataCell>
                          </CTableRow>
                        )}
                        <CTableRow>
                            <CTableHeaderCell>Esito</CTableHeaderCell>
                              <CTableDataCell>Conforme <CFormCheck readOnly checked={plData.verifica_strutturale[sezione].esito === "Conforme"}/></CTableDataCell>
                              <CTableDataCell>Non Conforme <CFormCheck readOnly checked={plData.verifica_strutturale[sezione].esito === "Non conforme"}/></CTableDataCell>
                          </CTableRow>
                      </CTableBody>
                    </CTable>
                </div>
              ))
            }
          </CCol>
        </CRow>
      </CCol>
      <CCol style={style.page}>
        <div className='d-flex justify-content-between'>
          <img style={style.logo} alt='' src={logo}/>
          <div className='d-flex'>
            <img style={style.intestazione} alt='' src={intestazione1}/>
            <img style={style.intestazione} alt='' src={intestazione2}/>
            <img style={style.intestazione} alt='' src={intestazione3}/>
          </div>
        </div>
        <h2 className='text-center mt-2 size-title'>VERIFICA STRUTTURALE DELLA TORRE FARO</h2>
        <h3 style={{fontSize: "20px"}} className='text-center mt-4 size-title weight-700'>ATTESTATO DI ESECUZIONE MISURE</h3> 
        <p>Il sottoscritto Dott. Ing. Giancarlo Raoli, iscritto con il n. 16776 all’Ordine degl’Ingegneri di 
          Roma e II Liv. UNI ISO 9712, certifica le misure rilevate ed attesta che sulla Torre n. {plData.attestato.n_torre}, 
          installata in {plData.attestato.luogo} sono intervenuti i tecnici:</p>
        <ol>
          <li>{plData.attestato.tecnico_1}</li>
          <li>{plData.attestato.tecnico_2}</li>
        </ol>
        <p>i quali hanno eseguito le seguenti analisi e misurazioni:</p>
        <ul className='list-unstyled mx-3'>
          {plData.attestato.misurazioni.split("\n").map(misurazione =>(
            <li key={misurazione} className='mt-1'>{misurazione}</li>
            ))}
        </ul>
        <p>utilizzando la strumentazione di seguito riportata idonea alla tipologia di verifica in oggetto, 
           regolarmente omologata e sottoposta a periodiche revisioni di taratura annuale: </p>
        <h2 className='size-header weight-700'>SPESSIMETRO</h2>
        <p className='mx-1'>Modello: {plData.attestato.spessimetro.modello} Matricola: {plData.attestato.spessimetro.matricola}</p>
        <h3 className='size-header weight-700'>CORROSIMETRO</h3>
        <p className='mx-1'>Modello: {plData.attestato.corrosimetro.modello} Matricola: {plData.attestato.corrosimetro.matricola}</p>
        <p>{plData.attestato.chiave_dinamometrica}, Matricola: {plData.attestato.chiave_dinamometrica.chiave_dinamometrica_matricola}</p>
        <p>TABLET SAMSUNG TAB3 per acquisizione dati e calcolo in tempo reale dell’esito relativo 
alla stabilità meccanica e alla data di ricontrollo</p>
      </CCol>
      <CCol style={style.page}>
        <div className='d-flex justify-content-between'>
          <img style={style.logo} alt='' src={logo}/>
          <div className='d-flex'>
            <img style={style.intestazione} alt='' src={intestazione1}/>
            <img style={style.intestazione} alt='' src={intestazione2}/>
            <img style={style.intestazione} alt='' src={intestazione3}/>
          </div>
        </div>
        <h2 className='text-center mt-2 size-title'>VERIFICA STRUTTURALE DELLA TORRE FARO</h2>
        <p>A seguito delle verifiche eseguite ed in considerazione delle risultanze rilevate, in data 
{new Date(plData.attestato.data).toLocaleDateString()}, il sottoscritto Dott. Ing. Giancarlo Raoli</p>
        <p className='weight-700 text-center'>CERTIFICA CHE</p>
        <ul className='list-unstyled mx-3'>
          {plData.attestato.certificazione.split("\n").map((certifica, index) =>{
            if(index === plData.attestato.certificazione.split("\n").length - 1) return <div key={index}></div>
            return (<li key={index} className='mt-1 weight-700'>{certifica}</li>)
            })}
        </ul>
        <p className='weight-700'>{plData.attestato.certificazione.split("\n")[plData.attestato.certificazione.split("\n").length - 1]}</p>
        <p>In futuro si dovranno altresì rispettare le seguenti condizioni:</p>
        <ul className='list-unstyled mx-5'>
          {plData.attestato.condizioni.split("\n").map((condizione, index) =>{
            return (<li key={index} className='mt-1'>{condizione}</li>)
          })}
        </ul>
        <p>Nei casi sopracitati, qualora la verifica risultasse negativa, va immediatamente eseguita una verifica 
strumentale.</p>
          <CRow>
            <CCol>
              <p className='weight-600'>Roma {new Date().toLocaleDateString()}</p>
            </CCol>
            <CCol className='d-flex justify-content-end'>
              <img className='mx-3 w-75' alt='' src={bollo}/>
            </CCol>
          </CRow>
      </CCol>
    </div>
  );
} 

export default React.forwardRef(GrConsultingTorreFaro)