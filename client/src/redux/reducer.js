// un reducer es una función pura que recibe una acción y el estado actual de la aplicación, 
// y devuelve un nuevo estado actualizado de la aplicación.

import { GET_RECIPES, GET_RECIPE_NAME, GET_DETAIL } from "./actions";

const initialState = { //estado inicial
    recipes: [],
    detail: [],
}

const rootReducer = (state = initialState, action) => {
    //función pura que toma el estado actual de la aplicación y una acción, y devuelve un nuevo estado.
    switch (action.type) {
        //sentencia switch para determinar qué tipo de acción se ha producido y cómo se debe actualizar el estado en consecuencia.
        case GET_RECIPES: //primer caso todas las recetas
            return {
                ...state,
                recipes: action.payload, //retorna todo lo que me mande la accion de recipes
            }

        case GET_RECIPE_NAME:
            return {
                ...state,
                recipes: action.payload
            }

        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload
            }

        default:
            return { ...state };
    }

};

export default rootReducer;