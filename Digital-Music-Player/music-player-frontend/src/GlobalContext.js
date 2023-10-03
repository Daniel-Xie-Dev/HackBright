import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import "./shared/globalStyles.css";
import { AiOutlineClose } from "react-icons/ai";
import { useCookies } from "react-cookie";

const AppContext = createContext();

export function useAppContext() {
    return useContext(AppContext);
}

export function AppProvider({ children }) {
    const [cookies] = useCookies();
    const [playlist, setPlaylist] = useState([]);
    const [isMusicSearch, setIsMusicSearch] = useState(0);
    const [library, setLibrary] = useState(new Map());
    const [showModal, setShowModal] = useState(false);
    const [playlistIndex, setPlaylistIndex] = useState(0);
    const [data, setData] = useState({});
    const [likedMusiclist, setLikedMusiclist] = useState(new Set());

    const handleAdd = async (key) => {
        const musicTrack = {
            apiId: data.id,
            title: data.title,
            artist: data.artist.name,
            album: data.album.title,
        };

        await axios
            .post(`http://localhost:8080/api/v1/musicTracks/add/${key}`, {
                ...musicTrack,
            })
            .then((response) => {
                if (response.data) {
                    setLibrary((prevLibrary) => {
                        let object = prevLibrary.get(key);

                        if (
                            object.musics.length !== 0 &&
                            object.musics[object.musics.length - 1].id ===
                                response.data.id
                        ) {
                            return prevLibrary;
                        }
                        const musics = [...object.musics, response.data];
                        object.musics = musics;
                        prevLibrary.set(key, object);
                        return new Map(prevLibrary);
                    });

                    console.log(likedMusiclist);
                    console.log(key === cookies.user.favorite_list);
                    if (cookies.user.favorite_list === key) {
                        setLikedMusiclist((prevSet) => {
                            return new Set(prevSet.add(response.music.apiId));
                        });
                    }

                    setShowModal(false);
                }
            })
            .catch((error) => {
                console.log(error);
                setShowModal(false);
            });
    };

    const contextValue = {
        playlist,
        setPlaylist,
        library,
        isMusicSearch,
        setIsMusicSearch,
        setLibrary,
        setShowModal,
        setData,
        playlistIndex,
        setPlaylistIndex,
        likedMusiclist,
        setLikedMusiclist,
    };

    return (
        <AppContext.Provider value={contextValue}>
            <div
                className={
                    showModal
                        ? "modal-div modal-div-visible"
                        : "modal-div modal-div-invisible"
                }
            >
                <div className="modal-bar">
                    <div className="modal-close" onClick={() => setShowModal(false)}>
                        <AiOutlineClose />
                    </div>
                </div>
                <div className="modal-playlists">
                    {[...library.keys()].map((keys) => {
                        return (
                            <div
                                id={keys}
                                className="modal-library"
                                onClick={() => handleAdd(keys)}
                            >
                                <h3>{library.get(keys).trackTitle}</h3>
                            </div>
                        );
                    })}
                </div>
            </div>

            {children}
        </AppContext.Provider>
    );
}
