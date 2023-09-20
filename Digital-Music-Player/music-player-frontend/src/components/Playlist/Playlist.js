import React, { useEffect, useState } from "react";
import "./playlist.css";
import { AiOutlinePlus } from "react-icons/ai";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Playlist() {
    const [cookies, setCookies] = useCookies();
    const [playlists, setPlaylists] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getAllPlaylistsByUser = async () => {
            await axios
                .get(
                    `http://localhost:8080/api/v1/tracklists/user/${cookies.user.id}`
                )
                .then((response) => {
                    setPlaylists(response.data);
                })
                .catch((err) => console.log(err));
        };
        if (cookies.user) {
            getAllPlaylistsByUser();
        } else {
            navigate("/");
        }
    }, []);

    return (
        <div className="playlist">
            <div className="playlist-header">
                <h1>Your playlists</h1>
            </div>

            <div className="playlist-container">
                <div className="playlist-card create-playlist-card ">
                    <AiOutlinePlus />
                </div>
                <div
                    className="playlist-card"
                    onClick={() => navigate(`/library/${"favorite"}`)}
                >
                    Favorites
                </div>

                {playlists.map((playlist) => {
                    return (
                        <>
                            <div
                                key={playlist.id}
                                className="playlist-card"
                                onClick={() => navigate(`/library/${playlist.id}`)}
                            >
                                {playlist.trackTitle}
                            </div>
                        </>
                    );
                })}
            </div>
        </div>
    );
}
