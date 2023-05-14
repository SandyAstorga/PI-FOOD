//Aqui van nuestros controllers o funciones principales 
//La llamada a la API , la llamada a mi DB y la concatenacion de ambos 
//asi como la logica para mostrar la informacion que requiero
const axios = require('axios'); //llama a axios
const { Recipe, Diets } = require('../db'); //Las relaciones de mis modelos
const { API_KEY } = process.env; //Me traigo mi API_KEY del archivo .env 

//llamada con Fetch , herramienta nativa del navegador 
//Llamada con axios es una libreria, una dependencia 

//Aqui estoy llamando a la API 
const getSpoonApi = async ()  => { //función flecha asincrónica
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=2&addRecipeInformation=true&apiKey=${API_KEY}`) 
    //Aqui va mi llamado a la api (100 recetas) incluye mi api_key
    const apiInfo = await apiUrl.data.results.map(el => {
    //En esta contante hago un mapeo solo de la data que necesito de la API
    let data = el.analyzedInstructions // dentro de data hay un array de objetos dentro de analyzedInstructions
        return {
            id: el.id, //"id": 782585,
            name: el.title, //"title": "Cannellini.."
            image: el.image, //"image": "https://spoonacular.com.."
            summary: el.summary.replace( /(<([^>]+)>)/ig, ''), //"summary": "Cannellini Bean..<p>..."
            //Se utiliza una expresion regular para eliminar etiquetas HTML de la info que llegara 
            //El método replace se utiliza para reemplazar todas estas etiquetas por una cadena vacía.
            healthScore: el.healthScore, //"healthScore": 100,
            diets: el.diets.map(dts => dts), //"diets": ["gluten free", "dairy free"..]
            steps: data[0]?.steps.map((stp) => { //Mapea ese array de pasos 
                return (`${stp.number} ${stp.step}`); //Y retorna unicamente el numero del paso y la descripcion del mismo 
            }), //"analyzedInstructions": [{"name": "","steps": [{"number": 1,.."
            //data accede al primer elemento del array en la propiedad steps
            //con ayuda del operador de encadenamiento "?" en caso de que dicha propiedad este vacia devuelve undefined en lugar de error 
        }
    }) //vamos a mapear la info de la url para acceder de manera mas ordenada a la data 
    //Para ingresar a la info de un json siempre es .data
    return apiInfo; //retornamos 
}

//Llamada a la base de datos 
const getDBFood = async () => {
    const dataDB = await Recipe.findAll({ //Trae la info de la base de datos del modelo Recipe
        //findAll() es un metodo de Sequelize 
        include:{
            model:Diets, //Incluyendo el modelo Diets
            attributes: ['name'], // atributo name
            through: {
                attributes: [],
        //Traer el modelo mendiante el name
            },
        }
    })
    return dataDB; //retornamos 
}

//Concatenamos los datos de la API y la Base de Datos para poder visualizarlos todos  
const getAllRecipe = async () => {
    const apiInfo =  await getSpoonApi(); //Guardamos la primera funcion donde esta el llamado a la API
    const dbInfo = await getDBFood(); //Guardamos la segunda funcion del llamado a la base de datos
    
    const allInfo = [...apiInfo, ...dbInfo]; //Los concatenamos con un spread operator o puede ser con .concat()
    
    return allInfo; //Los retornamos 
}

//Exportamos para utilizarlas mas adelante 
module.exports = {
    getSpoonApi,
    getDBFood,
    getAllRecipe
}