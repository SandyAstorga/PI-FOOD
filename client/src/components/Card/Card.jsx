import React from 'react';
import axios from "axios"
import { Link, useHistory } from 'react-router-dom';
import style from "./Card.module.css"

const Card = ({ name, diets, image, id, createdInDb, healthScore }) => {
    const history = useHistory();

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/recipes/${id}`);
            alert('Receta eliminada correctamente');
            history.push('/home');
            // window.location.reload()
        } catch (error) {
            console.log(error);
            alert('Error al eliminar la receta:', error);
        }
    };

    return (
        <div className={style.recipe_card}>
            <div>
                {createdInDb && (
                    <button onClick={() => handleDelete(id)}>X</button>
                )}
                <Link to={`/detail/${id}`}>
                    <img className={style.recipe_card__image} src={image} alt={name} />
                </Link>
                <h5 className={style.recipe_card__title}>{name}</h5>
                {/* <p>{healthScore}</p> */}
                {diets?.map((d, index) => (
                    <li className={style.recipe_diets} key={index}>{d}</li>
                ))}
            </div>
        </div>
    );
};

export default Card;
