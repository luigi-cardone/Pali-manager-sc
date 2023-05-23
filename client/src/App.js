import '@coreui/coreui/dist/css/coreui.min.css'
import './App.css';
import './_settings.scss'
import '@coreui/coreui-pro/dist/css/coreui.min.css'
import { Routes, Route } from "react-router-dom";
import Layout from './layout';
import RequiredAuth from './Components/requireAuth';
import ROLES_LIST from './Classes/roles';
import PersistLogin from './Components/persistLogin';
import { Dashboard } from './Pages/dashboard';
import { Users } from './Pages/users';
import { Commesse } from './Pages/commesse';
import { Commessa } from './Pages/commesse/commessa';
import { RicercaSostegno } from './Pages/ricerca_sostegno';
import { Settings } from './Pages/settings';
import { Map } from './Pages/map';
import { Report } from './Pages/report';
import { Log } from './Pages/log';
import { Panoramica } from './Pages/commesse/panoramica';
import { PuntiLuce } from './Pages/commesse/punti_luce';
import { PlUsers } from './Pages/commesse/pl_users';
import { CheckAndValidation } from './Pages/commesse/check_and_validation';
import { GruopActions } from './Pages/commesse/group_actions';
import Unauthorized from './Pages/goto/unauthorized'
import Login from './Forms/login';
import { DatiGenerali } from './Pages/commesse/torriFaro/dati_generali';
import { VisualTesting } from './Pages/commesse/torriFaro/visual_testing';
import { UltrasonicTesting } from './Pages/commesse/torriFaro/ultrasonic_testing';
import { MagneticTesting } from './Pages/commesse/torriFaro/magnetic_testing';
import { VerStrutturale } from './Pages/commesse/torriFaro/ver_strutturale';
import { VerElettromeccanica } from './Pages/commesse/torriFaro/ver_elettromeccanica';
import { Note } from './Pages/commesse/torriFaro/note';
import { VerRettilineita } from './Pages/commesse/torriFaro/ver_rettilineita';
import { AreeTerritoriali } from './Pages/settings/aree_territoriali';
import { Clienti } from './Pages/settings/clienti';
import { Comuni } from './Pages/settings/comuni';
import { Fornitori } from './Pages/settings/fornitori';
import { Attestato } from './Pages/commesse/torriFaro/attestato';
import { TorreFaro } from './Pages/commesse/torriFaro/torre_faro';
import { PdfPreview } from './Pages/commesse/torriFaro/pdf_preview';
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
          
      <Route element={<PersistLogin/>}>
      <Route path='pdf_preview' element={<PdfPreview/>} />
        <Route element={<RequiredAuth allowedRoles={[ROLES_LIST[0]]} />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard/>} />
            <Route path='Commesse/'>
              <Route index element={<Commesse/>}/>
              <Route path=':commessa_id/' element={<Commessa/>}>
                <Route index element={<Panoramica/>}/>
                <Route path='punti_luce' index element={<PuntiLuce/>}/>
                <Route path='punti_luce/:commessa_cod/:pl_id/' element={<TorreFaro/>}>
                  <Route index element={<DatiGenerali/>}/>
                  <Route path='visual_testing' element={<VisualTesting/>}/>
                  <Route path='ultrasonic_testing' element={<UltrasonicTesting/>}/>
                  <Route path='magnetic_testing' element={<MagneticTesting/>}/>
                  <Route path='ver_strutturale' element={<VerStrutturale/>}/>
                  <Route path='ver_elettromeccanica' element={<VerElettromeccanica/>}/>
                  <Route path='note' element={<Note/>}/>
                  <Route path='ver_rettilineita' element={<VerRettilineita/>}/>
                  <Route path='attestato' element={<Attestato/>}/>
                </Route>
                <Route path='users' element={<PlUsers/>}/>
                <Route path='group_actions' element={<GruopActions/>}/>
                <Route path='check_and_validation' element={<CheckAndValidation/>}/>
              </Route>
            </Route>
            <Route path='/Users' element={<Users/>} />
            <Route path='/RicercaSostegno' element={<RicercaSostegno/>} />
            <Route path='Settings/' element={<Settings/>}>
                <Route element={<AreeTerritoriali/>} index/>
                <Route path='clienti' element={<Clienti/>}/>
                <Route path='comuni' element={<Comuni/>}/>
                <Route path='fornitori' element={<Fornitori/>}/>
            </Route>
            <Route path='/Map' element={<Map/>} />
            <Route path='/Report' element={<Report/>} />
            <Route path='/Log' element={<Log/>} />
          </Route>
          <Route element={<RequiredAuth allowedRoles={[ROLES_LIST[0], ROLES_LIST[4]]} />}></Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
