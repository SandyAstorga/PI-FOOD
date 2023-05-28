//Las acciones describen un cambio que debe realizarse en el estado de la aplicación
//y se envían a través de los reducers para actualizar el estado.
//proporcionan una forma de mantener un registro de lo que está sucediendo en la aplicación.
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

//Todas las recetas, API y base de datos 
export const getRecipes = () => {
    return async function (dispatch) {
        const recipesBack = await axios.get("http://localhost:3001/recipes");
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
        var typediet = await axios.get("http://localhost:3001/diets");
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
            const infoRecipeName = await axios.get("http://localhost:3001/recipes?name=" + name
            );
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
            const recipeData = await axios.get("http://localhost:3001/recipes/" + id);
            return dispatch({
                type: GET_DETAIL,
                payload: recipeData.data
            })
        } catch (error) {
            return alert("Recipe Not Found")
        }
    }
}

export const postRecipe = (payload) => {
    return async function (dispatch) {
        try {
            const data = await axios.post("http://localhost:3001/recipes", payload);
            return data;
        } catch (error) {
            console.error(`Error al enviar la receta: ${error}`);
        }
    };
};

export const deleteCard = (id) => {
    return async (dispatch) => {
        try {
            await axios.delete("http://localhost:3001/recipes/" + id);
            dispatch({
                type: DELETE_CARD,
                payload: id,
            });
        } catch (error) {
            dispatch({
                type: DELETE_CARD,
                payload: error.message,
            });
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

