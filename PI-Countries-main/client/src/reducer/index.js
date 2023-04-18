
const initialState = {
    Country : [],
    countries: [],
    filtered: [],
    allActivities:[],
    activity:[],
    population: [],
    detail: [],
    loading:false

 }
 
 function rootReducer (state =initialState, action) {
     switch(action.type){
         case 'GET_COUNTRIES':
             return {
                 ...state, 
                 Country:action.payload,
                 filtered:action.payload,
                 population: action.payload,
                 countries: action.payload,
                
             }

             case 'GET_ACTIVITY':
                const allactivities = action.payload.map(i => i.name )
                return{
                    ...state,
                    allActivities:allactivities,
                    loading:false
                }

              case 'BY_ACTIVITY':
                let filtrados= action.payload!=='All'? state.filtered.filter(i =>i.Activities[0]?.name===action.payload):state.Country  
                console.log(action.payload)
                console.log(filtrados)
                console.log(state.Country)
                return {
                    ...state,
                    filtered: filtrados
                }

            case 'POST_ACTIVITY' :
                return{
                    ...state,
                    
                }


             case 'FILTER_BY_CONTINENT':
                const allCountries = state.countries
                const continentFiltered = allCountries.filter(el => el.continent === action.payload)
                console.log(continentFiltered)
                return{
                  ...state,
                  filtered: continentFiltered
                }
             
        

            case 'ORDER_BY_NAME':
                const sortedArr = action.payload === 'A-Z'?
               state.filtered.sort(function(a, b){
                  if (a.name > b.name) {
                    return 1;
                  }
                  if (b.name > a.name) {
                    return -1;
                  }
                  return 0;
               }):

               state.filtered.sort(function(a, b){
                if (a.name > b.name) {
                    return -1;
               }
               if (b.name > a.name) {
                return 1;
               }
               return 0;
            })
            return {
                ...state,
                filtered: sortedArr
            }
                

            case 'BY_POPULATION':
            const orderPopulation = action.payload === 'Min' ?
                state.filtered.sort(function (a, b) {
                    if (a.population > b.population) {
                        return 1;
                    }
                    if (b.population > a.population) {
                        return -1;
                    }
                    return 0;
                }) :
                state.filtered.sort(function (a, b) {
                    if (a.population > b.population) {
                        return -1;
                    }
                    if (b.population > a.population) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                population: orderPopulation
            }



            case 'GET_NAME_COUNTRIES':
            return {
                ...state,
                filtered: action.payload
            }
                
            case 'GET_DETAILS':
            return {
              ...state,
              detail: action.payload,
              loading: false
            }
            
            case 'LOADING':
            return {
                ...state,
                loading: true
            }

            case 'ACTIVITY_DELETED':
                return{
                    ...state
                }

            case 'COUNTRY_POPULATION':
               const country = !action.payload.length?state.Country:action.payload
                console.log(action.payload)
                return{
                    ...state,
                    filtered:country
                            
                }

          
            
            default:
                return state; 
            }
            };

     export default rootReducer;





// import { createSlice } from "@reduxjs/toolkit"

// export const counterSlice = createSlice({
//    name:'counter',
//      initialState :{
//         Country : []
//     },

//     reducers: {
//         increment: (state)=>{
//              state.value+=1
//         },
//         deccrement:(state) => {
//             state.value-=1
//         },
//         incrementByAmount:(state, action) =>{
//             state.value+=action.payload
//         }
//    }
// })

