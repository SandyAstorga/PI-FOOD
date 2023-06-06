import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteRecipe, getRecipes } from '../../redux/actions';
import style from "./Card.module.css"

const Card = ({ name, diets, image, id, createdInDb, healthScore }) => {

    const dispatch = useDispatch();

    const handleDelete = async (id) => {
        dispatch(deleteRecipe(id));
        dispatch(getRecipes())
    };

    return (
        <div className={style.recipe_card}>
            <div>
                <Link to={`/detail/${id}`}>
                    <img className={style.recipe_card__image} src={image} alt={name} />
                </Link>
                <h5 className={style.recipe_card__title}>{name}</h5>
                {/* <p>{healthScore}</p> */}
                {diets?.map((d, index) => (
                    <li className={style.recipe_diets} key={index}>{d}</li>
                ))}
                {createdInDb && (
                    <button className={style.delete} onClick={() => handleDelete(id)}>Delete</button>
                )}
            </div>
        </div>
    );
};

export default Card;
