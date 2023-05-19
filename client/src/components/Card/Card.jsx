//Aqui es donde hacemos el componente Card que tendra los 3 props que va a mostrar
import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({name, diets, image, id}) => { //destructuring
    return (
        <div >
            <br />
            <p>{name}</p>
            <br />
            <img src={image} alt={name} />
            <br />
            {/* Hacer un map para las diets */}
                {diets.map((d) => {
                    return <p>🍴{d}</p>;
                })}
            <Link to={'/detail/' + id}>
            <button>
                <span>Go To Recipe</span>
            </button>
            </Link>
        </div>
    )
};

export default Card;