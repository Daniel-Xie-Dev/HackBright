import React, { useEffect, useRef, useState } from "react";
import "./musicPlayer.css";
import {
    AiOutlineLike,
    AiFillStepBackward,
    AiFillStepForward,
    AiFillPlayCircle,
    AiFillPauseCircle,
} from "react-icons/ai";

import { MdReplayCircleFilled } from "react-icons/md";
import axios from "axios";
import { useAppContext } from "../../GlobalContext";

const options = {
    method: "GET",
    url: "https://deezerdevs-deezer.p.rapidapi.com/search",
    params: { q: "pokemon" },
    headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
        "X-RapidAPI-Host": process.env.REACT_APP_HOST,
    },
};

function MusicPlayer() {
    const audioRef = useRef();
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isRepeating, setIsRepeating] = useState(false);

    const { playlist, playlistIndex, setPlaylistIndex } = useAppContext();

    // console.log(playlistIndex);
    const handleVolumeChange = (e) => {
        audioRef.current.volume = e.target.value / 100;
    };

    const handlePlayPause = () => {
        setIsPlaying((value) => {
            value ? audioRef.current.pause() : audioRef.current.play();
            return !value;
        });
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
        console.log(audioRef.current.currentSrc);
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

    return (
        <div className="music-player">
            <div className="song-bar">
                <div className="song-infos">
                    {playlist.length !== 0 ? (
                        <>
                            <div className="image-container">
                                <img
                                    src={playlist[playlistIndex].album.cover}
                                    alt=""
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
                    <i>
                        <AiOutlineLike />
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
