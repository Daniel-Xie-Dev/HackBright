import React from "react";
import "./card.css";
import { Link } from "react-router-dom";

export default function SingerCard(props) {
    const { singer } = {
        ...props,
    };
    return (
        <div className="card">
            <div className="card-container" key={singer.id}>
                <div className="card-image-container">
                    <img className="card-image" src={singer.picture} alt=""></img>
                </div>
                <div className="card-text">
                    <Link to={`/search/result/search/${singer.name}`}>
                        {singer.name}
                    </Link>
                </div>
            </div>
        </div>
    );
}
