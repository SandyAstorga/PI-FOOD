const { getAllDiets } = require("../controllers/diets_controller.js"); //Importo mi controlador 

//Funcion para mostrar los tipos de dietas
const getTypeDiets = async (req, res) => {
    try {
        const typeDiet = await getAllDiets(); //Esperamos por la funcion getAllDiets
        return res.status(200).send(typeDiet);//Si todo esta ok muestra los tipos de Dietas
    } catch (error) {
        return res.status(404).send('Hubo un error al obtener los tipos de dietas')
        //Si existe algun error mostrar el mensaje de error
    } 
}

module.exports = {
    getTypeDiets
}
