import React from 'react';
import {Link} from 'react-router-dom';

export default function LandingPage(){
    const landingPage= {
        display: "block",
		border: "1px solid salmon",
		height: "780px",
		padding: "10px",
		width: "100%",
        margin: "0 auto"
    }

    const landingPage__header = {
        padding: "150px",
        color: "fuchsia",
        fontFamily: '-apple-system',
        fontSize: "4rem"
        
      }
    
      const landingPage__text = {
            textShadow:"-1px -1px 0 #63C5DA, 1px -1px 0 #63C5DA, -1px 1px 0 #63C5DA, 1px 1px 0 #63C5DA",
            color: "#39FF14",
            fontFamily: '-apple-system',
            fontSize: "3rem"
      }
    
      const landingPage__button = {
        padding:"50px",
        height: "50px",
    
     }

    return(
        <div style={landingPage}>

        <div style={landingPage__header}>
            <h1> Welcome to my proyect Countries</h1>
        </div>


        <div style={landingPage__text} >
    <p> Tengo el gusto de presentarles mi proyecto countries 💖 espero lo disfruten</p>
      </div>  


         <div style={landingPage__button}>   
            <Link to = '/Home'>
            <button className="button is-danger is-rounded"> 🤩 Comencemos 🤩 </button>
            </Link>
            </div>

        </div>
       
    )
} 
