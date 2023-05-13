const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("diets", {
      id: {
        //Sequelize tambien lo genera de manera automatica
        type: DataTypes.INTEGER,
        autoIncrement: true, //incrementa los numeros de 1 por 1
        primaryKey: true, //Clave primaria
        allowNull: false, //NO se permiten valores nulos para ese campo. Campo Obligatorio!
      },
      name: { // "diets": ["gluten free", "dairy free"]
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, //Especifica que los valores de esta columna deben ser únicos en la tabla
        //Al intentar insertar una nueva fila en la tabla con un valor duplicado en la columna "name", se producirá un error. Esta restricción se utiliza a menudo para garantizar que los datos en una tabla sean únicos y que no haya duplicados.
      },
    },
    { timestamps: false }
  );
};
