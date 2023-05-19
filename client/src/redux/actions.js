//Las acciones describen un cambio que debe realizarse en el estado de la aplicación
//y se envían a través de los reducers para actualizar el estado.
//proporcionan una forma de mantener un registro de lo que está sucediendo en la aplicación.
import axios from "axios";

export const GET_RECIPES = "GET_RECIPES"; //identificador único para una acción.
export const GET_RECIPE_NAME = "GET_RECIPE_NAME";
export const GET_DETAIL = "GET_DETAIL";

export const getRecipes = () => {
    //mis recetas desde el back
    return async function (dispatch) {
        // el método dispatch en Redux se utiliza para enviar una acción a los reducers
        // para actualizar el estado de la aplicación.
        // La acción debe tener una propiedad "type" y puede tener una propiedad "payload"
        // que contiene información adicional para la acción.
        const recipesback = await axios.get("http://localhost:3001/recipes"); //mi ruta del backend
        const recipes = recipesback.data; //acceder a la data de la ruta
        dispatch({
            type: GET_RECIPES,
            payload: recipes,
        });
    };
};

export function searchRecipeName(name) {
    //name llega por payload
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
