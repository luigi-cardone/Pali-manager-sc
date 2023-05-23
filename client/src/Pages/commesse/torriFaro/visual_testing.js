import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import BaseForm from '../../../Forms/baseForm'

export const VisualTesting = () => {
    const [plData, setPlData] = useOutletContext()
    const [data, setData] = useState(plData.visual_testing)
    const formData = [
        [
            {
                required: false,
                id: "esame_diretto",
                label: "Esame Diretto",
                type : "checkbox"
            },
            {
                required: false,
                id: "dist_osservazione",
                label: "Distanza di osservazione",
                type : "select",
                options : ["<600 mm", ">600 mm"]
            },
            {
                required: false,
                id: "attrezz_ausiliarie",
                label: "Attrezzature ausiliarie",
                type : "input",
                placeholder : "Calibro Millesimale"
            }
        ],
        [
            {
                required: false,
                id: "esame_diretto_tipi",
                label: "",
                type : "multi-check",
                checks : ["Non Assistito", "Assistito con Lente", "Assistito con specchio", "Assistito con endoscopio"]
            }
        ],
        [
            {
                required: false,
                id: "esame_indiretto",
                label: "Esame Indiretto",
                type : "checkbox"
            },
            {
                required: false,
                id: "angolo_osservazione",
                label : "Angolo di osservazione",
                type : "input",
                options : ">30°"
            },
            {
                required: false,
                id: "illuminazione",
                label: "Illuminazione",
                type : "input",
                placeholder : ">160 lux"
            }
        ],
        [
            
            {
                required: false,
                id: "esame_indiretto_tipi",
                label: "",
                type : "multi-check",
                checks : ["Fotografico", "Video", "Altro"]
            }
        ]
    ]

    useEffect(() =>{
        setPlData({...plData, visual_testing: data})
    },[data])

    return (
        <BaseForm state={data} setStateFunction={setData} data_set={formData}/>
    )
}
