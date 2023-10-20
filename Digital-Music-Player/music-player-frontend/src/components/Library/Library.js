import React, { useRef, useState } from "react";
import "./library.css";
import {
    AiFillDelete,
    AiFillEdit,
    AiFillHeart,
    AiFillSave,
    AiOutlineHeart,
    AiOutlineMinus,
} from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import { useAppContext } from "../../GlobalContext";
import axios from "axios";
import { addMusicToTracklist, removeMusicLibrary } from "../../api/MusictrackAPI";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Library() {
    const { query } = useParams();
    const [cookies] = useCookies();
    const {
        playlist,
        setPlaylist,
        library,
        playlistIndex,
        setPlaylistIndex,
        likedMusiclist,
        setLikedMusiclist,
        setLibrary,
    } = useAppContext();

    const [isEditable, setIsEditable] = useState(false);
    const trackTitleRef = useRef();
    const navigate = useNavigate();

    const handleIsEditable = () => {
        // if (!isEditable) {
        //     trackTitleRef.current.focus();
        // }
        setIsEditable(!isEditable);
    };
    const isLibraryLoaded = library.get(parseInt(query)) !== undefined;
    const isCurrentLibrary = playlist.id === parseInt(query);

    const handleAlbumSearch = async (apiId) => {
        await axios
            .get(`https://deezerdevs-deezer.p.rapidapi.com/track/${apiId}`, {
                headers: {
                    "Content-Type": "application/json",
                    "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
                    "X-RapidAPI-Host": process.env.REACT_APP_HOST,
                },
            })
            .then((response) => {
                navigate(`/search/result/album/${response.data.album.id}`);

                // setPlaylist(response.data.data);
            })
            .catch((error) => console.log(error));
    };

    const likeMusicFromLibrary = async (music) => {
        const musicTrack = {
            apiId: music.apiId,
            title: music.title,
            artist: music.artist,
            album: music.album,
        };

        const response = await addMusicToTracklist(
            musicTrack,
            cookies.user.favorite_list
        );
        if (response !== null) {
            setLibrary((prevLibrary) => {
                let object = prevLibrary.get(cookies.user.favorite_list);
                if (
                    object.musics.length !== 0 &&
                    object.musics[object.musics.length - 1].id === response.id
                )
                    return prevLibrary;
                const musics = [...object.musics, response];
                object.musics = musics;
                prevLibrary.set(cookies.user.favorite_list, object);
                return new Map(prevLibrary);
            });
            setLikedMusiclist((prevSet) => {
                return new Set(prevSet.add(response.music.apiId));
            });
        }
    };

    const removeMusic = async (apiId, key) => {
        const response = await removeMusicLibrary(
            apiId,
            library.get(parseInt(key))?.musics
        );
        console.log(response);
        if (response !== undefined) {
            const object = library
                .get(parseInt(key))
                ?.musics.find((item) => item.music.apiId === response);
            if (object !== undefined) {
                setLibrary((prevLibrary) => {
                    const musics = library
                        .get(parseInt(key))
                        ?.musics.filter((item) => item.music.apiId !== response);
                    console.log(musics);
                    let object = prevLibrary.get(parseInt(key));
                    object = { ...object, musics };
                    prevLibrary.set(parseInt(key), object);
                    return new Map(prevLibrary);
                });

                if (cookies.user.favorite_list === parseInt(key)) {
                    setLikedMusiclist((prevSet) => {
                        prevSet.delete(object.music.apiId);
                        return new Set(prevSet);
                    });
                }
            }
        }
    };

    const handleLibraryEvent = (index) => {
        setPlaylist(library.get(parseInt(query)));
        setPlaylistIndex(index);
    };

    const handleTitleChange = async () => {
        await axios
            .put(
                `http://localhost:8080/api/v1/tracklists/edit`,
                {
                    id: query,
                    trackTitle: trackTitleRef.current.value,
                },
                {
                    headers: { "Content-Type": "application/json" },
                }
            )
            .then((response) => {
                if (response.status === 200) {
                    const trackTitle = trackTitleRef.current.value;
                    const object = { ...library.get(parseInt(query)), trackTitle };
                    setLibrary((prevLibrary) => {
                        prevLibrary.set(parseInt(query), object);
                        return new Map(prevLibrary);
                    });
                    trackTitleRef.current.value = "";

                    setIsEditable(false);
                }
            })
            .catch((err) => console.log(err));
    };

    const handleDelete = async () => {
        await axios
            .delete(`http://localhost:8080/api/v1/tracklists/${query}`, {
                headers: { "Content-Type": "application/json" },
            })
            .then((response) => {
                if (response.data === "success") {
                    setLibrary((prevLibrary) => {
                        prevLibrary.delete(parseInt(query));
                        return new Map(prevLibrary);
                    });
                    navigate("/playlist");
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <div className="library">
                <div className="explore-header-card">
                    <input
                        placeholder={library.get(parseInt(query))?.trackTitle}
                        className={
                            parseInt(query) === cookies.user.favorite_list ||
                            !isEditable
                                ? "library-title-disabled"
                                : "library-title"
                        }
                        disabled={!isEditable}
                        ref={trackTitleRef}
                    ></input>

                    {parseInt(query) === cookies.user.favorite_list ? (
                        <></>
                    ) : (
                        <>
                            {isEditable ? (
                                <div onClick={handleTitleChange}>
                                    <AiFillSave fontSize={"2rem"} />
                                </div>
                            ) : (
                                <div onClick={handleIsEditable}>
                                    <AiFillEdit fontSize={"2rem"} />
                                </div>
                            )}

                            <div onClick={handleDelete}>
                                <AiFillDelete fontSize={"2rem"} />
                            </div>
                        </>
                    )}
                </div>
                <div className="library-main-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Song</th>
                                <th>Artist</th>
                                <th>Album</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                isLibraryLoaded ? (
                                    library
                                        .get(parseInt(query))
                                        .musics.map((item, index) => {
                                            console.log(
                                                isCurrentLibrary,
                                                index === playlistIndex
                                            );
                                            return (
                                                <tr
                                                    className={`library-row ${
                                                        isCurrentLibrary &&
                                                        index === playlistIndex
                                                            ? "selected-library-row"
                                                            : ""
                                                    }`}
                                                    key={item?.id}
                                                >
                                                    <td
                                                        className="library-td"
                                                        onClick={() =>
                                                            navigate(
                                                                `/search/result/search/${item.music?.title}`
                                                            )
                                                        }
                                                    >
                                                        {item.music?.title}
                                                    </td>
                                                    <td
                                                        className="library-td"
                                                        onClick={() =>
                                                            navigate(
                                                                `/search/result/search/${item.music?.album}`
                                                            )
                                                        }
                                                    >
                                                        {item.music?.artist}
                                                    </td>
                                                    <td
                                                        className="library-td"
                                                        onClick={() =>
                                                            handleAlbumSearch(
                                                                item.music.apiId
                                                            )
                                                        }
                                                    >
                                                        {item.music?.album}
                                                    </td>
                                                    <td
                                                        className="song-play library-icon"
                                                        onClick={() =>
                                                            handleLibraryEvent(index)
                                                        }
                                                    >
                                                        <BsFillPlayFill />
                                                    </td>
                                                    <td
                                                        className="heart library-icon"
                                                        onClick={
                                                            likedMusiclist.has(
                                                                item.music.apiId
                                                            )
                                                                ? () =>
                                                                      removeMusic(
                                                                          item.music
                                                                              .apiId,
                                                                          cookies
                                                                              .user
                                                                              .favorite_list
                                                                      )
                                                                : () =>
                                                                      likeMusicFromLibrary(
                                                                          item.music
                                                                      )
                                                        }
                                                    >
                                                        {likedMusiclist.has(
                                                            item.music.apiId
                                                        ) ? (
                                                            <AiFillHeart />
                                                        ) : (
                                                            <AiOutlineHeart />
                                                        )}
                                                    </td>

                                                    <td
                                                        className="song-play library-icon"
                                                        onClick={() =>
                                                            removeMusic(
                                                                parseInt(
                                                                    item.music.apiId
                                                                ),
                                                                parseInt(query)
                                                            )
                                                        }
                                                    >
                                                        <AiOutlineMinus />
                                                    </td>
                                                </tr>
                                            );
                                        })
                                ) : (
                                    <></>
                                )
                                /* <tr>
                                <td>Fire</td>
                                <td>Imagine Dragons</td>
                                <td>Tune It Up</td>
                                <td className="song-play">
                                    <BsFillPlayFill />
                                </td>
                            </tr>
                            <tr>
                                <td>Fire</td>
                                <td>Imagine Dragons</td>
                                <td>Tune It Up</td>
                                <td className="song-play">
                                    <BsFillPlayFill />
                                </td>
                            </tr>
                            <tr>
                                <td>Fire</td>
                                <td>Imagine Dragons</td>
                                <td>Tune It Up</td>
                                <td className="song-play">
                                    <BsFillPlayFill />
                                </td>
                            </tr>
                            <tr>
                                <td>Fire</td>
                                <td>Imagine Dragons</td>
                                <td>Tune It Up</td>
                                <td className="song-play">
                                    <BsFillPlayFill />
                                </td>
                            </tr>
                            <tr>
                                <td>Fire</td>
                                <td>Imagine Dragons</td>
                                <td>Tune It Up</td>
                                <td className="song-play">
                                    <BsFillPlayFill />
                                </td>
                            </tr>
                            <tr>
                                <td>Fire</td>
                                <td>Imagine Dragons</td>
                                <td>Tune It Up</td>
                                <td className="song-play">
                                    <BsFillPlayFill />
                                </td>
                            </tr> */
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
