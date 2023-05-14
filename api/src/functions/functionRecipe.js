//Aqui hare las funciones para mis rutas las cuales importare en el archivo index 
const { getAllRecipe } = require("../controllers/recipe_controller.js"); 
//Funcion dentro de controller donde estan concatenados todos mis datos tanto de la API como de la base de datos
const { Recipe, Diets } = require("../db.js"); //Importo mis modelos
// const axios = require("axios"); //Axios para los llamados 

//En esta funcion traeremos toda la info tanto de la Api como de la DB para asi buscar la por name en mi ruta /recipes/name?="..."
const getRecipes = async (req, res) => {  //Funcion asincrona
    try{
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
    }catch {
        res.status(500).send('Ha ocurrido un error');
    }
}

//Funcion para Crear una Receta //REVISAR
const postRecipe = async (req, res) => {
    try{
    const { name, image, summary, healthScore, diets, steps, createdInDb} = req.body
    //La funcion espera recibir parametros mediante el body 
    const recipeCreated = await Recipe.create({ //En esta constante crea en mi base de datos la nueva receta 
        name, 
        image, 
        summary, 
        healthScore, 
        steps, 
        createdInDb
    }) //dietas no esta aqui por que se hace a relacion aparte 
    const dietsDB = await Diets.findAll({ //Las dietas hay que buscarlas en un modelo que ya tengo (Diets)
        where: { name: diets } //Donde name concida con el de las dietas 
    })
        recipeCreated.addDiets(dietsDB) //Con esto a la receta creada se le van a añadir los tipos de dietas de la base de datos Diets 
        res.status(200).send('Receta creada con exito')
    } catch {
        res.status(500).send('Ha ocurrido un error al intentar crear receta')
    }
}

//Funcion para traer receta por ID
const getRecipebyId = async(req, res) => {
    try{
    const { idRecipe } = req.params; //La funcion espera recibir parametros mediante params
    const recipesAll = await getAllRecipe(); //Llamado a todas las recetas 

    if(idRecipe){ //Si tenemos id 
        let recipeID = recipesAll.filter(r => r.id == idRecipe) //Hacemos un filtado para sacar el id que conincida en el parametro
        if(recipeID.length){ //Si mi variable tiene algo 
            res.status(200).json(recipeID) //Muestra la receta con ese ID
        } else {
            res.status(500).send('ID no encontrado') //Si no muetra un mensaje de no encontrado
        }
        }
    } catch {
        res.status(500).send('Hubo un error')  //Si existe algun otro error muetra el mensaje
    }
}

module.exports = {
    getRecipes,
    postRecipe,
    getRecipebyId
};