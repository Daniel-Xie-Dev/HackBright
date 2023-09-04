import React from "react";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";

var musicGenres = [
    "Pop",
    "Rock",
    "Hip-Hop",
    "Country",
    "R&B (Rhythm and Blues)",
    "Electronic",
    "Jazz",
    "Blues",
    "Gospel",
    "Classical",
    "Reggae",
    "Folk",
    "Punk",
    "Metal",
    "Soul",
    "Funk",
    "Alternative",
    "Indie",
    "Rap",
    "Techno",
    "Dance",
    "House",
    "EDM (Electronic Dance Music)",
    "Bluegrass",
    "Disco",
    "Ska",
    "Latin",
    "K-Pop",
    "Opera",
];

export default function Dashboard() {
    const navigate = useNavigate();

    const handleGenreClick = (genre) => {
        navigate(`/search/result/${genre}`);
    };

    return (
        <>
            <div className="playlist">
                <div className="explore-header-card">
                    <h1 className="main-title">Dashboard</h1>
                </div>
            </div>
            {true ? (
                <>
                    <div className="playlists">
                        <div className="list">
                            <div className="category">
                                <h2>Explore</h2>
                            </div>
                            {musicGenres.map((genre) => {
                                return (
                                    <div
                                        className="item"
                                        key={genre}
                                        onClick={() => handleGenreClick(genre)}
                                    >
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/en/7/7a/Sweetener_album_cover.png"
                                            alt="album"
                                        />

                                        <h4>{genre}</h4>
                                    </div>
                                );
                            })}
                            {/* <div className="item">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/en/7/7a/Sweetener_album_cover.png"
                                    alt="album"
                                />

                                <h4>Pop</h4>
                            </div>
                            <div className="item">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/en/a/af/Drake_-_Views_cover.jpg"
                                    alt="album"
                                />

                                <h4>Hip-Hop/Rap</h4>
                            </div>
                            <div className="item">
                                <img
                                    src="https://www.billboard.com/wp-content/uploads/2022/05/bad-bunny-cover-art-2022-billboard-1240.jpg?w=1024"
                                    alt="album"
                                />

                                <h4>Latin</h4>
                            </div>
                            <div className="item">
                                <img
                                    src="https://nashvillelifestyles.com/downloads/42380/download/Screen%20Shot%202022-06-28%20at%203.21.23%20PM.png?cb=be28ecb7e05df4c3a5c8f0aabe07430f"
                                    alt="album"
                                />

                                <h4>Country</h4>
                            </div>
                            <div className="item">
                                <img
                                    src="https://i.scdn.co/image/ab67616d0000b2730a5b9c6778c775710b20cb44"
                                    alt="album"
                                />

                                <h4>R&B</h4>
                            </div> */}
                        </div>
                        {/* <div className="list">
                            <h2>Trending</h2>
                            <div className="item">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/en/b/b5/ImagineDragonsEvolve.jpg"
                                    alt="album"
                                />

                                <h4>Today's Top Hits</h4>
                                <p>Arist names</p>
                            </div>
                            <div className="item">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/en/b/b5/ImagineDragonsEvolve.jpg"
                                    alt="album"
                                />

                                <h4>Today's Top Hits</h4>
                                <p>Arist names</p>
                            </div>
                            <div className="item">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/en/b/b5/ImagineDragonsEvolve.jpg"
                                    alt="album"
                                />

                                <h4>Today's Top Hits</h4>
                                <p>Arist names</p>
                            </div>
                            <div className="item">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/en/b/b5/ImagineDragonsEvolve.jpg"
                                    alt="album"
                                />

                                <h4>Today's Top Hits</h4>
                                <p>Arist names</p>
                            </div>
                            <div className="item">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/en/b/b5/ImagineDragonsEvolve.jpg"
                                    alt="album"
                                />
                                <h4>Today's Top Hits</h4>
                                <p>Arist names</p>
                            </div>
                        </div> */}
                    </div>
                </>
            ) : (
                <div>No user</div>
            )}
        </>
    );
}
