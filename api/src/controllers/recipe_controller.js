//Aqui van nuestros controllers o funciones principales 
const axios = require('axios'); 
const { Recipe, Diets } = require('../db'); 
const { API_KEY } = process.env;

//llamada con Fetch , herramienta nativa del navegador 
//Llamada con axios es una libreria, una dependencia 

//Aqui estoy llamando a la API 
const getSpoonApi = async ()  => { 
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=15&addRecipeInformation=true&apiKey=${API_KEY}`)
    const apiInfo = await apiUrl.data.results.map(el => {
    let data = el.analyzedInstructions 
        return {
            id: el.id, 
            name: el.title,
            image: el.image, 
            summary: el.summary.replace( /(<([^>]+)>)/ig, ''),
            healthScore: el.healthScore, 
            diets: el.diets.map(dts => dts), 
            steps: data[0]?.steps.map((stp) => {
                return (`${stp.number}. ${stp.step}`);
            }).join('\n')
        }
    }) 
    return apiInfo; 
}

//Llamada a la base de datos 
const getDBFood = async () => {
    const dataDB = (await Recipe.findAll({ 
        include:{
            model:Diets, 
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })).map(food => { ///importante
        const json = food.toJSON();
        return {
            ...json,
            diets: json.diets.map(diet => diet.name)
        }
    });
    return dataDB;
}

//Concatenamos los datos de la API y la Base de Datos para poder visualizarlos todos  
const getAllRecipe = async () => {
    const apiInfo =  await getSpoonApi();
    const dbInfo = await getDBFood(); 
    
    const allInfo = [...apiInfo, ...dbInfo];    
    return allInfo; 
}


module.exports = {
    getSpoonApi,
    getDBFood,
    getAllRecipe
}