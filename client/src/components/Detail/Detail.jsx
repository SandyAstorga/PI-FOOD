import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions";

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
                    src={"https://i.gifer.com/1Gzb.gif"}
                    alt="" />
            ) : (
                <div>
                    <div>
                        {recipe.map((r) => (
                            <div>
                                <h3>{r.id}</h3>
                                <h1 >{r.name}</h1>
                                <img src={r.image} alt="🥣" />
                                <h1>Score {r.healthScore}</h1>
                                <h5>{r.summary}</h5>
                                <h2>Diets{"  "}
                                    <p>
                                        {!r.createdInDb ?
                                            r.diets :
                                            r.diets.map(el => el.name)
                                        }
                                    </p>
                                </h2>
                                <h2>Preparation</h2>
                                <h5>{r.steps}</h5>
                            </div>
                        ))}
                    </div>
                    <Link to='/home'>
                        <button>
                            <span >Back</span>
                        </button>
                    </Link>
                </div>
            )}
        </div>
    )
};

export default Detail;