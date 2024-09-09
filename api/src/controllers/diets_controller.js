// const axios = require("axios");
// const { Diets } = require("../db"); 
// const { API_KEY } = process.env;

// const getAllDiets = async (req, res) => {
//     const DietsApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=${API_KEY}`);
//     const types = await DietsApi.data.results.map(el => el.diets) 
//     const typesDiets = types.flatMap(el => el) //Mapea nuevamente el resultado que es un array de arrays en un solo array con el metodo flatMap
//         for (let i = 0; i < typesDiets.length; i++) {
//             // console.log(typesDiets);
//         await Diets.findOrCreate({ 
//                 where: { name: typesDiets[i] } 
//             })
//         }
//     const allDiets = await Diets.findAll();
//     return allDiets
// };

// module.exports = {
//     getAllDiets,
// };

const getAllDiets = async (req, res) => {
    try {
        const DietsApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=${API_KEY}`);
        const types = DietsApi.data.results.map(el => el.diets);
        const typesDiets = types.flatMap(el => el);

        // Itera sobre las dietas
        for (const diet of typesDiets) {
            // Verifica si la dieta ya existe
            const docRef = admin.firestore().collection('diets').doc(diet);
            const doc = await docRef.get();

            if (!doc.exists) {
                // Si no existe, crea un nuevo documento
                await docRef.set({ name: diet });
            }
        }

        // Obtén todas las dietas para enviar en la respuesta
        const dietsSnapshot = await admin.firestore().collection('diets').get();
        const allDiets = dietsSnapshot.docs.map(doc => doc.data());
        return res.status(200).json(allDiets);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error al obtener las dietas');
    }
};
