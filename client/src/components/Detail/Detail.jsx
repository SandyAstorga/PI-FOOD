import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";
import style from "./Detail.module.css"

const Detail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        dispatch(getDetail(id)).then(() => setLoading(false));
    }, [dispatch, id]);

    const recipe = useSelector((state) => state.detail);

    return (
        <div>
            {loading ? (
                <img
                    className={style.loading_image}
                    src={"https://i.gifer.com/1Gzb.gif"}
                    alt="" />
            ) : (
                <div>
                    <Link to='/home'>
                        <button className={style.back}>
                            <span >Back</span>
                        </button>
                    </Link>
                    {recipe.map((r, index) => (
                        <div key={index}>
                            <div>
                                <h3>{r.id}</h3>
                                <h1 >{r.name}</h1>
                                <img src={r.image} alt="🥣" className={style.recipe_card__image} />
                            </div>
                            <div className={style.score_diets}>
                                <h2>Score {r.healthScore}</h2>
                                <h2>Diets</h2>
                                {/* {!r.createdInDb ?
                                    r.diets + (" ") :
                                    r.diets.map((d, index) => (
                                        <li key={index}>{d.name}</li>
                                    ))} */}
                                {!r.createdInDb ? (
                                    // <li>{r.diets.join("  ")}</li>
                                    <ul>
                                        {r.diets.map((d, index) => (
                                            <li key={index}>{d}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <ul>
                                        {r.diets.map((d, index) => (
                                            <li key={index}>{d}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div className={style.summ_steps}>
                                <h2>Summary</h2>
                                <p className={style.texts}>{r.summary}</p>
                                <h2 >Preparation</h2>
                                <p className={style.texts}>{r.steps}</p>
                            </div>
                        </div>
                    ))}
                    <br />
                    
                </div>
            )}
        </div>
    )
};

export default Detail;