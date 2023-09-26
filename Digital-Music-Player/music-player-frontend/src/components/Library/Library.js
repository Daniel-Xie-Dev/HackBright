import React, { useEffect, useRef, useState } from "react";
import "./library.css";
import { AiFillDelete, AiFillEdit, AiFillSave } from "react-icons/ai";
import { BsFillPlayFill, BsHeartFill } from "react-icons/bs";
import { useAppContext } from "../../GlobalContext";
import axios from "axios";
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

    const handleMusicUnlike = async (id) => {
        await axios
            .delete(
                `http://localhost:8080/api/v1/liked-music/deleteLikedMusic/${likedMusiclist.get(
                    id
                )}`,
                {
                    headers: { "Content-Type": "application/json" },
                }
            )
            .then((response) => {
                if (response.data) {
                    // console.log(response.data);
                    setLikedMusiclist((prevMap) => {
                        prevMap.delete(id);
                        return new Map(prevMap);
                    });
                    setLibrary((prevLibrary) => {
                        let temp = prevLibrary
                            .get("favorite")
                            .filter((item) => item.id !== id);
                        prevLibrary.set("favorite", temp);

                        return new Map(prevLibrary);
                    });
                }
            });
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
                trackTitleRef.current.value = "";
                setIsEditable(false);
            })
            .catch((err) => console.log(err));
    };

    const handleDelete = async () => {
        await axios
            .delete(`http://localhost:8080/api/v1/tracklists/${query}`, {
                headers: { "Content-Type": "application/json" },
            })
            .then((response) => {
                navigate("/playlist");
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        const getLibraryById = async () => {
            axios.get();
        };

        if (query !== "favorite") {
            // getLibraryById();
        }
    }, []);

    return (
        <>
            <div className="library">
                <div className="explore-header-card">
                    <input
                        placeholder="Insert library Title Here"
                        className={
                            query === cookies.user.favorite_list
                                ? "library-title"
                                : "library-title-disabled"
                        }
                        disabled={!isEditable}
                        ref={trackTitleRef}
                    ></input>

                    {parseInt(query) === cookies.user.favorite_list ? (
                        <></>
                    ) : (
                        <>
                            <div onClick={handleTitleChange}>
                                <AiFillSave fontSize={"2rem"} />
                            </div>
                            <div onClick={handleIsEditable}>
                                <AiFillEdit fontSize={"2rem"} />
                            </div>
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
                                                    key={item.id}
                                                >
                                                    <td className="library-td">
                                                        {item.music.title}
                                                    </td>
                                                    <td className="library-td">
                                                        {item.music.artist}
                                                    </td>
                                                    <td className="library-td">
                                                        {item.music.album}
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
                                                            handleMusicUnlike(
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        <BsHeartFill />
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
