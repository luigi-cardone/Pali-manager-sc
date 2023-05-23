import { useState, useEffect } from 'react'
import BaseForm from '../../../Forms/baseForm'
import { useOutletContext } from 'react-router-dom'
export const DatiGenerali = (props) => {
    const [plData, setPlData] = useOutletContext()
    const [data, setData] = useState(plData.dati_generali)
    const [counter, setCounter] = useState(0)
    const formData = [
        [
            {
                required: false,
                id: "committente",
                label: "Committente",
                type : "select",
                options : ["CITEL", "CITELUM","EDISON NEXT GOVERNMENT S.r.l", "HERA SPA", "SILFI SPA", "TERNA SPA", "ARETI SPA", "MERCAFIR", "SILFI SPA", "TEA RETELUCE" ]
            },
            {
                required: false,
                id: "costruttore",
                label: "Costruttore",
                type : "select",
                options : ["EDISON NEXT GOVERNMENT S.r.l", "HERA SPA", "SILFI SPA", "TERNA SPA", "ARETI SPA", "MERCAFIR", "SILFI SPA", "TEA RETELUCE"]
            },
            {
                required: false,
                id: "data",
                label: "Data",
                type : "date"
            }
        ],
        [
            {
                required: false,
                id: "installazione_cantiere",
                label: "Installazione/Cantiere",
                type : "input",
                placeholder : ""
            },
            {
                required: false,
                id: "commessa_cod",
                label : "Commessa",
                type : "input",
                placeholder : ""
            },
            {
                required: false,
                id: "tipologia",
                label: "Tipologia",
                type : "select",
                options : [
                    "Fusto Torre a sezione poligonale decrescente composto da 2 tronchi innestati inghisato nel plinto di fondazione.",
                    "Fusto Torre a sezione poligonale decrescente composto da 3 tronchi innestati inghisato nel plinto di fondazione.",
                    "Fusto Torre a sezione poligonale decrescente composto da 4 tronchi innestati inghisato nel plinto di fondazione.",
                    "Fusto Torre a sezione poligonale decrescente composto da 2 tronchi innestati ancorato al plinto di fondazione mediante tirafondi.",
                    "Fusto Torre a sezione poligonale decrescente composto da 3 tronchi innestati ancorato al plinto di fondazione mediante tirafondi.",
                    "Fusto Torre a sezione poligonale decrescente composto da 4 tronchi innestati ancorato al plinto di fondazione mediante tirafondi.",
                    "Fusto Torre a sezione circolare composto da 2 tronchi uniti mediante giunto flangiato ed inghisato nel plinto di fondazione.",
                    "Fusto Torre a sezione circolare composto da 3 tronchi uniti mediante giunto flangiato ed inghisato nel plinto di fondazione."
                    ]
            }
        ],
        [
            {
                required: false,
                id: "n_torre",
                label: "N. Torre",
                type : "input",
                placeholder : ""
            },
            {
                required: false,
                id: "tipoligia_tirafondi",
                label : "Tipologia Tirafondi",
                type : "select",
                options : ["M24", "M27"]
            },
            {
                required: false,
                id: "dist_asse_tirafondi",
                label: "Dist. Asse Tirafondi- Fusto Torre (cm)",
                type : "input",
                placeholder : "Torre a sezione poligonale..."
            }
        ],
        [
            {
                required: false,
                id: "n_tirafondi",
                label: "N. Tirafondi",
                type : "input",
                placeholder : ""
            },
            {
                required: false,
                id: "diametro_base",
                label : "Diametro alla base",
                type : "input",
                placeholder : ""
            },
            {
                required: false,
                id: "altezza",
                label: "Altezza Torre (m)",
                type : "input",
                placeholder : ""
            }
        ],
        [
            {
                required: false,
                id: "materiale",
                label: "Materiale",
                type : "select",
                options : ["Acciaio", "Cemento armato"]
            },
            {
                required: false,
                id: "cond_superficiali",
                label : "Condizioni Superficiali",
                type : "select",
                options : [
                    "Zincatura a caldo",
                    "Zincatura a freddo",
                    "Verniciatura + zincatura",
                    "Verniciatura"
                    ]
            },
            {
                required: false,
                id: "planimetria_torre_file",
                label: "Carica Planimetria Ubicazione torre",
                type : "file",
                placeholder : "Nessun file selezionato"
            }
        ],
        [
            {
                required: false,
                id: "indirizzo",
                label: "Indirizzo",
                placeholder: "latitudine longitudine",
                type : "input",
            },
            {},
            {
                required: false,
                id: "verifica_strutturale_file",
                label: "Carica immagine verifica strutturale",
                type : "file",
                placeholder : "Nessun file selezionato"
            }
        ],
        [
            {
                required: false,
                id: "indirizzo",
                type : "maps",
            },
        ]
        ]
    useEffect(() =>{
        setData(plData.dati_generali)
        if(counter < 5) setCounter(counter + 1)
    }, [counter])
    useEffect(() =>{
        setPlData({...plData, dati_generali: data})
    },[data])

    return (
        <BaseForm state={data} setStateFunction={setData} data_set={formData}/>
    )
}
