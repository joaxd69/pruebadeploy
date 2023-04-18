const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Activity', {

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    }, 

    difficulty:{
        type: DataTypes.INTEGER,
      allowNull: false,
    }, 

    duration: {
        type: DataTypes.INTEGER,
      allowNull: false,
    },

    season: {
      type: DataTypes.ENUM('Summer', 'Autumn', 'Winter', 'Spring'),
      allowNull: true,
    },

    description:{
      type: DataTypes.TEXT,
      allowNull: true
    }

});
};