const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("recipe", {
    id: { //En la Api es un numero entero  "id": 782601,
      type: DataTypes.UUID, // Especifica el tipo de dato que se almacenará en esta columna como un UUID (identificador único universal).
      primaryKey: true, //Indica que esta columna es la clave primaria de la tabla, es decir, es el identificador único de cada registro en la tabla.
      defaultValue: DataTypes.UUIDV4, //Establece un valor predeterminado para la columna en caso de que no se proporcione ningún valor al insertar un nuevo registro en la tabla.
      allowNull: false, //Campo obligatorio
    },
    name: { //En la Api es un string "title": "Cannellini.."
      type: DataTypes.STRING, 
      allowNull: false,
    },
    image: { // En la api es una url "https://spoonacular.com/recipeImages/782585-312x231.jpg",
      type: DataTypes.STRING, //Es una url 
      allowNull: false
    },
    summary: { // Es un text "summary": "Cannellini Bean and Asparagus...."
      type: DataTypes.STRING, //Resumen 
      allowNull: false
    },
    healthScore: { //"healthScore": 100,
      type: DataTypes.INTEGER, //Son numeros enteros 
      validate: {min:0, max:100}, 
      //Se establece una validación para garantizar que el valor de healthScore esté entre 0 y 100, utilizando las propiedades min y max del objeto validate.
      //Significa que cualquier intento de guardar un registro en la tabla correspondiente que tenga un healthScore menor que 0 o mayor que 100 provocará un error de validación y la operación no se llevará a cabo.
      allowNull: false
    },
    steps: { //Array de objetos //"steps": [{"number": 1,"step": "Rinse the cannellini..", "ingredients": [{ "id": 10716050,"name": "cannellini beans", }, {"id": 14412, "name": "water"}]...
      // type: DataTypes.ARRAY(DataTypes.TEXT),
      //Especifica que el tipo de dato de esta columna será un array de valores de tipo texto. "DataTypes.ARRAY" indica que es un array y "DataTypes.TEXT" indica que el tipo de cada valor en el array será de tipo texto.
      type: DataTypes.ARRAY(DataTypes.JSONB),
      //Si los datos son muy estructurados y siguen un formato fijo, como en una receta culinaria con pasos específicos y listas de ingredientes, puede ser más útil utilizar un modelo que incluya objetos JSONB para poder acceder a cada propiedad de los objetos.
      allowNull: false
    },
      createdInDb: { //Manera mas rapida de encontrar la receta creada en db
      type: DataTypes.BOOLEAN,//Indicara si es true cuando se cree en la base de datos 
      allowNull: false,
      defaultValue: true //Establece el valor predeterminado para este atributo en caso de que no se proporcione ningún valor al crear una instancia de este modelo.
      //El valor predeterminado es true, lo que significa que el objeto se ha creado en la base de datos.
    } 
  }, { timestamps: false });
  //Desactiva la creación de los campos de marca de tiempo createdAt y updatedAt en la tabla de la base de datos.
};
