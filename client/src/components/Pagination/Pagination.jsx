import React from "react";


//Logica del paginado
export default function Paginado({ recipesPerPage, allRecipes, page, setCurrentPage, currentPage }) {
    //La funcion tendra 3 props, las recetas por pagina
    //Los que queremos que se renderizen, luego todas las recetas(100)
    //y el paginado (la funcion esta en el home)

    const pageNumbers = [];
    //Array vacio

    for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
        pageNumbers.push(i);
    }  // iteramos el reultado de dividir todas las recetas / las recetas por pagina que queremos
    //Es decir 100 / 9  y lo rendondemos hacia arriba = 12 paginas 
    //y se iran pusheando el numero de paginas en el array

    const handleNextClick = () => { //Incrementa el estado de currentPage
        setCurrentPage(currentPage + 1);
    };

    const handlePrevClick = () => { //Decrementa el estado currentPage
        setCurrentPage(currentPage - 1);
    };

    return (
        // Vamos a retornar en un div 
        <div>

            <ul className='paginado' >
                {currentPage !== 1 && (
                    <button onClick={handlePrevClick}>⏪</button>
                )}
                {pageNumbers &&
                    // si existe el numero de paginas se ejecuta el metodo map 
                    pageNumbers.map(number => {
                        return (
                            // donde cada numero va a ser un boton que tendra un evennto on click
                            // donde se renderizara con la funcion paginado(en home) con el numero de pagina actual 
                            <button onClick={() => page(number)}>
                                <span>{number}</span>
                            </button>
                        )
                    })}
                {currentPage !== pageNumbers.length && (
                        <button onClick={handleNextClick}>⏩</button>
                )}
            </ul>
        </div>  
    );
}