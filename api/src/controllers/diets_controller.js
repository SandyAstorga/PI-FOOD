//Aqui va mi controller para los tipos de dietas
//LLama a la API, mapea los tipos de dieta y los guarada en mi DB
const axios = require("axios");
const { Diets } = require("../db"); //Importo mi base de datos de tipos de dietas
const { API_KEY } = process.env;

//Funcion asincrona
const getAllDiets = async (req, res) => {
    const DietsApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=15&addRecipeInformation=true&apiKey=${API_KEY}`);
    const types = await DietsApi.data.results.map(el => el.diets) //Mapea los tipos de dietas dentro de la API
    const typesDiets = types.flatMap(el => el) //Mapea nuevamente el resultado que es un array de arrays en un solo array con el metodo flatMap
        for (let i = 0; i < typesDiets.length; i++) { //se iteran los tipos de dietas
            // console.log(typesDiets);
        await Diets.findOrCreate({ //Espera por la base de adatos y Las busca, en cado de que no hay la crea en ese momento
                where: { name: typesDiets[i] } // en el atrubuto name 
            })
        }
    const allDiets = await Diets.findAll(); //Creo una contante donde voy a guardar el llamado a mi DB de tipos de dietas
    return allDiets //Las retorno
};

module.exports = {
    getAllDiets,
};
