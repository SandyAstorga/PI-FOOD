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


const axios = require("axios");
const { v4: uuidv4 } = require('uuid');
const admin = require('firebase-admin');
const serviceAccount = require('../../serviceAccountKey.json');

// Inicializa Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const getAllDiets = async (req, res) => {
    try {
        // Consulta la API externa
        const DietsApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=0a26d10f38814459bba99c3f6621ebee`);
        // console.log('API Response:', DietsApi.data);

        // Extrae las dietas y las aplanas, y elimina duplicados
        const types = DietsApi.data.results.map(el => el.diets);
        const typesDiets = [...new Set(types.flat())]; // Elimina duplicados
        // console.log('Fetched diets:', typesDiets);

        // Guarda las dietas en Firestore
        const batch = db.batch();
        typesDiets.forEach(diet => {
            const uniqueId = uuidv4();
            const dietRef = db.collection('diets').doc(uniqueId);
            batch.set(dietRef, { name: diet }, { merge: true });
        });
        await batch.commit();
        console.log('Batch commit successful');

        // Obtiene todas las dietas de Firestore
        const snapshot = await db.collection('diets').get();
        const allDiets = snapshot.docs.map(doc => doc.data());
        console.log(allDiets)

        res.status(200).json(allDiets);
    } catch (error) {
        console.error('Error fetching diets:', error);

        // Manejo de errores cuando `res` está definido
        if (res && typeof res.status === 'function') {
            res.status(500).send('Error fetching diets');
        } else {
            // Si `res` no está definido, solo loguea el error
            console.error('Response object is undefined or missing status method');
        }
    }
};


module.exports = {
    getAllDiets,
};
