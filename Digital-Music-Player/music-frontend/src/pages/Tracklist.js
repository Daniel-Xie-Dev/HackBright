import axios from "axios";

import React, { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";

function Tracklist() {
    const [cookies, setCookies] = useCookies(["user"]);
    const [tracklist, setTracklist] = useState([]);
    const titleRef = useRef();
    console.log(cookies.user.id);

    useEffect(() => {
        const getAllTracklist = async () => {
            await axios
                .get(
                    `http://localhost:8080/api/v1/tracklists/user/${cookies.user.id}`
                )
                .then((response) => {
                    setTracklist(() => {
                        // console.log(response.data);
                        return response.data;
                    });
                    // console.log(tracklist);
                })
                .catch((error) => console.log(error));
        };
        getAllTracklist();
    }, []);

    const handleCreateTracklist = async (e) => {
        e.preventDefault();
        await axios
            .post(
                `http://localhost:8080/api/v1/tracklists/user/${cookies.user.id}`,
                null,
                {
                    params: { trackListTitle: titleRef.current.value },
                    headers: { "Content-Type": "application/json" },
                }
            )
            .then((response) => console.log(response))
            .catch((err) => console.log(err));
        titleRef.current.value = "";
    };

    const handleDeleteTracklist = async (id) => {
        console.log("Deleting : ", id);
        await axios.delete(`http://localhost:8080/api/v1/tracklists/${id}`, null, {
            headers: { "Content-Type": "application/json" },
        });
    };

    return (
        <div className="Tracklist">
            {tracklist.map((element) => {
                return (
                    <div key={element.id}>
                        <h1>{element.trackTitle}</h1>
                        <button onClick={() => handleDeleteTracklist(element.id)}>
                            Delete
                        </button>
                    </div>
                );
            })}

            <form onSubmit={handleCreateTracklist}>
                <label>Playlist Title: </label>
                <input type="text" max={20} ref={titleRef}></input>
                <button type="submit">Create new playlist</button>
            </form>
        </div>
    );
}

export default Tracklist;
