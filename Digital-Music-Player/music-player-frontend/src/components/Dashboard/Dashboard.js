import React from "react";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";

var musicGenres = {
    Pop: "https://upload.wikimedia.org/wikipedia/en/7/7a/Sweetener_album_cover.png",
    // "Rock",
    "Hip-Hop":
        "https://upload.wikimedia.org/wikipedia/en/a/af/Drake_-_Views_cover.jpg",
    Country:
        "https://nashvillelifestyles.com/downloads/42380/download/Screen%20Shot%202022-06-28%20at%203.21.23%20PM.png?cb=be28ecb7e05df4c3a5c8f0aabe07430f",
    "R&B (Rhythm and Blues)":
        "https://i.scdn.co/image/ab67616d0000b2730a5b9c6778c775710b20cb44",
    Latin: "https://www.billboard.com/wp-content/uploads/2022/05/bad-bunny-cover-art-2022-billboard-1240.jpg?w=1024",
    // "Jazz",
    // "Blues",
    // "Gospel",
    // "Classical",
    // "Reggae",
    // "Folk",
    // "Punk",
    // "Metal",
    // "Soul",
    // "Funk",
    // "Alternative",
    // "Indie",
    // "Rap",
    // "Techno",
    // "Dance",
    // "House",
    // "EDM (Electronic Dance Music)",
    // "Bluegrass",
    // "Disco",
    // "Ska",
    // "Latin",
    // "K-Pop",
    // "Opera",
};

var genres = ["Pop", "Hip-Hop", "Country", "R&B (Rhythm and Blues)", "Latin"];

export default function Dashboard() {
    const navigate = useNavigate();

    const handleGenreClick = (genre) => {
        navigate(`/search/result/${genre}`);
    };

    return (
        <>
            <div className="dashboard-header">
                <div className="explore-header-card">
                    <h1 className="main-title">Dashboard</h1>
                </div>
            </div>
            {true ? (
                <>
                    <div className="dashboard">
                        <div className="dashboard-title">
                            <h2>Explore</h2>
                        </div>
                        <div className="list">
                            {genres.map((genre) => {
                                // console.log(musicGenres[genre]);
                                return (
                                    <div
                                        className="item"
                                        key={genre}
                                        onClick={() => handleGenreClick(genre)}
                                    >
                                        <img src={musicGenres[genre]} alt="album" />
                                        <p>{genre}</p>
                                    </div>
                                );
                            })}
                            {/* <div className="item">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/en/7/7a/Sweetener_album_cover.png"
                                    alt="album"
                                />
                                <p>Pop</p>
                            </div> */}
                        </div>

                        <div className="dashboard-title">
                            <h2>Reccomendation</h2>
                        </div>
                        <div className="list">
                            <div className="item">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/en/7/7a/Sweetener_album_cover.png"
                                    alt="album"
                                />
                                <p>Pop</p>
                            </div>
                            <div className="item">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/en/a/af/Drake_-_Views_cover.jpg"
                                    alt="album"
                                />

                                <p>FirstName LastName</p>
                            </div>
                            <div className="item">
                                <img
                                    src="https://www.billboard.com/wp-content/uploads/2022/05/bad-bunny-cover-art-2022-billboard-1240.jpg?w=1024"
                                    alt="album"
                                />

                                <p>Latin</p>
                            </div>
                            <div className="item">
                                <img
                                    src="https://nashvillelifestyles.com/downloads/42380/download/Screen%20Shot%202022-06-28%20at%203.21.23%20PM.png?cb=be28ecb7e05df4c3a5c8f0aabe07430f"
                                    alt="album"
                                />

                                <p>Country</p>
                            </div>
                            <div className="item">
                                <img
                                    src="https://i.scdn.co/image/ab67616d0000b2730a5b9c6778c775710b20cb44"
                                    alt="album"
                                />

                                <p>R&B</p>
                            </div>
                            <div className="item">
                                <img
                                    src="https://i.scdn.co/image/ab67616d0000b2730a5b9c6778c775710b20cb44"
                                    alt="album"
                                />
                                <p>R&B</p>
                            </div>
                            <div className="item">
                                <img
                                    src="https://i.scdn.co/image/ab67616d0000b2730a5b9c6778c775710b20cb44"
                                    alt="album"
                                />

                                <p>R&B</p>
                            </div>
                            <div className="item">
                                <img
                                    src="https://i.scdn.co/image/ab67616d0000b2730a5b9c6778c775710b20cb44"
                                    alt="album"
                                />

                                <p>R&B</p>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div>No user</div>
            )}
        </>
    );
}
