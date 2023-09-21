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

function MusicPlayer() {
    const audioRef = useRef();
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isRepeating, setIsRepeating] = useState(false);
    const [cookies] = useCookies();

    const {
        playlist,
        playlistIndex,
        setPlaylistIndex,
        setLibrary,
        likedMusiclist,
        setLikedMusiclist,
    } = useAppContext();

    const isPlaylistEmpty = playlist.length === 0;

    // console.log(likedMusiclist)
    // const handleVolumeChange = (e) => {
    //     audioRef.current.volume = e.target.value / 100;
    // };

    const handlePlayPause = () => {
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
        setPlaylistIndex((initialValue) => {
            const playlistIndex =
                initialValue + index < 0
                    ? playlist.length - 1
                    : (initialValue + index) % playlist.length;
            audioRef.current.src = playlist[playlistIndex].preview;
            return playlistIndex;
        });
    };

    // const isLiked = () => {
    //     if (isPlaylistEmpty) {
    //         return false;
    //     }

    //     for (let likedMusicObject of likedMusiclist) {
    //         if (likedMusicObject.api === playlist[playlistIndex].id) {
    //             return true;
    //         }
    //     }
    //     return false;
    // };
    console.log(currentTime);
    const handleMusicLike = async (musicObject) => {
        if (isPlaylistEmpty) return;
        if (likedMusiclist.has(musicObject.id)) return;
        console.log(likedMusiclist.has(musicObject.id));
        // console.log(musicObject);
        await axios
            .post(
                `http://localhost:8080/api/v1/liked-music/addLikedMusic/${cookies.user.id}`,
                {
                    api: `${playlist[playlistIndex].id}`,
                },
                {
                    headers: { "Content-Type": "application/json" },
                }
            )
            .then((response) => {
                if (response.data) {
                    setLibrary((prevLibrary) => {
                        let tempMap = prevLibrary.get("favorite");
                        if (
                            tempMap.length !== 0 &&
                            tempMap[tempMap.length - 1].id !== musicObject.id
                        ) {
                            prevLibrary.set("favorite", [...tempMap, musicObject]);
                        }
                        console.log(prevLibrary.get("favorite"));

                        return new Map(prevLibrary);
                    });
                    setLikedMusiclist((prevMap) => {
                        prevMap.set(musicObject.id, response.data.id);
                        return new Map(prevMap);
                    });
                }
            })
            .catch((error) => console.log(error));

        // console.log("ASDFADSADFSSf")
    };

    const handleMusicUnlike = async () => {
        if (isPlaylistEmpty) return;
        const id = playlist[playlistIndex].id;

        // console.log(id);
        // console.log(likedMusiclist);

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

    useEffect(() => {
        if (playlist.length !== 0) {
            audioRef.current.src = playlist[playlistIndex].preview;
        }
    }, [playlist, playlistIndex]);

    return (
        <div className="music-player">
            <div className="song-bar">
                <div className="song">
                    {playlist.length !== 0 ? (
                        <>
                            <div className="image-container">
                                <img
                                    src={playlist[playlistIndex].album.cover}
                                    alt="alt"
                                />
                            </div>
                            <div className="song-description">
                                <p className="song-title">
                                    {playlist[playlistIndex].title}
                                </p>
                                <p className="artist">
                                    {playlist[playlistIndex].artist.name}
                                </p>
                            </div>
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
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </div>

            <div className="progress-controller">
                <div className="control-buttons">
                    <i className="like-button">
                        {!isPlaylistEmpty &&
                        likedMusiclist.has(playlist[playlistIndex].id) ? (
                            <AiFillHeart onClick={handleMusicUnlike} />
                        ) : (
                            <AiOutlineHeart
                                onClick={() =>
                                    handleMusicLike(playlist[playlistIndex])
                                }
                            />
                        )}
                    </i>
                    <i>
                        <AiFillStepBackward
                            onClick={
                                isPlaylistEmpty
                                    ? undefined
                                    : () => handleNextPrevious(-1)
                            }
                        />
                    </i>
                    <i className="play-pause">
                        {isPlaying ? (
                            <AiFillPauseCircle onClick={handlePlayPause} />
                        ) : (
                            <AiFillPlayCircle onClick={handlePlayPause} />
                        )}
                    </i>
                    <i>
                        <AiFillStepForward
                            onClick={
                                isPlaylistEmpty
                                    ? undefined
                                    : () => handleNextPrevious(1)
                            }
                        />
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
