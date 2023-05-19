import React from "react";
import { useEffect, useState } from "react"; //Hooks
import { useDispatch, useSelector } from "react-redux"; //Hooks
import { getRecipes } from "../../redux/actions"; //Actions
import Pagination from '../Pagination/Pagination'
import { NavBar } from "../indexcomponents";
import Card from "../Card/Card";

const Home = () => {
    const dispatch = useDispatch(); //Despachar mis acciones
    const allRecipes = useSelector((state) => state.recipes);

    const [ currentPage, setCurrentPage ] = useState(1); 
    //Declaro un estado local al que le paso la pagina actual y cual va a ser la pagina actual , donde se inia el estado en 1 
    const [ recipesPerPage ] = useState(9);
    //Estado local de la cantidad de recetas por pagina, arranca el estado en 9
    const indexOfLastRecipe = currentPage * recipesPerPage;
    //la pagina actual multiplicada por las recetas por pagina 
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    //el indice de la ultima receta menos las recetas por pagina me dara el indice de la primera receta
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
    // el curretRecipes sera la parte de todas las recetas donde esta el indice de la primera receta y de la ultima

    const page = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getRecipes());
    }, [dispatch]);

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getRecipes());
    };

    return (
        <div>
            <NavBar/>
            <Pagination
                recipesPerPage={recipesPerPage}
                allRecipes={allRecipes.length}
                page={page}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <button onClick={handleClick}>Refresh</button>
            <div>
                <select>
                    <option value="up">A - Z</option>
                    <option value="des">Z - A</option>
                </select>
                <select>
                    <option value="score">Health Score</option>
                    <option value="lower">Lower</option>
                    <option value="higher">Higher</option>
                </select>
                <select>
                    <option value="dietsele">Select Diet</option>
                    {/* usar map */}
                    {/* El value es mi payload */}
                    {/* {types?.map( type => (
                            <option value={type.name}>{type.name}</option>
                        )) //Selector
                    } */}
                </select>
                <select>
                    <option value="select recipes">Select Recipes</option>
                    <option value="api">API</option>
                    <option value="created">Created</option>
                </select>
                { currentRecipes?.map((r) => {
                    return(
                        <Card
                            key={r.id}
                            name={r.name}
                            image={r.image}
                            diets={r.diets}
                            id={r.id}
                        />
                        )
                    })}
            </div>
        </div>
    );
};

export default Home;
