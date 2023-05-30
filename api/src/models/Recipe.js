const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

  sequelize.define("recipe", {
    id: { 
      type: DataTypes.UUID, 
      primaryKey: true, 
      defaultValue: DataTypes.UUIDV4, 
      allowNull: false,
    },
    name: { 
      type: DataTypes.STRING, 
      allowNull: false,
    },
    image: { 
      type: DataTypes.STRING, 
      allowNull: false
    },
    summary: { 
      type: DataTypes.TEXT,
      allowNull: false
    },
    healthScore: {
      type: DataTypes.INTEGER, 
      validate: {min:0, max:100}, 
      allowNull: false
    },
    steps: { 
      // type: DataTypes.ARRAY(DataTypes.JSONB),
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false
    },
      createdInDb: { //Manera mas rapida de encontrar la receta creada en db
      type: DataTypes.BOOLEAN,//Indicara si es true cuando se cree en la base de datos 
      allowNull: false,
      defaultValue: true 
      //El valor predeterminado es true, lo que significa que el objeto se ha creado en la base de datos.
    } 
  }, { timestamps: false });
};
