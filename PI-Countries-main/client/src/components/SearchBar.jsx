import React from 'react'
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {getNameCountries} from '../actions'
import './styles/searchBar.css'

export function SearchBar ({currentPage}) {
    const dispatch = useDispatch()
    const [name, setName] = useState('')

 function handleInputChange(e) {
   e.preventDefault();
   setName(e.target.value)
   console.log(name)
 }

function handleSubmit(e){
  currentPage(1);
    e.preventDefault()

    dispatch(getNameCountries(name))
}

  return (

    <div className='search'>
        <input
        type = 'text'
        placeholder="Search..."
        onChange={(e) => handleInputChange(e)}
        />
   <button type="submit" onClick={(e) => handleSubmit(e)}> Search </button>
    </div>
  
  )
}
