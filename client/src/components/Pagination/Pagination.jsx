import React from "react";
import style from "./Pagination.module.css"

//Logica del paginado
export default function Paginado({ recipesPerPage, allRecipes, page, setCurrentPage, currentPage }) {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
        pageNumbers.push(i);
    }  

    const handleNextClick = () => { //Incrementa el estado de currentPage
        setCurrentPage(currentPage + 1);
    };

    const handlePrevClick = () => { //Decrementa el estado currentPage
        setCurrentPage(currentPage - 1);
    };

    return (
        <div className={style.container}>
            <ul className='paginado' >
                {currentPage !== 1 && (
                    <button onClick={handlePrevClick}>{'<<'}</button>
                )}
                {pageNumbers &&
                    pageNumbers.map((number,index) => {
                        return ( 
                            <button key={index}
                            onClick={() => page(number)}
                            style={{ backgroundColor: currentPage === number ? '#e26d5c' : '#333' }}>
                                <span>{number}</span>
                            </button>
                        )
                    })}
                {currentPage !== pageNumbers.length && (
                        <button onClick={handleNextClick}>{'>>'}</button>
                )}
            </ul>
        </div>  
    );
}