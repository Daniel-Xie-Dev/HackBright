import React from "react";
import "./library.css";
import { BsFillPlayFill } from "react-icons/bs";
import { useAppContext } from "../../GlobalContext";

export default function Library() {
    const { setPlaylist, library, setPlaylistIndex, setLibrary } = useAppContext();

    const handleLibraryEvent = (index) => {
        setPlaylist(library);
        setPlaylistIndex(index);
    };

    // console.log(library);

    return (
        <>
            <div className="playlist">
                <div className="explore-header-card">
                    <h1 className="main-title">Playlist</h1>
                </div>
                <div className="playlist-main-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Song</th>
                                <th>Artist</th>
                                <th>Album</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                library.map((item, index) => {
                                    // console.log(item);
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.title}</td>
                                            <td>{item.artist.name}</td>
                                            <td>{item.album.title}</td>
                                            <td
                                                className="song-play"
                                                onClick={() =>
                                                    handleLibraryEvent(index)
                                                }
                                            >
                                                <BsFillPlayFill />
                                            </td>
                                        </tr>
                                    );
                                })

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
