import { useOutletContext } from 'react-router-dom'
import BaseForm from '../../../Forms/baseForm'
import { useEffect, useState } from 'react'

export const UltrasonicTesting = () => {

    const [plData, setPlData] = useOutletContext()
    const [data, setData] = useState(plData.ultrasonic_testing)

    const formData = [
        [
            {
                label: "SPESSIMETRO",
                type : "title"
            },
            {
                label: "TRASDUTTORE",
                type : "title"
            }
        ],
        [
            {
                required: false,
                id: "spessimetro_marca_modello",
                label: "Marca/Modello",
                type : "select",
                options : ["GILARDONI", "ARW – 812 matricola: n84763"]
            },
            {
                required: false,
                id: "trasduttore_1_marca_tipo",
                label: "Marca/Tipo",
                type : "select",
                options : [" GILARDONI/TG DOPPIA"]
            }
        ],
        [
            {
                required: false,
                id: "spessimetro_attrezz_ausiliarie",
                label: "Attrezzature Ausiliarie",
                type : "input",
                placeholder : "Blocco di Calibrazione a Gradini"
            },
            {
                required: false,
                id: "trasduttore_1_f_d_a",
                label : "Frequenza/Dimensione/Angolo",
                type : "input",
                placeholder : "4 MHz/10 mm/0°"
            }
        ],
        [
            {
                label: "RILEVATORE UNIVERSALE",
                type : "title"
            },
            {
                label: "TRASDUTTORE",
                type : "title"
            }
        ],
        [
            {
                required: false,
                id: "rivelatore_universale_marca_tipo",
                label: "Marca/Tipo",
                type : "select",
                options : ["OLYMPUS/EPOCH 600"]
            },
            {
                required: false,
                id: "trasduttore_2_marca_tipo",
                label: "Marca/Tipo",
                type : "select",
                options : ["OLYMPUS"]
            }

        ],
        [
            {
                required: false,
                id: "rivelatore_universale_attrezz_ausiliarie",
                label: "Attrezzature Ausiliarie ",
                type : "input",
                placeholder : "Blocco di Calibrazione V2"
            },
            {
                required: false,
                id: "trasduttore_2_f_d_a",
                label : "Frequenza/Dimensione/Angolo",
                type : "input",
                placeholder : ["4 MHz/10 mm/0°", "5 MHz/10 mm/70°"]
            }
        ],
    ]

    useEffect(() =>{
        setPlData({...plData, ultrasonic_testing: data})
    },[data])

    return (
        <BaseForm state={data} setStateFunction={setData} data_set={formData}/>
        )
}
