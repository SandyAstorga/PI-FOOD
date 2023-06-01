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
                    {recipe.map((r, index) => (
                        <div key={index}>
                            <div>
                                <h3>{r.id}</h3>
                                <h1 >{r.name}</h1>
                            </div>
                                <img src={r.image} alt="🥣" className={style.recipe_card__image} />
                            <div>
                            <br/>
                                <h2 className={style.score}>Score {r.healthScore}</h2>
                                <div className={style.diets} >
                                {!r.createdInDb ? (
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
                            </div>
                            <div className={style.summ_steps}>
                                <h2>Summary</h2>
                                <p className={style.texts}>{r.summary}</p>
                                <h2 >Preparation</h2>
                                <p className={style.texts}>{r.steps}</p>
                                <br/>
                            </div>
                        </div>
                    ))}
                    <div>
                    <Link to='/home'>
                        <button className={style.back}>
                            <span >Back</span>
                        </button>
                    </Link>
                    </div>
                    <br />
                </div>
            )}
        </div>
    )
};

export default Detail;