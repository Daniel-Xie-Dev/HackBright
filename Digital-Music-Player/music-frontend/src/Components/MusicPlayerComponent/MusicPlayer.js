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
    const [repeat, setRepeat] = useState(false);

    const [int, setInt] = useState(0);

    const handleVolumeChange = (e) => {
        audioRef.current.volume = e.target.value / 100;
    };

    const handleMusicTimestamp = (e) => {
        audioRef.current.currentTime =
            Math.floor(audioRef.current.duration) * (e.target.value / 100);
    };

    const handlePausePlay = () => {
        play ? audioRef.current.pause() : audioRef.current.play();
        setPlay(!play);
    };

    const handleRepeat = () => {
        audioRef.current.loop = repeat ? false : true;
        setRepeat(!repeat);
    };

    const handleTimeStampEvent = () => {
        console.log("is playing");
    };

    useEffect(() => {
        audioRef.current.addEventListener("play", handleTimeStampEvent);

        return () => {
            audioRef.current.removeEventListener("play", handleTimeStampEvent);
        };
    });

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
                <audio autoPlay className="MusicPlayerAudio" ref={audioRef}>
                    <source src={tracks[0]} type="audio/mp3"></source>
                    Your browser does not support audio element.
                </audio>

                <input
                    type="range"
                    onChange={(e) => handleMusicTimestamp(e)}
                ></input>
                <input
                    type="range"
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
