const { getAllRecipe } = require("../controllers/recipe_controller.js"); 
const { Recipe, Diets } = require("../db.js"); 

//En esta funcion traeremos toda la info tanto de la Api como de la DB para asi buscar la por name en mi ruta /recipes/name?="..."
const getRecipes = async (req, res) => {  
    try{
    const { name } = req.query
    const recipeAll = await getAllRecipe(); 
    if(name){ 
        let recipeName = recipeAll.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        recipeName.length ?  
        res.status(200).send(recipeName) :
        res.status(404).send("Receta no encontrada")
    } else { 
        res.status(200).send(recipeAll)
    }
    }catch {
        res.status(500).send('Ha ocurrido un error');
    }
}

//Funcion para Crear una Receta 
const postRecipe = async (req, res) => {
    try{
    const { name, image, summary, healthScore, diets, steps, createdInDb} = req.body
    const recipeCreated = await Recipe.create({ 
        name, 
        image, 
        summary, 
        healthScore, 
        steps, 
        createdInDb
    }) 
    const dietsDB = await Diets.findAll({ 
        where: { name: diets }
    })
        recipeCreated.addDiets(dietsDB) 
        res.status(200).send('Receta creada con exito')
    } catch {
        res.status(500).send('Hubo un error al intentar crear receta')
    }
}

//Funcion para traer receta por ID
const getRecipebyId = async(req, res) => {
    try{
    const { idRecipe } = req.params; 
    const recipesAll = await getAllRecipe();

    if(idRecipe){ 
        let recipeID = recipesAll.filter(r => r.id == idRecipe)
        if(recipeID.length){ 
            res.status(200).json(recipeID)
        } else {
            res.status(500).send('ID no encontrado') 
        }
    }
    } catch {
        res.status(500).send('Hubo un error')
    }
}

module.exports = {
    getRecipes,
    postRecipe,
    getRecipebyId
};