import { cilSpeedometer, cilDescription, cilPeople, cilSettings, cilBriefcase, cilMap, cilBarChart, cilSpreadsheet } from '@coreui/icons'
export const menuItems = [
    {
        name : "Dashboard",
        icon: cilSpeedometer,
        to: "/"
    },
    {
        name : "Ricerca Sostegno",
        icon: cilDescription,
        to: "/RicercaSostegno"
    },
    {
        name : "Utenti",
        icon: cilPeople,
        to: "/Users"
    },
    {
        name : "Impostazioni",
        icon: cilSettings,
        to: "/Settings"
    },
    {
        name : "Commesse",
        icon: cilBriefcase,
        to: "/Commesse"
    },
    {
        name : "Mappa",
        icon: cilMap,
        to: "/Map"
    },
    {
        name : "Report",
        icon: cilBarChart,
        to: "/Report"
    },
    {
        name : "Log",
        icon: cilSpreadsheet,
        to: "/Log"
    }        
]