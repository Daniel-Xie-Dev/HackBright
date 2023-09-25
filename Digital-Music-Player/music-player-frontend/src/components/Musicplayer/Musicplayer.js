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
        library,
        setLibrary,
        likedMusiclist,
        setLikedMusiclist,
    } = useAppContext();

    const isPlaylistEmpty = playlist.length === 0;
    // console.log(library);

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

    useEffect(() => {
        if (playlist.length !== 0) {
            audioRef.current.src = playlist[playlistIndex].preview;
        }
    }, [playlist, playlistIndex]);

    const addMusicToTracklist = async (trackId) => {
        const musicTracks = playlist[playlistIndex];

        await axios
            .post(`http://localhost:8080/api/v1/musicTracks/add/${trackId}`, {
                apiId: musicTracks.id,
                title: musicTracks.title,
                artist: musicTracks.artist.name,
                album: musicTracks.album.title,
            })
            .then((response) => {
                if (response.data !== null) {
                    setLibrary((prevLibrary) => {
                        let object = prevLibrary.get(trackId);
                        const musics = [...object.musics, response.data];
                        object = { ...object, musics };
                        console.log(object);
                        prevLibrary.set(trackId, object);
                        console.log(library);
                        return new Map(prevLibrary);
                    });

                    setLikedMusiclist((prevSet) => {
                        return new Set(prevSet.add(musicTracks.id));
                    });
                }
            })
            .catch((err) => console.log(err));
    };

    const removeMusicTrackFromList = async () => {
        const musicTracks = playlist[playlistIndex];
        // console.log(library.get(cookies.user.favorite_list));
        const musicArray = library.get(cookies.user.favorite_list).musics;
        // const musicArray = 0;
        console.log(musicArray.length);

        for (let i = 0; i < musicArray.length; i++) {
            if (musicArray[i].music.apiId === musicTracks.id) {
                console.log(musicArray[i].apiId === musicTracks.id);
                await axios
                    .delete(
                        `http://localhost:8080/api/v1/musicTracks/delete/${musicArray[i].id}`
                    )
                    .then((response) => {
                        setLibrary((prevLibrary) => {
                            const musics = musicArray.filter(
                                (item) => item.music.apiId !== musicTracks.id
                            );

                            console.log(musics);
                            let object = prevLibrary.get(cookies.user.favorite_list);
                            object = { ...object, musics };
                            prevLibrary.set(cookies.user.favorite_list, object);
                            return new Map(prevLibrary);
                        });

                        setLikedMusiclist((prevSet) => {
                            prevSet.delete(musicTracks.id);
                            return new Set(prevSet);
                        });
                    })
                    .catch((error) => console.log(error));
                break;
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
                            <AiFillHeart onClick={removeMusicTrackFromList} />
                        ) : (
                            <AiOutlineHeart
                                onClick={() =>
                                    addMusicToTracklist(cookies.user.favorite_list)
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
