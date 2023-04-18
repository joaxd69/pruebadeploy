import axios from 'axios';



export function getCountries()  {
  return async function(dispatch){
    var json = await axios.get('http://localhost:3001/countries');
    return dispatch({
        type: 'GET_COUNTRIES',
        payload: json.data 
    }); 
  }
}

export function filterByContinents(payload){
  return{
    type: 'FILTER_BY_CONTINENT',
    payload
     }
  }

export function getActivity(){
  return async function(dispatch) {
    try {
      const res = await axios.get(`http://localhost:3001/activities`);
      // console.log(res.data)
      return dispatch({
        type: 'GET_ACTIVITY',
        payload:res.data
      })
    } catch (error) {
      // console.log(error)
    }
  }
}



export function postActivity(payload) {
  return async function(dispatch) {
    const response = await axios.post('http://localhost:3001/activity', payload);
    console.log(response)
    return response;
  }
}



export function byActivity(payload) {
  return {
    type: 'BY_ACTIVITY',
    payload
  }
}


export function orderByName (payload) {
    return {
      type:'ORDER_BY_NAME',
      payload
    }
}

export function orderByPopulation(payload){
     return {
    type: 'BY_POPULATION',
    payload
     }
}

export function getNameCountries (name){
  console.log(getNameCountries)
  return async function (dispatch) {
     try {
       var json = await axios.get('http://localhost:3001/countries?name=' + name);
       console.log(json.data)
       return dispatch ({
          type: 'GET_NAME_COUNTRIES',
          payload: json.data
       })
       
     } catch (error) {
        console.log(error.message)
     }  }
}

export function getDetail(id){
  return async function(dispatch){
    try{
      dispatch({
        type:'LOADING'
    })
      var json = await axios.get("http://localhost:3001/countries/" + id);
      console.log(json)
      return dispatch({
        type:'GET_DETAILS',
        payload:json.data
      })
    } catch(error){
       console.log(error)
    }
  }
}

export function deleteActivity (name){
  return async function (dispatch){
    try{
   const activityDelete = await 
   axios.delete(`http://localhost:3001/activities?name=${name}`)
   alert('activity deleted succesfully')
   return dispatch({
      type: 'ACTIVITY_DELETED',
      payload:name
   })
    }catch{
    }
  }
} 


