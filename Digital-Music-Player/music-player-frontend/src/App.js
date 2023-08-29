import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import MusicPlayer from "./components/Musicplayer/Musicplayer";

function App() {
    return (
        <Router>
            <div className="main-body">
                <Sidebar />

                <MusicPlayer />
            </div>
        </Router>
    );
}

export default App;
