import React, { useEffect, useRef, useState } from "react";
import "./library.css";
import {
    AiFillDelete,
    AiFillEdit,
    AiFillSave,
    AiOutlineMinus,
} from "react-icons/ai";
import { BsFillPlayFill, BsHeartFill } from "react-icons/bs";
import { useAppContext } from "../../GlobalContext";
import axios from "axios";
import { removeMusicLibrary } from "../../api/MusictrackAPI";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Library() {
    const { query } = useParams();
    const [cookies] = useCookies();
    const {
        setPlaylist,
        library,
        setPlaylistIndex,
        likedMusiclist,
        setLikedMusiclist,
        setLibrary,
    } = useAppContext();

    const [isEditable, setIsEditable] = useState(false);
    const trackTitleRef = useRef();
    const navigate = useNavigate();

    const handleIsEditable = () => setIsEditable(!isEditable);
    const isLibraryLoaded = library.get(parseInt(query)) !== undefined;

    const removeMusic = async (apiId) => {
        const response = await removeMusicLibrary(
            apiId,
            library.get(parseInt(query))?.musics
        );
        console.log(response);
        if (response !== undefined) {
            const object = library
                .get(parseInt(query))
                ?.musics.find((item) => item.music.apiId === response);
            if (object !== undefined) {
                setLibrary((prevLibrary) => {
                    const musics = library
                        .get(parseInt(query))
                        ?.musics.filter((item) => item.music.apiId !== response);
                    console.log(musics);
                    let object = prevLibrary.get(parseInt(query));
                    object = { ...object, musics };
                    prevLibrary.set(parseInt(query), object);
                    return new Map(prevLibrary);
                });

                if (cookies.user.favorite_list === parseInt(query)) {
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
                            parseInt(query) === cookies.user.favorite_list
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
                                            // console.log(item);
                                            return (
                                                <tr
                                                    className="library-row"
                                                    key={item?.id}
                                                >
                                                    <td className="library-td">
                                                        {item.music?.title}
                                                    </td>
                                                    <td className="library-td">
                                                        {item.music?.artist}
                                                    </td>
                                                    <td className="library-td">
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
                                                        onClick={() =>
                                                            removeMusic(
                                                                parseInt(
                                                                    item.music.apiId
                                                                )
                                                            )
                                                        }
                                                    >
                                                        <BsHeartFill />
                                                    </td>

                                                    <td
                                                        className="song-play library-icon"
                                                        onClick={() =>
                                                            removeMusic(
                                                                parseInt(
                                                                    item.music.apiId
                                                                )
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
