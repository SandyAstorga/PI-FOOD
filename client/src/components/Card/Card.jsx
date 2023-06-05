import React from 'react';
import { Link } from 'react-router-dom';
import style from "./Card.module.css"

const Card = ({ name, diets, image, id, healthScore }) => {

    return (
        <div className={style.recipe_card}>
            <div>
                <Link to={`/detail/${id}`}>
                <img className={style.recipe_card__image} src={image} alt={name} />
                </Link>
                <h5 className={style.recipe_card__title}>{name}</h5>
                <p>{healthScore}</p>
                    {diets?.map((d, index) => (
                        <li className={style.recipe_diets} key={index}>{d}</li>
                    ))}
            </div>
        </div>
    );
};

export default Card;
