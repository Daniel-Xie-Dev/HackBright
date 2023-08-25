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
import axios from "axios";

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
    const [playlist, setPlaylist] = useState([]);

    const handleVolumeChange = (e) => {
        audioRef.current.volume = e.target.value / 100;
    };

    const handleLoadedMetaData = () => {
        // console.log(Math.ceil(audioRef.current.duration));
        console.log("hello");
        setDuration(Math.floor(audioRef.current.duration));

        // audioRef.current.play();
    };

    const handleMusicMouseUp = (e) => {
        setPlay(() => {
            return true;
        });
        audioRef.current.play();
    };

    const handleMusicTimestamp = (e) => {
        setPlay(false);
        audioRef.current.pause();
        audioRef.current.currentTime = parseInt(e.target.value);
        setCurrentTime(parseInt(e.target.value));
        // console.log(e.target.value);
    };

    const handleMusicPlaying = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const handlePausePlay = () => {
        play ? audioRef.current.pause() : audioRef.current.play();
        setPlay(!play);
    };

    const handleRepeat = () => {
        audioRef.current.loop = !repeat;
        setRepeat(!repeat);
    };

    // useEffect(() => {
    //     audioRef.current.addEventListener("play", handleTimeStampEvent);

    //     return () => {
    //         audioRef.current.removeEventListener("play", handleTimeStampEvent);
    //     };
    // });

    const handleNextPrevious = (index) => {
        setPlay(() => {
            return false;
        });
        if (int + index >= playlist.length) {
            setInt(0);
            audioRef.current.src = playlist[0].preview;
        } else if (int + index < 0) {
            setInt(playlist.length - 1);
            audioRef.current.src = playlist[playlist.length - 1].preview;
        } else {
            setInt(int + index);
            audioRef.current.src = playlist[int + index].preview;
        }
        // setPlay(true);
    };

    useEffect(() => {
        const getSongs = async () => {
            const result = await axios.request(options);
            // console.log(result.data.data);
            setPlaylist(() => {
                audioRef.current.src = result.data.data[0].preview;
                return result.data.data;
            });
        };

        getSongs();
    }, []);

    return (
        <div className="MusicPlayer">
            <div className="MusicPlayerContainer">
                <audio
                    // autoPlay
                    className="MusicPlayerAudio"
                    ref={audioRef}
                    loop={repeat}
                    onTimeUpdate={handleMusicPlaying}
                    onLoadedMetadata={handleLoadedMetaData}
                    onEnded={() => handleNextPrevious(1)}
                >
                    {/* {console.log(playlist)} */}
                    <source type="audio/mp3"></source>
                    Your browser does not support audio element.
                </audio>

                <input
                    type="range"
                    min={0}
                    max={duration}
                    value={currentTime}
                    step={1}
                    onChange={handleMusicTimestamp}
                    onMouseUp={handleMusicMouseUp}
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
