import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/ui.css'

export default function CardLink({ to, children, className = '', ...rest }){
  const navigate = useNavigate()
  return (
    <button
      type="button"
      className={`ui-card-link ${className}`}
      onClick={()=> navigate(to)}
      {...rest}
    >
      {children}
    </button>
  )
}
