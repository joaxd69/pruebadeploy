require("dotenv").config();
const { Router } = require('express');
const axios = require("axios");
const { Op } = require("sequelize");
const {Country, Activity } = require('../db');
const {
    getApiInfo,
    deleteActivity,
    createActivity,
} = require('./Controllers')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const countrys= require('./Controllers')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/countries', async(req, res) => {
    let name=  req.query.name // trae el name por query
    console.log(req.query)
    if(name) {
        //if there is a name query
        // const countriesName = await countriesTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
        let countriesName = await Country.findAll({where:{name:{[Op.iLike]:name}}});
        countriesName.length?
        res.status(200).send(countriesName) :
        res.status(404).send('no esta el pais, sorry 👀');   
    } else {
        let countriesTotal = await Country.findAll({
            include:[Activity]
        });
        res.status(200).send(countriesTotal)
    }
});


// router.get('/', async (req, res) => {
//   const { name } = req.query;

//   try {
//     const countries = await Country.findAll({
//       where: {
//         name: {
//           [Op.iLike]: `%${name}%`,
//         },
//       },
//     });

//     if (!countries.length) {
//       return res.status(404).json({ message: 'País no encontrado' });
//     }

//     res.json(countries);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json
//   }
// });

router.get('/countries/:id', async(req, res) =>{
    const id = await Country.findByPk(req.params.id.toUpperCase(),{
        include: Activity,
    }       
    )
    
    if(id) { 
         return res.status(200).send(id)
            
        }
            res.status(404).send('country not found 😥');
    });
    



router.post('/activity', async(req, res) =>{
    const {name, difficulty, duration, season, Country, description}= req.body;
    console.log(Country)
    if(name && difficulty && duration && season && Country.length > 0 ){

    const created = await createActivity(name, difficulty, duration, season, Country, description)
    console.log(created)

        return res.status(201).json({
            msg: `Activities '${name}' correctly created!👏 `
        })
    } else{
        return res.status(400).send({
            msg: "there are some spaces to fill out ✍"
        })
    }

   });


   router.get('/activities', async (req, res) => {
    const result = await Activity.findAll({
        include: [Country]
    });  
    // console.log(result)

    res.send(result);
   })
   

   router.delete('/activities', (req, res)=>{
    const {name} = req.query;
    try {
        deleteActivity
        deleteActivity(name);
        res.status(200).send('Activity deleted')
    } catch {
    res.status(400).send('error trying to delete the activity');
}
   })


//    router.get('/countries/population/:population', async(req, res) =>{
//    const country= await Country.findOne({where:{population:req.params.population}}) 
//    console.log(req.params.population)
//    if (country){
//          res.send(country);
//    }else {
//      res.status(404).send('no se encontro un pais con esa poblacion')
//    }
// })

 
router.get('/countries/population/:population', async(req, res)=>{
    const countries= await getApiInfo()
    const country= countries.filter(el => el.population == req.params.population)
    console.log(country)
    res.send(country)
} )


module.exports = router;
