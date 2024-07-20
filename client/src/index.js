import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'; //Provider proporciona la conexión entre React y Redux,
import store from './redux/store' //Store es el objeto que contiene todo el estado de la aplicación.
import { BrowserRouter} from 'react-router-dom';
//BrowserRouter es un componente de React Router que permite al desarrollador 
// crear una aplicación de una sola página (SPA) con múltiples rutas 
// y transiciones suaves entre las diferentes vistas, todo esto en el contexto del navegador web.
import './firebaseConfig';


ReactDOM.render(
  <Provider store={store}> 
  {/* Importante el provider*/}
  <BrowserRouter>
  <React.StrictMode> 
    {/* Sola pagina con multiples rutas */}
    <App />
  </React.StrictMode>
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
