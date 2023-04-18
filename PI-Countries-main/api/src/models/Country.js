const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {

    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    id: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      unique: true,
    },

    flagImg: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    continent: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    capital: { 
      type: DataTypes.STRING,
      allowNull: true,
    },

    subregion: {
      type: DataTypes.STRING,
    },

    area: {
      type: DataTypes.STRING, 
    },

    population: {
      type: DataTypes.STRING,
    },


  dataApi:{
    type: DataTypes.BOOLEAN,
  }

  });
};
