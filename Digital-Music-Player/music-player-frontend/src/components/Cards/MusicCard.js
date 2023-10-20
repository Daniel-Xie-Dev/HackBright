import React from "react";
import "./card.css";
import {
    AiFillPauseCircle,
    AiFillPlayCircle,
    AiFillPlusCircle,
} from "react-icons/ai";
import { Link } from "react-router-dom";

export default function MusicCard(props) {
    const {
        item,
        handlePlayCallback,
        isPlaying,
        handlePlayPauseCallback,
        handleMusicModalCallback,
        isCurrentIndex,
        index,
    } = {
        ...props,
    };

    return (
        <div className="card">
            <div
                className={`card-container ${isCurrentIndex ? "selected-card" : ""}`}
                key={item.id}
            >
                <div className="card-image-container">
                    <img
                        className="card-image"
                        src={item.album.cover}
                        alt=""
                        onClick={handlePlayCallback}
                    ></img>
                </div>
                <div className="card-text">
                    <Link
                        className="card-link"
                        to={`/search/result/search/${item.title}`}
                    >
                        {item.title}
                    </Link>
                    <Link
                        className="card-link"
                        to={`/search/result/artist/${item.artist.id}`}
                    >
                        {item.artist.name}
                    </Link>
                </div>

                <div
                    className="card-buttons"
                    onClick={() => handlePlayPauseCallback(index)}
                >
                    {console.log(isCurrentIndex)}
                    {console.log(isPlaying)}
                    {isCurrentIndex && isPlaying ? (
                        <AiFillPauseCircle />
                    ) : (
                        <AiFillPlayCircle />
                    )}
                </div>

                <div
                    className="card-buttons"
                    onClick={() => handleMusicModalCallback(item.id)}
                >
                    <AiFillPlusCircle />
                </div>
            </div>
        </div>
    );
}
