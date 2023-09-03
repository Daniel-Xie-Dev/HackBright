import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import MusicPlayer from "./components/Musicplayer/Musicplayer";
import Searchbar from "./components/Searchbar/Searchbar";
import Login from "./components/Forms/Login";
import Signup from "./components/Forms/Signup";
import { useCookies } from "react-cookie";
import SearchResult from "./components/SearchResult/SearchResult";
import { useEffect } from "react";
import axios from "axios";
import { useAppContext } from "./GlobalContext";

function App() {
    const [cookies] = useCookies(["user"]);
    const {setLikedMusiclist} = useAppContext();

    useEffect(() => {
        const getAllLikedMusicByUser = async () => {
            await axios.get(`http://localhost:8080/api/v1/liked-music/getAllLikedMusic/${cookies.user.id}`)
            .then(response => {
                setLikedMusiclist(response.data);
                console.log(response.data);
            }).catch(err => console.log(err));
        }

        if(cookies.user){
            getAllLikedMusicByUser();
        }
    }, [])

    return (
        <Router>
            <div className="main-body">
                {cookies.user ? <Sidebar /> : <></>}

                <div className="screen-container">
                    {cookies.user ? <Searchbar /> : <></>}
                    <Routes>
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
