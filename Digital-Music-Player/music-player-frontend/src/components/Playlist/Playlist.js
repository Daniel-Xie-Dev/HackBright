import React, { useRef, useState } from "react";
import "./playlist.css";
import { AiOutlinePlus } from "react-icons/ai";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import { useAppContext } from "../../GlobalContext";

export default function Playlist() {
    const [cookies] = useCookies();
    const titleRef = useRef();
    const [open, setOpen] = useState(false);

    const { library, setLibrary } = useAppContext();

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
                    setLibrary((prev) => {
                        prev.set(response.data.id, response.data);
                        return new Map(prev);
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
        handleClose();
    };

    return (
        <>
            <Modal
                // dialogClassName={"primaryModal"}
                // style={{ background: "darkgray" }}
                // className="playlist-modal"
                show={open}
                onHide={handleClose}
                centered
                animation
                keyboard
            >
                <Modal.Header closeButton className="playlist-modal">
                    <Modal.Title>Create your own playlist</Modal.Title>
                </Modal.Header>

                <Modal.Body className="playlist-modal">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Playlist Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="My favorite songs"
                                autoFocus
                                ref={titleRef}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="playlist-modal">
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
                    <h1>My playlists</h1>
                </div>

                <div className="playlist-container">
                    <div
                        className={`playlist-card create-playlist-card`}
                        onClick={handleOpen}
                    >
                        <AiOutlinePlus />
                    </div>

                    {[...library.keys()].map((key) => {
                        return (
                            <>
                                <div
                                    key={key}
                                    className="playlist-card"
                                    onClick={() => navigate(`/library/${key}`)}
                                >
                                    <p className="playlist-card-title">
                                        {library.get(key).trackTitle}
                                    </p>
                                </div>
                            </>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
