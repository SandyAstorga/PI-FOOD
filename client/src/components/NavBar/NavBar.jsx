import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchRecipeName } from "../../redux/actions";
import style from "./NavBar.module.css"


const NavBar = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState("")
    // // const [isSearching, setIsSearching] = useState(false);
            
    const handlerInputChange = (e) =>{
        e.preventDefault()
        setName(e.target.value)
    }
    
    const handlerSubmit = (e) => {
        e.preventDefault()
        setName("") //ponerlo despues de prevetdefaut para limpiar el input
        dispatch(searchRecipeName(name))
        // setIsSearching(true);
    }
    
    // // const handleClick = (e) => {
    // //     e.preventDefault();
    // //     dispatch(getPokemons())
    // // }
    
    // useEffect(() => { 
    //     dispatch(getPokemons());
    // },[dispatch])

    return(
        <div>
            <img className={style.img} src={"https://www.kindpng.com/picc/m/82-823366_transparent-bon-appetit-png-bon-appetit-icon-png.png"} alt=""/>
            <Link to='/about'>
            <button>
                <span>About Me</span>
            </button>
            </Link>
            <Link to='/create'>
                <button>
                    <span>Create New Recipe</span>
                </button>
            </Link>
            <button type="submit" onClick={handlerSubmit}>
                <span>🔍</span>
                <input type="text" value={name} placeholder="Search Recipe" onChange={handlerInputChange}/>
            </button>
            </div>
    )
}


export default NavBar;