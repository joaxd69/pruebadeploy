import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {postActivity, getActivity, getCountries} from '../../actions';
import style from '../formActivity/form.module.css'


function validate(input) {
  let errors = {};
  let season = ['Winter', 'Spring', 'Autumn', 'Summer']
  if(!input.name)errors.name = "Activity must be completed"
  if(!input.difficulty || input.difficulty>5 || input.difficulty<1)errors.difficulty= "valor no aceptado"
  if(!season.includes(input.season))errors.season = "valor no aceptado"
  if(!input.duration || input.duration<1 || input.duration > 24 ) errors.duration = "valor no aceptado"
  
  
  return errors;
}

function NewActivity() {
    const dispatch = useDispatch()
    const history = useHistory()
    const Country = useSelector((state) => state.Country).sort((a, b) => {
      if(a.name < b.name){
          return -1;
      }
      if(a.name > b.name){
          return 1;
      }
      return 0;
  })

  const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        Country: [],
        name: '',
        difficulty:'',
        duration: '',
        season:'',
        description:''
    })
      
    useEffect(() => {
      dispatch(getCountries())
  }, [dispatch])

    
    useEffect(() => {
      dispatch(getActivity());  
    }, [dispatch]);


    function handleChange(e) {
      setInput({
          ...input,
          [e.target.name]: e.target.value
      })
      console.log(input)
      setErrors(validate({
        ...input,
        [e.target.name]: e.target.value
      }))
      console.log(input)
    }

    console.log(errors)

    function handleSelect(id) {
      setInput({
          ...input,
          Country: [...input.Country, id.target.value]
      })
      setErrors(validate({
        ...input,
        Country: id.target.value
      }))
  }

  function handleSeason(e) {
    setInput({
        ...input,
        season: e.target.value
    })
    setErrors(validate({
      ...input,
      season: e.target.value
    }))
}

function handleSelctDifficulty(e) {
  setInput({
      ...input,
      difficulty: e.target.value
  })
  setErrors(validate({
    ...input,
    difficulty: e.target.value
  }))
}

function handleSelectDuration(e) {
  setInput({
      ...input,
      duration: e.target.value
  })
  setErrors(validate({
    ...input,
    duration: e.target.value
  }))
}

function handleDelete(e) {
  setInput({
      ...input,
      Country: input.Country.filter(c => c !== e.target.value)

  })
}


function handleSubmit(e) {
  e.preventDefault();
  if(!input.name || !input.description ||!input.difficulty ||!input.duration ||!input.season ||!input.Country.length) 
  return alert('Revisa los campos obligatorios');
  if(Object.entries(errors).length) //me convierte el objeto en un array y verifica si esta vacio o no
  {return alert('Revisa los errores')}
  else{
    dispatch(postActivity(input))
    alert("Activity created")
  history.push('/home')  
  }
}


    const season = ['Winter', 'Spring', 'Autumn', 'Summer'];
    const difficulty = [1, 2, 3, 4, 5];
    const duration = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];  

  return (
    <div className={style.form}>
       <Link to ='/home'><button className={style.back}> Volver  🚁 </button></Link>
       <h1 className={style.tittle}> create new activities 🌏 </h1>
       <form form onSubmit={handleSubmit}>
      
      
  <div className={style.name}>  
  <label> * Activity: </label>
     <input className={style.activity}name="name" type="text" value= {input.name} onChange={handleChange}  placeholder="Activity name..."
     />
   {errors.name &&(
    <span>{errors.name}</span>
   )}  
   </div>
<div className={style.options}>
         <div>
            <label>* Season:</label>
            <select onChange={handleSeason}>
            <option value="" hidden>Select season</option>
            {season.map(e => (
           <option value={e} name="season" key={e} >{e}</option>
          ))}
          </select>
          {errors.season&& <span>{errors.season}</span>}
        </div>

        <div>
            <label>* difficulty: </label>
            <select onChange={handleSelctDifficulty} >
            <option value="" hidden>Choose an option</option>
            {difficulty.map(e => (
             <option value={e} name="difficulty">{e}</option>
            ))}
            </select>
            {errors.difficulty&& <span>{errors.difficulty}</span>}
        </div>

        <div>
            <label>* duration in hours:</label>
            <select onChange={handleSelectDuration} >
            <option value="" hidden>Choose an option</option>
            {duration.map(e => (
           <option value={e} name="duration">{e}</option>
           ))}
           </select>
           {errors.duration && <span>{errors.duration}</span>}
        </div>

        <div>
            <label>* Country:</label>
            <select onChange={handleSelect} >
            <option value="" hidden>Select country</option>
            {Country.map(e => (
             <option value={e.id} name="Country" >{e.name}</option>
            ))}
        </select>

   </div>
            {errors.Country&& <span>{errors.Country}</span>}
            <div className={style.descriptionfield}>
  <label className="description.label">* description</label>
  <div className="control">
    <textarea className={style.textarea} name='description' onChange={handleChange} placeholder="add more details about the activity"></textarea>
  </div>
</div>

         <button className={style.back} type='submit'> Create activity </button>
        </div>
       
       </form>
       {input.Country.map( el => 
           <div>
            <p className={style.id}> {el} </p>
            <button className={style.buttonx}value={el} onClick={handleDelete}> x </button> 
           </div>
       )}

    </div>
  )
}

export default NewActivity 
