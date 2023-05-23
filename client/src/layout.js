import { Navbar } from "./Components/navbar";
import { Outlet } from "react-router-dom";
import { SideBar } from './Components/sidebar';
import { CContainer, CRow, CCol } from '@coreui/react';
const Layout = () => {
    return (
        <CContainer fluid>
        <CRow xs={{gutter: 0}} className="align-items-start">
          <CCol lg="auto">
            <SideBar/>
          </CCol>
          <CCol>
            <Navbar/>
            <div>
              <CContainer className="py-4 px-4" fluid>
                <Outlet/>
              </CContainer>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    )
  };
  
  export default Layout;