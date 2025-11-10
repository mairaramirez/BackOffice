import React from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../../components/BackButton.jsx'
import '../../styles/ui.css'

export default function Menu(){
  const navigate = useNavigate()
  return (
    <div className="landing-wrap">
      <div className="landing-inner" style={{position:'relative'}}>
        <BackButton className="top-right" to="/" />
        <h1>MYR Construcciones</h1>
        <div className="center" style={{marginTop:16}}>
          <button className="ui-card-link" onClick={()=> navigate('/myr/nuevo-usuario')}>Alta de cliente</button>
        </div>
      </div>
    </div>
  )
}
