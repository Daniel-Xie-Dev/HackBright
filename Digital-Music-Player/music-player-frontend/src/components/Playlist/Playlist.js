import React, { useEffect, useRef, useState } from "react";
import "./playlist.css";
import { AiOutlinePlus } from "react-icons/ai";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

export default function Playlist() {
    const [cookies, setCookies] = useCookies();
    const [playlists, setPlaylists] = useState([]);
    const titleRef = useRef();
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
    const navigate = useNavigate();

    const handleCreatePlaylist = async () => {
        await axios
            .post(
                `http://localhost:8080/api/v1/tracklists/user/${cookies.user.id}`,
                null,
                {
                    params: {
                        trackListTitle: titleRef.current.value,
                    },
                }
            )
            .then((response) => {
                if (response.data) {
                    setPlaylists((prev) => {
                        return [...prev, response.data];
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
        handleClose();
    };

    useEffect(() => {
        const getAllPlaylistsByUser = async () => {
            await axios
                .get(
                    `http://localhost:8080/api/v1/tracklists/user/${cookies.user.id}`
                )
                .then((response) => {
                    console.log(response.data);
                    setPlaylists(response.data);
                })
                .catch((err) => console.log(err));
        };
        if (cookies.user) {
            getAllPlaylistsByUser();
        } else {
            navigate("/");
        }
    }, []);

    return (
        <>
            <Modal show={open} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Create your own playlist</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Title: </label>
                    <input ref={titleRef}></input>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCreatePlaylist}>
                        Create playlist
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="playlist">
                <div className="playlist-header">
                    <h1>Your playlists</h1>
                </div>

                <div className="playlist-container">
                    <div
                        className={`playlist-card create-playlist-card`}
                        onClick={handleOpen}
                    >
                        <AiOutlinePlus />
                    </div>
                    <div
                        className="playlist-card"
                        onClick={() => navigate(`/library/${"favorite"}`)}
                    >
                        Favorites
                    </div>

                    {playlists.map((playlist) => {
                        return (
                            <>
                                <div
                                    key={playlist.id}
                                    className="playlist-card"
                                    onClick={() =>
                                        navigate(`/library/${playlist.id}`)
                                    }
                                >
                                    {playlist.trackTitle}
                                </div>
                            </>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
