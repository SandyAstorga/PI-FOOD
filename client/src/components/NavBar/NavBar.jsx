import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchRecipeName } from "../../redux/actions";
import style from "./NavBar.module.css"


const NavBar = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState("")
            
    const handlerInputChange = (e) =>{
        e.preventDefault()
        setName(e.target.value)
    }
    
    const handlerSubmit = (e) => {
        e.preventDefault()
        setName("") //ponerlo despues de prevetdefaut para limpiar el input
        dispatch(searchRecipeName(name))
    }

    return(
        <div className={style.navbar}>
            <img className={style.img} src={"https://t4.ftcdn.net/jpg/05/02/53/39/240_F_502533967_327rjdiBU76R3Xu4jfBSKkCPv7MBv9Lz.jpg"} alt=""/>
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