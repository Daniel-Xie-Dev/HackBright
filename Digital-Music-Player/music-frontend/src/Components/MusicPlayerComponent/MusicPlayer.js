import React, { useEffect, useRef, useState } from "react";
import "./MusicPlayer.css";
import { Button } from "react-bootstrap";
import {
    ArrowLeftSquare,
    ArrowRightSquare,
    Pause,
    Play,
    Repeat,
    Repeat1,
} from "react-bootstrap-icons";

const tracks = [
    "https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg",
    "https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3",
];

function MusicPlayer() {
    const audioRef = useRef();
    const [play, setPlay] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [repeat, setRepeat] = useState(false);

    const [int, setInt] = useState(0);

    const handleVolumeChange = (e) => {
        audioRef.current.volume = e.target.value / 100;
    };

    const handleLoadedMetaData = () => {
        setDuration(audioRef.current.duration);
    }

    const handleMusicTimestamp = (e) => {
        audioRef.current.currentTime = parseInt(e.target.value);
        setCurrentTime(parseInt(e.target.value));
    };

    const handleMusicPlaying = () => {
        setCurrentTime(audioRef.current.currentTime);
    }

    const handlePausePlay = () => {
        play ? audioRef.current.pause() : audioRef.current.play();
        setPlay(!play);
    };

    const handleRepeat = () => {
        audioRef.current.loop = repeat ? false : true;
        setRepeat(!repeat);
    };

    // useEffect(() => {
    //     audioRef.current.addEventListener("play", handleTimeStampEvent);

    //     return () => {
    //         audioRef.current.removeEventListener("play", handleTimeStampEvent);
    //     };
    // });

    const handleNextPrevious = (index) => {
        if (int + index >= tracks.length) {
            setInt(0);
            audioRef.current.src = tracks[0];
        } else if (int + index < 0) {
            setInt(tracks.length - 1);
            audioRef.current.src = tracks[tracks.length - 1];
        } else {
            setInt(int + index);
            audioRef.current.src = tracks[int + index];
        }
    };

    return (
        <div className="MusicPlayer">
            <div className="MusicPlayerContainer">
                <audio autoPlay className="MusicPlayerAudio" ref={audioRef} onTimeUpdate={handleMusicPlaying}>
                    <source src={tracks[0]} type="audio/mp3"></source>
                    Your browser does not support audio element.
                </audio>

                <input
                    type="range"
                    min={0}
                    max={duration}
                    value={currentTime}
                    step={1}
                    onLoadedMetadata={handleLoadedMetaData}
                    onChange={(e) => handleMusicTimestamp(e)}
                ></input>
                <input
                    type="range"
                    min={0}
                    max={100}
                    defaultValue={100}
                    onChange={(e) => handleVolumeChange(e)}
                ></input>
                <Button onClick={() => handleNextPrevious(-1)}>
                    <ArrowLeftSquare></ArrowLeftSquare>
                </Button>

                <Button onClick={handlePausePlay}>
                    {play ? <Pause></Pause> : <Play></Play>}
                </Button>

                <Button onClick={() => handleNextPrevious(1)}>
                    <ArrowRightSquare></ArrowRightSquare>
                </Button>

                <Button onClick={handleRepeat}>
                    {repeat ? <Repeat1></Repeat1> : <Repeat></Repeat>}
                </Button>
            </div>
        </div>
    );
}

export default MusicPlayer;
