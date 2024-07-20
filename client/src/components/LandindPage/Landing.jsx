import React from 'react';
import style from './Landing.module.css'
import { Link } from "react-router-dom";

const Landing = () => {

    return (
        <>
            <div className={style.welcome_container}>
                <h1 className={style.text}>Welcome !
                    <br />
                    Discover a wide variety of recipes that will make you say:
                </h1>
                <br />
                <Link to='/home'>
                    <button className={style.button}>
                        Bon Appétit
                    </button>
                </Link>
            </div>
        </>
    )
}

export default Landing;