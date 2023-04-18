import React from 'react';
import {useState,  useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getCountries, filterByContinents, getActivity, orderByName, orderByPopulation, byActivity } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Pagination from './Pagination';
import {SearchBar} from './SearchBar';
import './styles/home.css'

export default function Home () {
  
  
 
  const dispatch = useDispatch ();
  const filtered = useSelector((state)=>state.filtered);
  const allCountries = useSelector((state)=>state.Country);
  const [orden, setOrden]=useState('');
  const [currentPage, setCurrentPage]=useState(1);
  const [countriesPerPage, setCountriesPerPage]=useState(10);
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filtered.slice(indexOfFirstCountry, indexOfLastCountry)
   
  

  useEffect(() => {
    dispatch(getCountries()); 
    dispatch(getActivity());
},[dispatch])  

// useEffect(() => {
// },[allCountries])  


function handleClick(e){  
  // e.preventDefault();
  setCurrentPage(1);
  dispatch(getCountries());
}

function handleFilterContinents(e){
  e.preventDefault();
  if(e.target.value==="All" )
  {
    dispatch(getCountries())
    }else{
    dispatch(filterByContinents(e.target.value))
    setCurrentPage(1);
    }
}

function handleSort(e){
  e.preventDefault();
  dispatch(orderByName(e.target.value))
  setCurrentPage(1);
  setOrden(e.target.value)
}

function handleActivity(e) {
  console.log(e.target.value)
  e.preventDefault();
 dispatch(byActivity(e.target.value))
 setCurrentPage(1);
}

function handleOrderPopulation(e) {
  e.preventDefault();
  dispatch(orderByPopulation(e.target.value))
  setOrden(e.target.value)
  setCurrentPage(1);
}


const Allactivities = useSelector(state =>state.allActivities)
// useEffect(() => {
//   dispatch(getActivity())
// }, [dispatch])
  
  return(
  

   <div className='main'>
     <div className='firstContainer'>
  <h1 className='titulo'  > Countries proyect </h1>
<section>
<SearchBar
    currentPage={setCurrentPage}
    />
    <Link className='Form' to = '/Country' style={{color:"Chartreuse"}}> Create Activities</Link>
    </section>
    </div>
    <button className='reload' onClick={e=>{handleClick(e)}}>
       reload all the countries
       </button>

   
    

    <div> 
    {/* filtros */}
      <select className='filtros' onChange={e=>handleFilterContinents(e)}>
      <option value='All'>All countries</option> 
      <option value="North America"> North America</option>
      <option value="South America"> South America</option>
      <option value="Africa"> Africa</option>
      <option value="Asia"> Asia</option>
      <option value="Europe"> Europa </option>
      <option value="Oceania"> Oceania</option>
      
    </select>
    <select className='filtros' onChange={e =>handleActivity(e)}>  
    <option hidden defaultValue> activities </option>
    <option value='All'>All activities</option> 
   
   {
    Allactivities.map(i =>
   <option value={i}> {i}</option>
    )}
    </select>   
    
      
      
      {/* ordenamientos */}
      <select className='filtros' onChange={e =>handleSort(e)}>
        <option value="A-Z"> from A to Z </option>
        <option value="Z-A"> from z to a </option>
        {/* <option value="All"> All </option> */}
      </select>



      <select className='filtros' onChange={handleOrderPopulation}>
        <option value="Min" key='Min'> order from less populated </option>
        <option value="Max" key='Max'>order from the most populated </option>
      </select> 
      
    

     <Pagination
     countriesPerPage={countriesPerPage}
     filtered={filtered.length}
     setCurrentPage={setCurrentPage}
     currentPage={currentPage}
     />

     <div className='cards'>
     {currentCountries?.map(el =>{
          return (
            
            <div key={el.id}>
              <Link to={"/detail/" + el.id}>
            <Card name={el.name} id={el.id} flagImg={el.flagImg} />
            </Link>
            </div>

    )
   })
   
}
</div>
      </div>
    
      </div>
  )
  }
