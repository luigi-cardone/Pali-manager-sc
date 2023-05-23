import React from 'react'
import { CSpinner } from '@coreui/react'

export default function Spinner() {
  return (
    <div style={{ top: "0%",  left : "0%", background: "rgba(0, 0, 0, .5)", position: "fixed", width : "100%", height: "100%", zIndex: 90}}>     
        <CSpinner style={{position: "fixed",top: "50%",  left : "50%", zIndex: 100}} color='danger'/>
    </div>
  )
}
