import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { getDetail, deleteActivity} from '../actions/index';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import flyingAirplane from '../images/flyingAirplane.svg';
import './styles/Detail.css'


function Detail(){

  const dispatch = useDispatch()
  const details = useSelector(state => state.detail)
  const loading = useSelector(state => state.loading)
  const midir = useLocation().pathname.slice(8)
  const [visible, setVisible] = useState(true)
  console.log(midir)


  useEffect (() => {
    dispatch(getDetail(midir));
},[midir])

const handleDelete =(e)=> {
    setVisible(false)
    dispatch(deleteActivity(e.target.name))
}



const activities = details.Activities?.map(e => {
    return {
        name: e.name,
        difficulty: e.difficulty,
        duration: e.duration,
        season: e.season
    }
})


return (
    <div className='details'>
        <div>
            {loading ? <img src={flyingAirplane} /> : details !== null ?
                <div className='Container' >
                    <div >
                        <h2>{details.name}</h2>
                        <img src={details.flagImg} alt={details.name}  />
                    </div>
                    <div className='text' >
                        <div>
                            <div>
                                <h3>Details</h3>
                                <p>Code: {details.id}</p>
                                <p>Continent: {details.continent}</p>
                                <p>Capital: {details.capital}</p>
                                <p>Population: {details.population}</p>
                                <p>Subregion: {details.subregion}</p>
                            </div>
                            <div >
                                <h3>Activities</h3>
                                {visible && activities?.length > 0 ? activities?.map(e => {
                                    return (
                                        <div key={e.id}>
                                            <p>Name: {e.name}<button className='deletebutton' title='delete activity' name={e.name} onClick={handleDelete}> x </button> </p>
                                            <p>Difficulty: {e.difficulty}</p>
                                            <p>Duration: {e.duration}</p>
                                            <p>Season: {e.season}</p>
                                            <hr></hr>
                                        </div>
                                    )
                                })
                                    : <p>Without activities</p>}
                            </div>
                        </div>
                    </div>
                </div> : <p>Country not found</p>
            }
        </div>
      <Link to= '/home'>
        <button className='return'> Volver </button>
      </Link>

    </div>
)
}

export default Detail