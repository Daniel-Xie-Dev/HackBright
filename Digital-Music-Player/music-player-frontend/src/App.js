import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import MusicPlayer from "./components/Musicplayer/Musicplayer";
import Searchbar from "./components/Searchbar/Searchbar";
import Login from "./components/Forms/Login";
import Signup from "./components/Forms/Signup";
import SearchResult from "./components/SearchResult/SearchResult";
import axios from "axios";
import Homepage from "./components/Homepage/Homepage";
import Dashboard from "./components/Dashboard/Dashboard";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useAppContext } from "./GlobalContext";

function App() {
    const [cookies] = useCookies(["user"]);
    const { setLikedMusiclist } = useAppContext();

    useEffect(() => {
        const getAllLikedMusicByUser = async () => {
            await axios
                .get(
                    `http://localhost:8080/api/v1/liked-music/getAllLikedMusic/${cookies.user.id}`
                )
                .then((response) => {
                    setLikedMusiclist(response.data);
                    console.log(response.data);
                })
                .catch((err) => console.log(err));
        };

        if (cookies.user) {
            getAllLikedMusicByUser();
        }
    }, []);

    return (
        <Router>
            <div className="main-body">
                <Sidebar />

                <div className="screen-container">
                    {cookies.user ? <Searchbar /> : <></>}
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route
                            path="/search/result/:query"
                            element={<SearchResult />}
                        />
                    </Routes>
                    {cookies.user ? (
                        <>
                            <MusicPlayer />
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </Router>
    );
}

export default App;
