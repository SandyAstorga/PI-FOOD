import React from 'react';
import style from './Landing.module.css'
import { Link } from "react-router-dom";

const Landing = () => {

    return (
        <div className={style.landing_container}>
        <Link to='/home'>
        <button className={style.ba}>
            <span>Bon Appétit</span>
        </button>
        </Link>
        </div>

    )
}

export default Landing;