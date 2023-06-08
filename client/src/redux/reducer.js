import { GET_RECIPES, GET_RECIPE_NAME, GET_DETAIL, FILTER_BY_DIET, GET_DIET, FILTER_CREATE, ORDER_BY_NAME, ORDER_BY_SCORE, POST_RECIPE , DELETE_CARD} from "./actions";

const initialState = { //estado inicial
    recipes: [],
    allRecipes: [],
    detail: [],
    diets: [],
}

const rootReducer = (state = initialState, action) => {

    switch (action.type) {
    
        case GET_RECIPES:
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

            
            case GET_DETAIL:
                return {
                ...state,
                detail: action.payload
            }

        //Filtra por dieta 
        case FILTER_BY_DIET:
            const { allRecipes } = state; //destructuring
            const dietToFilter = action.payload;
            let dietsFiltered = allRecipes;
            if (dietToFilter !== "all") {
                dietsFiltered = dietsFiltered.filter((el) => el.diets.includes(dietToFilter));
                if (dietsFiltered.length === 0) {
                    dietsFiltered = allRecipes;
                }
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
                    filteredRecipes = created
                    alert("There are no recipes created");
                }
            } else {
                filteredRecipes = created.filter((el) => !el.createdInDb);
            }
            return {
                ...state,
                recipes: 
                action.payload === "recipes" ?
                state.allRecipes : filteredRecipes
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
            
        //Eliminar receta creada
        case DELETE_CARD:
            const updatedRecipes = state.recipes.filter(recipe => recipe.id !== action.recipeId);
            return {
                ...state,
                recipes: updatedRecipes
            };

            
        default:
            return { ...state };
    }

};

export default rootReducer;