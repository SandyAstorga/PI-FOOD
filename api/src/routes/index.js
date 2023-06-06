const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getRecipes, postRecipe, getRecipebyId, deleteRecipe} = require('../functions/functionRecipe.js') //Importo la funciones de Recetas para mis rutas
const { getTypeDiets } = require('../functions/functionDiets.js') //Importo la funciones para mis rutas

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//GET Ruta para el llamado de las recetas de la API y de la DB para buscar por name
router.get('/recipes', getRecipes); //Por name 'recipes?name='''

//GET Ruta para el llamado de los tipos de dieta de la API y de la DB para buscar por name
router.get('/diets', getTypeDiets); 

//GET Ruta para el llamado por ID
router.get('/recipes/:idRecipe', getRecipebyId); 

//POST Ruta para crear una receta nueva en mi base de datos 
router.post('/recipes', postRecipe);

//DELTE Ruta para el eliminar  por ID
router.delete('/recipes/:id', deleteRecipe); 


module.exports = router;
