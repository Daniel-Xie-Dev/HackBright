import React from "react";
import "./Tracklist.css";
import { MusicNoteList } from "react-bootstrap-icons";

function Tracklist() {
    // const navigate = useNavigate();
    return (
        <div className="Tracklist">
            <a href="/tracklist">
                <MusicNoteList></MusicNoteList>
            </a>
        </div>
    );
}

export default Tracklist;
