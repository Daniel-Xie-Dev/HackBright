import React, { useEffect } from "react";
import "./library.css";

import { BsFillPlayFill, BsHeartFill } from "react-icons/bs";
import { useAppContext } from "../../GlobalContext";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Library() {
    const { query } = useParams();
    const {
        setPlaylist,
        library,
        setPlaylistIndex,
        likedMusiclist,
        setLikedMusiclist,
        setLibrary,
    } = useAppContext();

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
        setPlaylist(library.get(query));
        setPlaylistIndex(index);
    };

    // useEffect(() => {
    //     const getLibraryByPlay
    // })

    return (
        <>
            <div className="library">
                <div className="explore-header-card">
                    <h1 className="main-title">Library</h1>
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
                                library instanceof Map &&
                                library.get(query) !== undefined ? (
                                    library.get(query).map((item, index) => {
                                        // console.log(item);
                                        return (
                                            <tr
                                                className="library-row"
                                                key={item.id}
                                            >
                                                <td className="library-td">
                                                    {item.title}
                                                </td>
                                                <td className="library-td">
                                                    {item.artist.name}
                                                </td>
                                                <td className="library-td">
                                                    {item.album.title}
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
                                                        handleMusicUnlike(item.id)
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
