import React, { useEffect, useRef, useState } from "react";
import "./musicPlayer.css";
import {
    // AiOutlineLike,
    AiFillStepBackward,
    AiFillStepForward,
    AiFillPlayCircle,
    AiFillPauseCircle,
    AiOutlineHeart,
    AiFillHeart,
} from "react-icons/ai";

import { MdReplayCircleFilled } from "react-icons/md";
import axios from "axios";
import { useAppContext } from "../../GlobalContext";
import { useCookies } from "react-cookie";
import {
    addMusicTrackToTracklist,
    removeMusicTrackFromList,
} from "../../api/MusictrackAPI";

function MusicPlayer() {
    const audioRef = useRef();
    const [currentMusic, setCurrentMusic] = useState({});
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isRepeating, setIsRepeating] = useState(false);
    const [cookies] = useCookies();

    const {
        playlist,
        playlistIndex,
        setPlaylistIndex,
        isMusicSearch,
        setIsMusicSearch,
        library,
        setLibrary,
        setPlaylist,
        likedMusiclist,
        setLikedMusiclist,
    } = useAppContext();

    // const isPlaylistEmpty = playlist.length === 0;
    // console.log(library);

    // console.log(likedMusiclist)
    // const handleVolumeChange = (e) => {
    //     audioRef.current.volume = e.target.value / 100;
    // };

    const handlePlayPause = () => {
        if (audioRef.current.src === undefined) {
            return;
        }
        if (audioRef.current) {
            setIsPlaying((value) => {
                value ? audioRef.current.pause() : audioRef.current.play();
                return !value;
            });
        }
    };

    const handleRepeat = () => {
        setIsRepeating((value) => {
            audioRef.current.loop = !value;
            return !value;
        });
    };

    const handleMusicMouseDown = () => {
        setIsPlaying(false);
        audioRef.current.pause();
    };

    const handleMusicMouseUp = () => {
        setIsPlaying(true);
        audioRef.current.play();
    };

    const handleLoadedMetaData = () => {
        setDuration(Math.floor(audioRef.current.duration));
    };

    const handleMusicTimestamp = (e) => {
        audioRef.current.currentTime = parseInt(e.target.value);
        setCurrentTime(parseInt(e.target.value));
        // console.log(e.target.value);
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

    useEffect(() => {
        const getMusicFromRapid = async () => {
            await axios
                .get(
                    `https://deezerdevs-deezer.p.rapidapi.com/track/${playlist.musics[playlistIndex].music.apiId}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
                            "X-RapidAPI-Host": process.env.REACT_APP_HOST,
                        },
                    }
                )
                .then((response) => {
                    audioRef.current.src = response.data.preview;

                    setPlaylist((prevPlaylist) => {
                        prevPlaylist.musics[playlistIndex]["rapid"] = response.data;
                        return { ...prevPlaylist };
                    });
                })
                .catch((error) => console.log(error));
        };

        if (playlist.length !== 0) {
            // console.log(playlist);
            if (playlist.musics === undefined) {
                setIsMusicSearch(1);
                console.log("From Search");
                audioRef.current.src = playlist[playlistIndex].preview;
                setCurrentMusic(playlist[playlistIndex]);
            } else if (playlist.musics[playlistIndex]?.rapid === undefined) {
                setIsMusicSearch(2);
                setCurrentMusic(playlist.musics[playlistIndex]);
                console.log("From library");
                getMusicFromRapid();
            } else {
                setIsMusicSearch(2);
                setCurrentMusic(playlist.musics[playlistIndex]);
                audioRef.current.src = playlist.musics[playlistIndex]?.rapid.preview;
            }
        }
    }, [playlist, playlistIndex]);

    const addMusic = async (trackId) => {
        console.log(currentMusic);
        if (isMusicSearch === 0) return;
        const response = await addMusicTrackToTracklist(
            trackId,
            isMusicSearch,
            currentMusic
        );
        console.log(response);

        if (response !== null) {
            setLibrary((prevLibrary) => {
                let object = prevLibrary.get(trackId);
                if (
                    object.musics.length !== 0 &&
                    object.musics[object.musics.length - 1].id === response.id
                )
                    return prevLibrary;
                const musics = [...object.musics, response];
                object.musics = musics;
                prevLibrary.set(trackId, object);
                console.log(prevLibrary.get(trackId).musics);
                return new Map(prevLibrary);
            });
            setLikedMusiclist((prevSet) => {
                return new Set(prevSet.add(response.music.apiId));
            });
        }
    };

    const removeMusic = async (trackId) => {
        console.log(currentMusic);

        const response = await removeMusicTrackFromList(
            isMusicSearch,
            library.get(trackId)?.musics,
            currentMusic
        );

        // console.log(response);
        if (response !== undefined) {
            const object = library
                .get(trackId)
                ?.musics.find((item) => item.music.apiId === response);
            if (object !== undefined) {
                setLibrary((prevLibrary) => {
                    const musics = library
                        .get(trackId)
                        ?.musics.filter((item) => item.music.apiId !== response);
                    console.log(musics);
                    let object = prevLibrary.get(trackId);
                    object = { ...object, musics };
                    prevLibrary.set(trackId, object);

                    console.log(prevLibrary.get(trackId).musics);
                    return new Map(prevLibrary);
                });
                setLikedMusiclist((prevSet) => {
                    prevSet.delete(object.music.apiId);
                    return new Set(prevSet);
                });
            }
        }
    };

    return (
        <div className="music-player">
            <div className="song-bar">
                <div className="song">
                    {playlist.length !== 0 ? (
                        <>
                            <div className="image-container">
                                <img
                                    src={
                                        isMusicSearch > 0
                                            ? isMusicSearch === 1
                                                ? playlist?.[playlistIndex]?.album
                                                      ?.cover
                                                : playlist?.musics?.[playlistIndex]
                                                      ?.rapid?.album?.cover
                                            : ""
                                    }
                                    alt="alt"
                                />
                            </div>
                            <div className="song-description">
                                <p className="song-title">
                                    {isMusicSearch > 0
                                        ? isMusicSearch === 1
                                            ? playlist?.[playlistIndex]?.title
                                            : playlist?.musics?.[playlistIndex]
                                                  ?.rapid?.title
                                        : ""}
                                </p>
                                <p className="artist">
                                    {isMusicSearch > 0
                                        ? isMusicSearch === 1
                                            ? playlist?.[playlistIndex]?.artist?.name
                                            : playlist?.musics?.[playlistIndex]
                                                  ?.rapid?.artist?.name
                                        : ""}
                                </p>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                    <audio
                        autoPlay={isPlaying}
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
                </div>
            </div>

            <div className="progress-controller">
                <div className="control-buttons">
                    <i className="like-button">
                        {likedMusiclist.has(
                            isMusicSearch > 0
                                ? isMusicSearch === 1
                                    ? playlist?.[playlistIndex]?.id
                                    : playlist?.musics?.[playlistIndex]?.rapid?.id ||
                                      playlist?.musics?.[playlistIndex]?.music.apiId
                                : ""
                        ) ? (
                            <AiFillHeart
                                onClick={() =>
                                    removeMusic(cookies.user.favorite_list)
                                }
                            />
                        ) : (
                            <AiOutlineHeart
                                onClick={() => addMusic(cookies.user.favorite_list)}
                            />
                        )}
                    </i>
                    <i>
                        <AiFillStepBackward onClick={() => handleNextPrevious(-1)} />
                    </i>
                    <i className="play-pause">
                        {isPlaying ? (
                            <AiFillPauseCircle onClick={handlePlayPause} />
                        ) : (
                            <AiFillPlayCircle onClick={handlePlayPause} />
                        )}
                    </i>
                    <i>
                        <AiFillStepForward onClick={() => handleNextPrevious(1)} />
                    </i>
                    <i>
                        <MdReplayCircleFilled onClick={handleRepeat} />
                    </i>
                </div>
                <div className="progress-container">
                    <span>{currentTime}</span>
                    {/* <div className="progress-bar">
                            <div className="progress"></div>
                        </div> */}
                    <input
                        className="progress-bar"
                        type="range"
                        value={currentTime}
                        max={duration}
                        step={1}
                        onMouseDown={handleMusicMouseDown}
                        onChange={handleMusicTimestamp}
                        onMouseUp={handleMusicMouseUp}
                    ></input>
                    <span>{duration}</span>
                </div>
            </div>
        </div>
    );
}

export default MusicPlayer;
