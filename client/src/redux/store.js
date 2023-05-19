import { createStore, applyMiddleware } from "redux"; //Crear la Store, y los Middleware
import { composeWithDevTools } from "redux-devtools-extension"; //Depurar la store 
import thunk from "redux-thunk"; //Permite que las acciones de Redux devuelvan funciones en lugar de objetos
import rootReducer from "./reducer" //Importa el archivo reducer.js que contiene el rootReducer. Combina valios reducers en uno solo

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
//Crea la tienda de Redux utilizando createStore. 
//rootReducer es la función que combina todos los reducers en uno solo. 
//composeWithDevTools agrega la capacidad de depuración a la tienda, 
//y applyMiddleware(thunk) aplica el middleware thunk a la tienda.

export default store; //Se exporta 

// El store es un objeto que contiene el estado de la aplicación 
// y los métodos para actualizar ese estado. 
