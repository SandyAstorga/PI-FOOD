import React from "react";
import { useDispatch } from "react-redux";
import { deleteCard } from "../../redux/actions";


const DeleteCardButton = ({ id , isCreatedByUser}) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteCard(id));
    };

    return (
        <div>
        {isCreatedByUser && (
            <button onClick={handleDelete}>X</button>
        )}
        </div>
    );
};

export default DeleteCardButton;
