import React, { useEffect, useState } from "react";

import "./searchresult.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../../GlobalContext";

export default function SearchResult() {
    const { query } = useParams();
    const { setPlaylist, setPlaylistIndex } = useAppContext();
    const [result, setResult] = useState([]);

    const handlePlaylist = (input) => {
        setPlaylist(result);
        setPlaylistIndex(input);
    };

    useEffect(() => {
        const getAllSongsByQuery = async () => {
            axios
                .get("https://deezerdevs-deezer.p.rapidapi.com/search", {
                    params: { q: query },
                    headers: {
                        "Content-Type": "application/json",
                        "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
                        "X-RapidAPI-Host": process.env.REACT_APP_HOST,
                    },
                })
                .then((response) => {
                    // console.log(response.data);
                    setResult(() => {
                        return response.data.data.filter(
                            (music) => music.preview.length > 0
                        );
                    });
                    // setPlaylist(response.data.data);
                })
                .catch((error) => console.log(error));
        };

        getAllSongsByQuery();
    }, [query]);

    return (
        <div className="search-result">
            {result.map((item, index) => {
                return (
                    <div
                        className="music-card"
                        key={item.id}
                        onClick={() => handlePlaylist(index)}
                    >
                        <div className="image-container">
                            <img src={item.album.cover} alt="" />
                        </div>
                        <div className="song-description">
                            <p className="song-title">{item.title}</p>
                            <p className="artist">{item.artist.name}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
