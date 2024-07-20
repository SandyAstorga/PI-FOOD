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
        <div className={style.container_detail}>
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
                                <h3 className={style.titles}>{r.id}</h3>
                                <h1 className={style.titles}>{r.name}</h1>
                            </div>
                            <img src={r.image} alt="🥣" className={style.recipe_card__image} />
                            <div>
                                <br />
                                <div className={style.score_bar}>
                                    <h1>Health Score</h1>
                                    <h2 className={style.score_progress}>{r.healthScore}%</h2>
                                </div>
                                <div>
                                    {!r.createdInDb ? (
                                        <ul>
                                            {r.diets.map((d, index) => (
                                                <li className={style.diets} key={index}>{d}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <ul>
                                            {r.diets.map((d, index) => (
                                                <li className={style.diets} key={index}>{d}</li>
                                            ))}
                                        </ul>
                                    )}
                                    {/* <ul>
                                        {r.diets?.map((d, index) => (
                                            <li className={style.diets} key={index}>{d}</li>
                                        ))}
                                    </ul> */}
                                </div>
                            </div>
                            <div className={style.container_text}>
                                <h2 className={style.titles}>Summary</h2>
                                <p className={style.texts}>{r.summary}</p>
                                <h2 className={style.titles}>Preparation</h2>
                                <p className={style.texts}>{r.steps}</p>
                            </div>
                        </div>
                    ))}
                    <div>
                        <Link to='/home'>
                            <button className={style.back}>
                                <span >Back to Home</span>
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