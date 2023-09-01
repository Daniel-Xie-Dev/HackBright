import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import MusicPlayer from "./components/Musicplayer/Musicplayer";
import Searchbar from "./components/Searchbar/Searchbar";
import Login from "./components/Forms/Login";
import Signup from "./components/Forms/Signup";
import { useCookies } from "react-cookie";
import SearchResult from "./components/SearchResult/SearchResult";

function App() {
    const [cookies, _] = useCookies(["user"]);

    console.log(cookies.user);
    return (
        <Router>
            <div className="main-body">
                {cookies.user ? <Sidebar /> : <></>}

                <div className="screen-container">
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
                            <Searchbar />
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
