import React, { createContext, useContext, useRef, useState } from "react";
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
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef();
    const [isRepeating, setIsRepeating] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

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
                            return new Set(prevSet.add(response.data.music.apiId));
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

    const handleLoadedMetaData = () => {
        setDuration(Math.floor(audioRef.current.duration));
    };

    const handleMusicPlaying = () => {
        // console.log(audioRef.current.currentSrc);
        setCurrentTime(Math.floor(audioRef.current.currentTime));
    };

    const handleNextPrevious = (index) => {
        let size = 0;
        if (isMusicSearch === 1) size = playlist.length;
        else if (isMusicSearch === 2) size = playlist.musics?.length;

        setPlaylistIndex((initialValue) => {
            const playlistIndex =
                initialValue + index < 0 ? size - 1 : (initialValue + index) % size;
            console.log(initialValue);
            return playlistIndex;
        });
    };

    const contextValue = {
        playlist,
        setPlaylist,
        library,
        isMusicSearch,
        isPlaying,
        setIsPlaying,
        setIsMusicSearch,
        setLibrary,
        setShowModal,
        setData,
        playlistIndex,
        setPlaylistIndex,
        likedMusiclist,
        setLikedMusiclist,
        audioRef,
        isRepeating,
        setIsRepeating,
        currentTime,
        setCurrentTime,
        duration,
        handleNextPrevious,
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
                                <h3 className="modal-playlist-title">
                                    {library.get(keys).trackTitle}
                                </h3>
                            </div>
                        );
                    })}
                </div>
            </div>

            <audio
                autoPlay={true}
                className="MusicPlayerAudio"
                ref={audioRef}
                loop={isRepeating}
                onTimeUpdate={handleMusicPlaying}
                onLoadedMetadata={handleLoadedMetaData}
                onEnded={() => handleNextPrevious(1)}
            >
                <source type="audio/mp3" />
                Your browser does not support audio element.
            </audio>

            {children}
        </AppContext.Provider>
    );
}
