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
    console.log(cookies);
    const { setLibrary, likedMusiclist, setLikedMusiclist } = useAppContext();

    useEffect(() => {
        const getAllLikedMusicByUser = async () => {
            await axios
                .get(
                    `http://localhost:8080/api/v1/liked-music/getAllLikedMusic/${cookies.user.id}`
                )
                .then((response) => {
                    setLikedMusiclist(() => {
                        let tempMap = new Map();
                        for (let object of response.data) {
                            tempMap.set(object.api, object.id);
                        }
                        // console.log(response);
                        return tempMap;
                    });
                    changeLikedMusicToObect();
                })
                .catch((err) => console.log(err));
        };

        const changeLikedMusicToObect = async () => {
            let promises = [];
            let data = [];
            for (let object of likedMusiclist) {
                promises.push(
                    axios
                        .get(
                            `https://deezerdevs-deezer.p.rapidapi.com/track/${object[0]}`,
                            {
                                headers: {
                                    "Content-Type": "application/json",
                                    "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
                                    "X-RapidAPI-Host": process.env.REACT_APP_HOST,
                                },
                            }
                        )
                        .then((response) => {
                            data.push(response.data);
                        })
                        .catch((error) => console.log(error))
                );
            }
            Promise.all(promises).then(() => {
                setLibrary(() => {
                    // console.log(data);
                    return [...data];
                });
            });
        };

        if (cookies.user) {
            getAllLikedMusicByUser();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cookies.user]);

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
                        <Route path="/library" element={<Library />} />
                        <Route path="/playlist" element={<Playlist />} />
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
