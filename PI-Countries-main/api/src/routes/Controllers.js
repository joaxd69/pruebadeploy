const axios = require('axios')
const { where } = require("sequelize");
const {Country, Activity } = require('../db');
const fs = require('fs');
const path = require('path');




const getApiInfo = async () => {
  const findall = await Country.findAll()
  console.log('country.length', findall.length)
  if(!findall.length ){
    console.log('entre')
   const  apiUrl = await axios.get('https://restcountries.com/v3.1/all');
    const apiInfo = apiUrl.data.map(el => {
      return {
        id: el.cca3,
        name: el.name.common,
        flagImg: el.flags.svg,
        continent: el.continents[0],
        capital: el.capital != null ? el.capital[0] : "No data",
        subregion: el.subregion,
        area: el.area,
        population: el.population,
        dataApi: true
      };
    });
   
   await Country.bulkCreate(apiInfo)
  } 
  return findall
  }





const createActivity = async (name, difficulty, duration,  season, country, description ) => {
  try {
    const activ = await Activity.create({
      name,
      difficulty,
      duration,
      season,
      description,
      
    })

 const selectCountries = await Country.findAll({
   where: {
    id:country
   }
 });
 console.log(selectCountries)
 console.log('Activity: ' + name +'added to country' + country)
return activ.addCountries(selectCountries)
  } catch (error) {
    console.log('error en create activity 🎃', error
   )
  }
};

const deleteActivity = async(name) => {
await Activity.destroy({
  where: {name}
})
}




module.exports = {
  deleteActivity,
  createActivity,
  getApiInfo
};