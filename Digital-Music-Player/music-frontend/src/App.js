import "./App.css";
import MusicPlayer from "./Components/MusicPlayerComponent/MusicPlayer";
import Navigation from "./Components/Navigation/Navigation";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tracklist from "./pages/Tracklist";

const router = createBrowserRouter([
    { path: "/", element: <h1>Home</h1> },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/tracklist",
        element: <Tracklist />,
    },
]);

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Navigation></Navigation>
                <RouterProvider router={router}></RouterProvider>

                <MusicPlayer></MusicPlayer>
            </header>
        </div>
    );
}

export default App;
