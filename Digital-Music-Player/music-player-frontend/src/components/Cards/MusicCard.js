import React from "react";
import "./card.css";
import { AiFillPlayCircle, AiFillPlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function MusicCard(props) {
    const { item, handlePlayCallback } = {
        ...props,
    };
    return (
        <div className="card">
            <div className="card-container" key={item.id}>
                <div className="card-image-container">
                    <img
                        className="card-image"
                        src={item.album.cover}
                        alt=""
                        onClick={handlePlayCallback}
                    ></img>
                </div>
                <div className="card-text">
                    <Link to={`/search/result/search/${item.title}`}>
                        {item.title}
                    </Link>
                    <Link to={`/search/result/artist/${item.artist.id}`}>
                        {item.artist.name}
                    </Link>
                </div>

                <div className="card-buttons" onClick={handlePlayCallback}>
                    <AiFillPlayCircle />
                </div>

                <div className="card-buttons">
                    <AiFillPlusCircle />
                </div>
            </div>
        </div>
    );
}
