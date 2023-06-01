// un reducer es una función pura que recibe una acción y el estado actual de la aplicación, 
// y devuelve un nuevo estado actualizado de la aplicación.

import { GET_RECIPES, GET_RECIPE_NAME, GET_DETAIL, FILTER_BY_DIET, GET_DIET, FILTER_CREATE, ORDER_BY_NAME, ORDER_BY_SCORE, POST_RECIPE, DELETE_CARD } from "./actions";

const initialState = { //estado inicial
    recipes: [],
    allRecipes: [],
    detail: [],
    diets: [],
    createdByUser: []
}

const rootReducer = (state = initialState, action) => {
    //función pura que toma el estado actual de la aplicación y una acción, y devuelve un nuevo estado.
    switch (action.type) {
        //sentencia switch para determinar qué tipo de acción se ha producido y cómo se debe actualizar el estado en consecuencia.
        case GET_RECIPES: //primer caso todas las recetas
            return {
                ...state,
                recipes: action.payload, //retorna todo lo que me mande la accion de recipes
                allRecipes: action.payload
            }

        case GET_DIET:
            return {
                ...state,
                diets: action.payload,
            };

        case GET_RECIPE_NAME:
            return {
                ...state,
                recipes: action.payload
            }

        case POST_RECIPE:
            return {
                ...state,
            }

        case DELETE_CARD:
            return {
                ...state,
                createdByUser: state.createdByUser.filter((card) => card.id !== action.payload),
                // allRecipes: state.allRecipes.filter((card) => card.id !== action.payload),
            };

        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload
            }

        //Revisar para que filtre todas sin importar en la pagina que este 
        case FILTER_BY_DIET:
            const { allRecipes } = state; //destructuring
            const dietToFilter = action.payload;
            let dietsFiltered = allRecipes;
            if (dietToFilter !== "all") {
                dietsFiltered = dietsFiltered.filter((el) => el.diets.includes(dietToFilter));
                // if (dietsFiltered.length === 0) {
                //     dietsFiltered = allRecipes;
                // }
            }
            return {
                ...state,
                recipes: dietsFiltered
            };

        //Filtra por recetas creadas y de la api
        case FILTER_CREATE:
            const created = state.allRecipes;
            const filterBy = action.payload;
            let filteredRecipes;
            if (filterBy === "created") {
                filteredRecipes = created.filter((el) => el.createdInDb);
                if (filteredRecipes.length === 0) {
                    filteredRecipes = created;
                }
            } else {
                filteredRecipes = created.filter((el) => !el.createdInDb);
            }
            return {
                ...state,
                recipes: filteredRecipes
            };

        //Filtra Alfabeticamente
        case ORDER_BY_NAME:
            const isAscending = action.payload === 'up';
            const sortedRecipes = [...state.recipes].sort((a, b) => {
                if (a.name > b.name) return isAscending ? 1 : -1;
                if (a.name < b.name) return isAscending ? -1 : 1;
                return 0;
            });
            return {
                ...state,
                recipes:
                    action.payload === "all" ?
                        state.allRecipes : sortedRecipes
            };

        //Filtra por Health Score
        case ORDER_BY_SCORE:
            let scoreFilter = [...state.recipes];
            scoreFilter = scoreFilter.sort((a, b) => {
                if (a.healthScore < b.healthScore) {
                    return action.payload === "higher" ? 1 : -1;
                }
                if (a.healthScore > b.healthScore) {
                    return action.payload === "higher" ? -1 : 1;
                }
                return 0;
            });
            return {
                ...state,
                recipes:
                    action.payload === "score"
                        ? state.allRecipes : scoreFilter
            };


        default:
            return { ...state };
    }

};

export default rootReducer;