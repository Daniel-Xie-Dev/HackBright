import React from "react";
import "./card.css";
import { Link } from "react-router-dom";

export default function AlbumCard(props) {
    const { album } = {
        ...props,
    };
    return (
        <div className="card">
            <div className="card-container" key={album.id}>
                <div className="card-image-container">
                    <img className="card-image" src={album.cover} alt=""></img>
                </div>
                <div className="card-text">
                    <Link
                        to={`/search/result/album/${album.id}`}
                        // onClick={() => window.location.reload()}
                    >
                        {album.title}
                    </Link>
                </div>
            </div>
        </div>
    );
}
