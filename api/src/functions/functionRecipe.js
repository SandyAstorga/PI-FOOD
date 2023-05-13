//Aqui hare las funciones para mis rutas las cuales importare en el archivo index 

const { getAllRecipe } = require("../controllers/recipe_controller.js"); 
//Funcion dentro de controller donde estan concatenados todos mis datos tanto de la API como de la base de datos
const { Recipe, Diets } = require("../db.js"); //Importo mis modelos
const axios = require("axios"); //Axios para los llamados 

//En esta funcion traeremos toda la info tanto de la Api como de la DB para asi buscar la por name en mi ruta /recipes/name?="..."
const getRecipes = async (req, res) => {  //Funcion asincrona
    const { name } = req.query //La función espera recibir un parámetro de consulta "name" en la solicitud.
    const recipeAll = await getAllRecipe(); //llama a mi función asíncrona "getAllRecipe()" que importe de controller
    if(name){ //condicional que comprueba si la variable "name" tiene algún valor.
        let recipeName = recipeAll.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
    //Si "name" tiene algún valor, la variable "recipeName" filtra "recipeAll". 
    //Dicho filtro incluirá solo aquellas recetas cuyo nombre incluya el valor de "name"
    //el metodo "toLowerCase()" se utiliza para asegurar que la comparación sea insensible a mayúsculas y minúsculas.
        recipeName.length ?  
        res.status(200).send(recipeName) :
        res.status(404).send("Receta no encontrada")
        // operador ternario donde si "recipeName" tiene algun elemento
        // devuelve la info del name con un código de estado HTTP 200
        // Si no hay info, se devuelve un mensaje de error con un código de estado HTTP 404.
    } else { //Si "name" no tiene ningún valor
        res.status(200).send(recipeAll)
        //Se devuelve la info completa de recetas con un código de estado HTTP 200
    }
}

module.exports = {
    getRecipes
};