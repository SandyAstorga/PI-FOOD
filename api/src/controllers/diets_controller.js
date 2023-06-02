const axios = require("axios");
const { Diets } = require("../db"); 
const { API_KEY } = process.env;

const getAllDiets = async (req, res) => {
    const DietsApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=${API_KEY}`);
    const types = await DietsApi.data.results.map(el => el.diets) 
    const typesDiets = types.flatMap(el => el) //Mapea nuevamente el resultado que es un array de arrays en un solo array con el metodo flatMap
        for (let i = 0; i < typesDiets.length; i++) {
            // console.log(typesDiets);
        await Diets.findOrCreate({ 
                where: { name: typesDiets[i] } 
            })
        }
    const allDiets = await Diets.findAll();
    return allDiets
};

module.exports = {
    getAllDiets,
};
