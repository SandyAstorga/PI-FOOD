// //Aqui van nuestros controllers o funciones principales 
// const axios = require('axios'); 
// const { Recipe, Diets } = require('../db'); 
// const { API_KEY } = process.env;

// //llamada con Fetch , herramienta nativa del navegador 
// //Llamada con axios es una libreria, una dependencia 

// //Aqui estoy llamando a la API 
// const getSpoonApi = async ()  => { 
//     const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=${API_KEY}`)
//     const apiInfo = await apiUrl.data.results.map(el => {
//     let data = el.analyzedInstructions 
//         return {
//             id: el.id, 
//             name: el.title,
//             image: el.image, 
//             summary: el.summary.replace( /(<([^>]+)>)/ig, ' '),
//             healthScore: el.healthScore, 
//             diets: el.diets.map(dts => dts), 
//             steps: data[0]?.steps.map((stp) => {
//                 return (` ${stp.number}. ${stp.step} `);
//             })
//         }
//     })
//     return apiInfo; 
// }

// //Llamada a la base de datos 
// const getDBFood = async () => {
//     const dataDB = (await Recipe.findAll({ 
//         include:{
//             model:Diets, 
//             attributes: ['name'],
//             through: {
//                 attributes: [],
//             },
//         }
//     })).map(food => { ///importante
//         const json = food.toJSON();
//         return {
//             ...json,
//             diets: json.diets.map(diet => diet.name)
//         }
//     });
//     return dataDB;
// }

// //Concatenamos los datos de la API y la Base de Datos para poder visualizarlos todos  
// const getAllRecipe = async () => {
//     const apiInfo =  await getSpoonApi();
//     const dbInfo = await getDBFood(); 
    
//     const allInfo = [...apiInfo, ...dbInfo];    
//     return allInfo; 
// }


// module.exports = {
//     getSpoonApi,
//     getDBFood,
//     getAllRecipe
// }


const axios = require('axios');
const db = require('../../firebaseAdmin'); // Importa Firestore
const { API_KEY } = process.env;

// Llamada a la API externa
const getSpoonApi = async () => {
    try { 
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=0a26d10f38814459bba99c3f6621ebee`);
    const apiInfo = apiUrl.data.results.map(el => {
        let data = el.analyzedInstructions || [];
        let steps = [];
        if (data.length > 0 && data[0]?.steps) {
            steps = data[0].steps.map((stp) => ` ${stp.number}. ${stp.step} `);
        }

        return {
            id: el.id,
            name: el.title,
            image: el.image,
            summary: el.summary.replace(/(<([^>]+)>)/ig, ' '),
            healthScore: el.healthScore,
            diets: el.diets.map(dts => dts),
            steps: steps, // Asigna los pasos
        };
    });
    return apiInfo;
} catch (error) {
    console.error('Error fetching data from Spoonacular:', error);
    return [];
}
};


// Llamada a la base de datos Firestore
const getDBFood = async () => {
    try {
        const snapshot = await db.collection('recipes').get(); // 'recipes' es la colección en Firestore
        if (snapshot.empty) {
            return []; // No hay datos en la colección
        }
        const dataDB = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id, // O usa un campo específico si no deseas usar el ID del documento
                ...data,
                diets: data.diets || [] // Asegúrate de manejar la estructura de datos correctamente
            };
        });
        return dataDB;
    } catch (error) {
        console.error('Error fetching data from Firestore:', error);
        return [];
    }
};

// Concatenar datos de la API y Firestore
const getAllRecipe = async () => {
    try {
        const apiInfo = await getSpoonApi();
        const dbInfo = await getDBFood();
        const allInfo = [...apiInfo, ...dbInfo];
        return allInfo;
    } catch (error) {
        console.error('Error fetching all recipes:', error);
        return [];
    }
};

module.exports = {
    getSpoonApi,
    getDBFood,
    getAllRecipe,
};
