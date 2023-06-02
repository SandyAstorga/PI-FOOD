import React from "react";  
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postRecipe, getDiets } from "../../redux/actions";
import { Link, useHistory } from "react-router-dom";
import validate from "./validate";
import style from "./Form.module.css"

const Form = () => {
    const dispatch = useDispatch();
    const history = useHistory(); //redirigir
    const diets = useSelector(state => state.diets)

    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
        name: "",
        image: "",
        summary: "",
        healthScore: "",
        steps: [],
        diets: [], //llega en un array 
    });

    useEffect(() => { //Despacha las diets
        dispatch(getDiets());
    }, [dispatch])

    const validationErrors = validate(form);
    const isButtonDisabled = validationErrors.hasErrors
    const buttonClasses = `${style.button} ${isButtonDisabled ? style.disabled : ''}`;

    const handleChange = (e) => { //Guarda lo que se escribe en el input 
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...form,
            [e.target.name]: e.target.value,
        }))
    };      

    const handleRange = (e) => {
        setForm({
            ...form,
            healthScore: e.target.value,
        });
    }

    const handleStep = (e) => {
        setForm({
            ...form,
            steps: [e.target.value],
        });
    }

    const handlerCheck = (e) => { //actualiza el estado cuando se selecciona alguna casilla 
        const dietId = e.target.value;
        const isChecked = e.target.checked;

        if (isChecked) {
            setForm({
                ...form,
                diets: [...form.diets, dietId],
            });
        } else {
            setForm({
                ...form,
                diets: form.diets.filter((diet) => diet !== dietId),
            });
        }
    };

    const handleSubmit = (e) => { //Cambia el estado con la info que va recibiendo
        e.preventDefault();
        console.log(form);
        dispatch(postRecipe(form));
        alert("Recipe created successfully");
        setForm({
            name: "",
            image: "",
            summary: "",
            healthScore: "",
            steps: [],
            diets: [],
        });
        history.push('/home')
}

    return (
        <>
        <br/>
        <div className={style.form_container}>
        <form onSubmit={handleSubmit} >
            <h1>New Recipe</h1>
            <div>
        <img className={style.img} src="https://as1.ftcdn.net/v2/jpg/05/02/53/40/1000_F_502534033_1E6FAJoHflfWV7WJaRclRVDS06juv4pI.jpg" alt=""/>
        </div>
            <div>
                <label className={style.form_containerlabel}>Name:* </label>
                <input className={style.form_containerinput}
                    type="text"
                    value={form.name}
                    name="name"
                    placeholder="Enter name of the new recipe"
                    onChange={handleChange} />
                {errors.name &&<li className={style.form_containerwarning }>{errors.name}</li>}
            </div>
            <div>
                <label className={style.form_containerlabel}>Imagen:* </label>
                <input className={style.form_containerinput}
                    type="text"
                    value={form.image}
                    name="image"
                    placeholder="Enter image link"
                    onChange={handleChange} />
                {errors.image && <li className={style.form_containerwarning }>{errors.image}</li>}
            </div>
            <div>
                <label className={style.form_containerlabel}>Summary: </label>
                <textarea className={style.form_containertextarea}
                    type="text"
                    cols="40"
                    rows="3"
                    value={form.summary}
                    name="summary"
                    placeholder="Enter recipe description"
                    onChange={handleChange} />
            </div>
            <div>
                <label className={style.form_containerlabel}>Steps: </label>
                <textarea className={style.form_containertextarea}
                    type="text"
                    cols="40"
                    rows="3"
                    value={form.steps}
                    name="steps"
                    placeholder="Enter the steps to follow"
                    onChange={handleStep} />
            </div>
            <div>
                <label className={style.form_containerlabel}>Health Score:* </label>
                <input className={style.form_containerinput}
                    type="range"
                    min="1"
                    max="100"
                    value={form.healthScore}
                    name="healthScore"
                    onChange={handleRange} />
                <span>{form.healthScore}</span>
                {errors.healthScore && !form.healthScore && <li className={style.form_containerwarning}>{errors.healthScore}</li>}
            </div>
            <div>
                <label className={style.form_containerlabel}>Diets:* </label>
                <div>
                {diets?.map((d) => (
                    <div key={d.id}>
                        <input 
                            type="checkbox"
                            name="diets"
                            value={d.name}
                            onChange={handlerCheck}
                            />
                        <label>{d.name}</label>
                    </div>
                ))}
                </div>
                {errors.diets && form.diets.length === 0 && <div className={style.form_containerwarning}>{errors.diets}</div>}
            </div>
            <br />
            <button disabled={isButtonDisabled} className={buttonClasses}>
                <span>Create Recipe</span>
            </button>
            <Link to='/home'>
                <button >
                    <span>Back to Home</span>
                </button>
            </Link>
        </form>
        </div>
            <br/>
        </>
    )
}

export default Form;