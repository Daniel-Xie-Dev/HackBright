import React from "react";
import "./playlist.css";
import { AiOutlinePlus } from "react-icons/ai";

export default function Playlist() {
    return (
        <div className="playlist">
            <div className="playlist-header">
                <h1>Your playlists</h1>
            </div>

            <div className="playlist-container">
                <div className="playlist-card create-playlist-card ">
                    <AiOutlinePlus />
                </div>
                <div className="playlist-card">Favorites</div>
                <div className="playlist-card">Favorites</div>
                <div className="playlist-card">Favorites</div>
                <div className="playlist-card">Favorites</div>
            </div>
        </div>
    );
}
