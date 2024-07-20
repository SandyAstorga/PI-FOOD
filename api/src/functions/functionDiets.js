const { getAllDiets } = require("../controllers/diets_controller.js"); 

//Funcion para mostrar los tipos de dietas
const getTypeDiets = async (req, res) => {
    try {
        // const typeDiet = await getAllDiets(); 
        // return res.status(200).send(typeDiet);
        await getAllDiets(req, res); 
    } catch (error) {
        return res.status(404).send('Hubo un error al obtener los tipos de dietas')
    } 
}

module.exports = {
    getTypeDiets
}
