import React from 'react'
import style from './styles/Card.module.css'

export default function Card ({id, name, flagImg}) {
  return (
    <div className={style.cards}>
        <h3 style={{color:"fuchsia"}}>{name}</h3>
        <h5 style={{color:"Chartreuse"}}>{id}</h5>
        <img src={flagImg} alt="img not found" />

    </div>
  )
}
