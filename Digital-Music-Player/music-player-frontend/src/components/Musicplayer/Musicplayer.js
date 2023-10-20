import React, { useEffect, useState } from "react";
import "./musicPlayer.css";
import {
    // AiOutlineLike,
    AiFillStepBackward,
    AiFillStepForward,
    AiFillPlayCircle,
    AiFillPauseCircle,
    AiOutlineHeart,
    AiFillHeart,
    AiOutlinePlus,
    AiOutlineClose,
} from "react-icons/ai";

import { BsVolumeMute, BsVolumeUpFill, BsVolumeDownFill } from "react-icons/bs";

import { MdQueueMusic, MdReplayCircleFilled } from "react-icons/md";
import axios from "axios";
import { useAppContext } from "../../GlobalContext";
import { useCookies } from "react-cookie";
import {
    addMusicTrackToTracklist,
    removeMusicTrackFromList,
} from "../../api/MusictrackAPI";

function MusicPlayer() {
    const [currentMusic, setCurrentMusic] = useState({});
    const [volume, setVolume] = useState(100);
    const [showPlaylist, setShowPlaylist] = useState(false);
    const [cookies] = useCookies();

    const {
        playlist,
        playlistIndex,
        setPlaylistIndex,
        isMusicSearch,
        setIsMusicSearch,
        library,
        isPlaying,
        setIsPlaying,
        setLibrary,
        setShowModal,
        setData,
        setPlaylist,
        likedMusiclist,
        setLikedMusiclist,
        audioRef,
        isRepeating,
        setIsRepeating,
        currentTime,
        setCurrentTime,
        duration,
        handleNextPrevious,
    } = useAppContext();

    const likeMusicHas = likedMusiclist.has(
        playlist?.[playlistIndex]?.id ||
            playlist?.musics?.[playlistIndex]?.rapid?.id ||
            playlist?.musics?.[playlistIndex]?.music?.apiId
    );

    // const isPlaylistEmpty = playlist.length === 0;
    // console.log(library);

    // console.log(likedMusiclist)
    const handleVolumeChange = (e) => {
        console.log(e.target.value);
        if (audioRef.current) {
            audioRef.current.volume = e.target.value / 100;
            setVolume(parseInt(e.target.value));
        }
    };

    const handlePlayPause = () => {
        if (audioRef.current && audioRef.current.src) {
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

    const handleMusicTimestamp = (e) => {
        audioRef.current.currentTime = parseInt(e.target.value);
        setCurrentTime(parseInt(e.target.value));
        // console.log(e.target.value);
    };

    const getPlaylist = () => {
        if (playlist instanceof Array) {
            return playlist;
        } else {
            return playlist.musics;
        }
    };

    const renderVolumeButton = () => {
        if (volume === 0) return <BsVolumeMute />;
        else if (volume <= 50) return <BsVolumeDownFill />;
        else return <BsVolumeUpFill />;
    };

    const handleMusicModal = async () => {
        const apiId =
            playlist?.musics?.[playlistIndex]?.music?.apiId ||
            playlist?.[playlistIndex].id;

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
            setIsPlaying(true);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    <>
                        <div className="image-container">
                            <img
                                src={
                                    isMusicSearch > 0
                                        ? playlist?.[playlistIndex]?.album?.cover ||
                                          playlist?.musics?.[playlistIndex]?.rapid
                                              ?.album?.cover
                                        : ""
                                }
                                alt=""
                            />
                        </div>
                        <div className="song-description">
                            <p className="song-title">
                                {isMusicSearch > 0
                                    ? playlist?.[playlistIndex]?.title ||
                                      playlist?.musics?.[playlistIndex]?.rapid?.title
                                    : ""}
                            </p>
                            <p className="artist">
                                {isMusicSearch > 0
                                    ? playlist?.[playlistIndex]?.artist?.name ||
                                      playlist?.musics?.[playlistIndex]?.rapid
                                          ?.artist?.name
                                    : ""}
                            </p>
                        </div>

                        <div
                            className="playlist-shortcut"
                            style={{
                                visibility: showPlaylist ? "visible" : "hidden",
                            }}
                        >
                            <div className="playlist-shortcut-header">
                                <h5
                                    className="playlist-title"
                                    style={{ margin: 0, padding: 0 }}
                                >
                                    Current Playlist
                                </h5>
                                <button
                                    className="playlist-close"
                                    onClick={() => setShowPlaylist(false)}
                                >
                                    <AiOutlineClose />
                                </button>
                            </div>
                            <div className="playlist-shortcut-container">
                                <table className="playlist-table">
                                    {getPlaylist().map((item, index) => {
                                        return (
                                            <tr
                                                onClick={() =>
                                                    setPlaylistIndex(index)
                                                }
                                                className={`playlist-row ${
                                                    playlistIndex === index
                                                        ? "selected-row"
                                                        : ""
                                                }`}
                                            >
                                                <td>
                                                    {item?.title ||
                                                        item?.music?.title}
                                                </td>

                                                <td>
                                                    {item?.artist?.name ||
                                                        item?.music?.artist}
                                                </td>

                                                <td>
                                                    <AiFillPlayCircle />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </table>
                            </div>
                        </div>

                        {playlist.length !== 0 ? (
                            <i
                                className="playlist-icons"
                                onClick={() => {
                                    setShowPlaylist((prevVal) => {
                                        return !prevVal;
                                    });
                                }}
                            >
                                <MdQueueMusic />
                            </i>
                        ) : (
                            <></>
                        )}
                    </>

                    {/* <div className="playlist-shortcut">playlist shortcut</div> */}
                </div>
            </div>

            <div className="progress-controller">
                <div className="control-buttons">
                    <i className={likeMusicHas ? "activated-button" : ""}>
                        {likeMusicHas ? (
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
                    <i className={isRepeating ? "activated-button" : ""}>
                        <MdReplayCircleFilled onClick={handleRepeat} />
                    </i>

                    <i>
                        <AiOutlinePlus
                            onClick={
                                audioRef?.current?.src === ""
                                    ? undefined
                                    : handleMusicModal
                            }
                        />
                    </i>
                    <div className="progress-container">
                        <span className="progress-span">{currentTime}</span>
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
                        <span className="progress-span">{duration}</span>
                    </div>

                    <div className="volume-container">
                        <div className="volume-icon">{renderVolumeButton()}</div>

                        <input
                            className="slider"
                            type="range"
                            value={volume}
                            onChange={handleVolumeChange}
                            min={0}
                            max={100}
                            step={1}
                        ></input>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MusicPlayer;
