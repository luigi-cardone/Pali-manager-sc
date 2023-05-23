import React from 'react'
import '../styles/status-bar.scss'

export const Statusbar = (props) => {
  return (
    <div className={`px-4 py-2 status-bar ${props.color} shadow-sm`}>
        <h6>{props.title}</h6>
        <h3>{props.status}</h3>
    </div>
  )
}
