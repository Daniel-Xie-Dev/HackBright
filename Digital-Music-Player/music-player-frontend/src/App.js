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
import Library from "./components/Library/Library";
import Playlist from "./components/Playlist/Playlist";

function App() {
    const [cookies] = useCookies(["user"]);
    // console.log(cookies);
    const { library, setLibrary, likedMusiclist, setLikedMusiclist } =
        useAppContext();

    useEffect(() => {
        const getTracklistByUser = async () => {
            await axios
                .get(
                    `http://localhost:8080/api/v1/tracklists/user/${cookies.user.id}`
                )
                .then(async (response) => {
                    let tempMap = new Map();
                    for (let object of response.data) {
                        tempMap.set(object.id, object);
                        await getMusicTracksByTracklist(tempMap, object.id);
                    }
                    setLibrary(tempMap);
                })
                .catch((err) => console.log(err));
        };

        const getMusicTracksByTracklist = async (tempMap, id) => {
            await axios
                .get(`http://localhost:8080/api/v1/musicTracks/${id}`)
                .then((response) => {
                    if (response.data) {
                        // console.log(response)
                        let object = tempMap.get(id);
                        const musics = response.data;
                        object = { ...object, musics };
                        tempMap.set(id, object);
                    }
                })
                .catch((err) => console.log(err));
        };

        const getAllLikedMusicByUser = async () => {
            await axios
                .get(
                    `http://localhost:8080/api/v1/musicTracks/${cookies.user.favorite_list}`
                )
                .then((response) => {
                    if (response.data) {
                        setLikedMusiclist(() => {
                            return new Set(
                                response.data.map((item) => item.music.apiId)
                            );
                        });
                    }
                })
                .catch((err) => console.log(err));
        };

        if (cookies.user) {
            getTracklistByUser();
            getAllLikedMusicByUser();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cookies.user]);

    return (
        <Router>
            <div className="main-body">
                {cookies.user ? <Sidebar /> : <></>}

                <div className="screen-container">
                    {cookies.user ? <Searchbar /> : <></>}
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/playlist" element={<Playlist />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/library/:query" element={<Library />} />

                        <Route
                            path="/search/result/:type/:query"
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
