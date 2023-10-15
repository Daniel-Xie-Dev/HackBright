import React, { useEffect, useState } from "react";

import "./searchresult.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../../GlobalContext";
import MusicCard from "../Cards/MusicCard";
import AlbumCard from "../Cards/AlbumCard";
import SingerCard from "../Cards/SingerCard";

export default function SearchResult() {
    const { type, query } = useParams();

    console.log(type, query);
    const { playlist, setPlaylist, playlistIndex, setPlaylistIndex, setData, setShowModal } =
        useAppContext();
    const navigate = useNavigate();
    const [result, setResult] = useState([]);
    const [singerMap, setSingerMap] = useState(new Map());
    const [albumMap, setAlbumMap] = useState(new Map());
    const [pageState, setPageState] = useState(0);
    const [paramText, setParamText] = useState(query);

    const headers = {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
        "X-RapidAPI-Host": process.env.REACT_APP_HOST,
    };

    const handlePlaylist = (input) => {
        setPlaylist(result);
        setPlaylistIndex(input);
    };

    const handleSearchClick = (type, query) => {
        navigate(`/search/result/${type}/${query}`);
    };

    const conditionalRender = () => {
        if (pageState === 0) {
            return result.map((item, index) => {
                return (
                    <MusicCard
                        item={item}
                        handlePlayCallback={() => handlePlaylist(index)}
                        handleMusicModalCallback={handleMusicModal}
                        isCurrentIndex={
                            playlist === result && index === playlistIndex
                        }
                    ></MusicCard>
                );
            });
        } else if (pageState === 1) {
            return [...singerMap.keys()].map((singerKey) => {
                const singer = singerMap.get(singerKey);
                return <SingerCard singer={singer}></SingerCard>;
            });
        } else {
            console.log(albumMap);
            return [...albumMap.keys()].map((albumKey) => {
                const album = albumMap.get(albumKey);
                return <AlbumCard album={album}></AlbumCard>;
            });
        }
    };

    const handleMusicModal = async (apiId) => {

        await axios
            .get(`https://deezerdevs-deezer.p.rapidapi.com/track/${apiId}`, {
                headers: {
                    "Content-Type": "application/json",
                    "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
                    "X-RapidAPI-Host": process.env.REACT_APP_HOST,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    setData(response.data);
                    setShowModal(true);
                }
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        const getAlbumInformation = async (albumId) => {
            await axios
                .get(`https://deezerdevs-deezer.p.rapidapi.com/album/${albumId}`, {
                    headers: headers,
                })
                .then((response) => {
                    setParamText(response.data.title);
                    setResult(response.data.tracks.data);

                    let singerMap = new Map();

                    singerMap.set(response.data.artist.id, response.data.artist);

                    setSingerMap(singerMap);

                    let albumMap = new Map();
                    albumMap.set(response.data.id, response.data);

                    setAlbumMap(albumMap);

                    // setPlaylist(response.data.data);
                })
                .catch((error) => console.log(error));
        };

        const getArtistInformation = async (artistId) => {
            await axios
                .get(`https://deezerdevs-deezer.p.rapidapi.com/artist/${artistId}`, {
                    headers: headers,
                })
                .then((response) => {
                    handleSearchClick("search", response.data.name);

                    // setPlaylist(response.data.data);
                })
                .catch((error) => console.log(error));
        };

        const getAllSongsByQuery = async (query) => {
            await axios
                .get("https://deezerdevs-deezer.p.rapidapi.com/search", {
                    params: { q: query },
                    headers: headers,
                })
                .then((response) => {
                    console.log(response.data);
                    setResult(response.data.data);
                    setParamText(query);

                    let singer = new Map();
                    let album = new Map();
                    response.data.data.map((object) => {
                        album.set(object.album.id, object.album);
                        singer.set(object.artist.id, object.artist);
                    });

                    setAlbumMap(album);
                    setSingerMap(singer);

                    // setPlaylist(response.data.data);
                })
                .catch((error) => console.log(error));
        };

        if (type === "search") {
            getAllSongsByQuery(query);
        } else if (type === "artist") {
            getArtistInformation(query);
        } else if (type === "album") {
            getAlbumInformation(query);
        }
        setPageState(0);

        // window.location.reload();
    }, [type, query]);

    console.log(type, query);

    return (
        <div className="search-result">
            <div className="search-result-text">
                <h2>Search result for "{paramText}"</h2>
            </div>

            <div className="search-result-container">
                <div className="search-result-filter">
                    <button
                        onClick={() => setPageState(0)}
                        className={
                            pageState === 0
                                ? "activated-filter-button"
                                : "deactivated-filter-button"
                        }
                    >
                        Song
                    </button>
                    <button
                        onClick={() => setPageState(1)}
                        className={
                            pageState === 1
                                ? "activated-filter-button"
                                : "deactivated-filter-button"
                        }
                    >
                        Singers
                    </button>
                    <button
                        onClick={() => setPageState(2)}
                        className={
                            pageState === 2
                                ? "activated-filter-button"
                                : "deactivated-filter-button"
                        }
                    >
                        Albums
                    </button>
                </div>

                <div className="search-result-list">
                    {conditionalRender()}
                    {/* {result.length > 0 ? (
                        result.map((item, index) => {
                            return (
                                <MusicCard
                                    key={item.id}
                                    image={item.album.cover}
                                    title={item.title}
                                    artist={item.artist.name}
                                    handlePlayCallback={() => handlePlaylist(index)}
                                ></MusicCard>
                            );
                        })
                    ) : (
                        <></>
                    )} */}
                </div>
            </div>
        </div>
    );
}
