import { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import BaseForm from '../../../Forms/baseForm'
export const MagneticTesting = () => {
    const [plData, setPlData] = useOutletContext()
    const [data, setData] = useState(plData.magnetic_testing)

    const formData = [
                [
                    {
                        required: false,
                        id: "marca_modello",
                        label: "Marca/Modello",
                        type : "select",
                        options : ["YOKE"]
                    },
                    {
                        required: false,
                        id: "tipologia_corrente",
                        label: "Tipologia/Corrente",
                        type : "select",
                        options : []
                    }
                ],
                [
                    {
                        required: false,
                        id: "attrezz_ausiliarie",
                        label: "Attrezzature Ausiliarie",
                        type : "input",
                        placeholder : ""
                    },
                    {
                        required: false,
                        id: "distanza",
                        label : "Distanza",
                        type : "input",
                        placeholder : ""
                    }
                ]
            ]
    
    useEffect(() =>{
        setPlData({...plData, magnetic_testing: data})
    },[data])

    return (
        <BaseForm state={data} setStateFunction={setData} data_set={formData}/>
    )
}
