
import axios from "axios";

export const GET_RECIPES = "GET_RECIPES"; //identificador único para una acción.
export const GET_DIET = "GET_DIET";
export const GET_RECIPE_NAME = "GET_RECIPE_NAME";
export const GET_DETAIL = "GET_DETAIL";
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const FILTER_CREATE = 'FILTER_CREATE';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_SCORE = 'ORDER_BY_SCORE';
export const POST_RECIPE = "POST_RECIPE";
export const DELETE_CARD = "DELETE_CARD"
export const GET_RECIPES1 = "GET_RECIPES1"

// //Todas las recetas, API y base de datos 
//MI CODEADA EN VIVO !!!
// export const getRecipes = async() => {
//     const apiRecipes = await axios.get('/recipes');
//     const recipes = apiRecipes.data
//     dispatch({
//     return {
//         type: GET_RECIPES1,
//         payload: recipes
//     }
// })
// }

//Todas las recetas, API y base de datos 
export const getRecipes = () => {
    return async function (dispatch) {
        const recipesBack = await axios.get("/recipes");
        const recipes = recipesBack.data;
        dispatch({
            type: GET_RECIPES,
            payload: recipes,
        });
    };
};

//Todas las Dietas
export const getDiets = () => {
    return async function (dispatch) {
        const typediet = await axios.get("/diets");
        return dispatch({
            type: GET_DIET,
            payload: typediet.data
        })
    }
};

//Buscar por name
export function searchRecipeName(name) {
    name = name.toLowerCase();
    return async function (dispatch) {
        try {
            const infoRecipeName = await axios.get("/recipes?name=" + name);
            return dispatch({
                type: GET_RECIPE_NAME,
                payload: infoRecipeName.data,
            });
        } catch (error) {
            return alert("Recipe Not Found");
        }
    };
}

//Buscar por ID para el Detail
export function getDetail(id) {
    return async function (dispatch) {
        try {
            const recipeData = await axios.get("/recipes/" + id);
            return dispatch({
                type: GET_DETAIL,
                payload: recipeData.data
            })
        } catch (error) {
            return alert("Recipe Not Found")
        }
    }
}

//Crea nueva receta 
export const postRecipe = (payload) => {
    return async function (dispatch) {
        try {
            const data = await axios.post("/recipes", payload);
            return data;
        } catch (error) {
            console.error(`Error sending the recipe: ${error}`);
        }
    };
};


//Filtrar por Tipos de Dietas
export const filterRecipesByDiets = (payload) => {
    return {
        type: FILTER_BY_DIET,
        payload,
    }
};

//Filtra por recetas creadas 
export const filterCreate = (payload) => {
    return {
        type: FILTER_CREATE,
        payload,
    }
};

//Filtra alfabeticamente
export function orderByName(payload) {
    return {
        type: ORDER_BY_NAME,
        payload,
    }
}

//Filtra por Health Score
export function orderByScore(payload) {
    return {
        type: ORDER_BY_SCORE,
        payload,
    }
}

//Elimina receta creada
export const deleteRecipe = (id) => {
    return async (dispatch) => {
        try {
            await axios.delete("/recipes/" + id);
            dispatch({
                type: DELETE_CARD,
                payload: id
            });
            alert('Recipe successfully deleted');
        } catch (error) {
            alert('Error deleting recipe', error);
        }
    }
}

