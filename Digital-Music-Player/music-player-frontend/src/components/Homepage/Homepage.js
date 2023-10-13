import React from "react";
import { useNavigate } from "react-router-dom";
import "./homepage.css";

/**
 * Homepage Component
 * Renders the main landing page of the music player application.
 */

export default function Homepage() {
    /**
     * Handles the "Listen Now" button click event. Navigates to the dashboard page.
     */
    const navigate = useNavigate();

    const handleListenNowClick = () => {
        navigate("/login");
    };

    /**Add logic here, if home screen is displaying, do not display navbar or sidebar
     *  if token or active user.....
     */

    /**
     *  Renders the homepage UI. Displays a card with a title, description, gif and a "Listen Now" button.
     */

    return (
        <div class="homepage-card">
            <div class="home-main-card">
                <div class="message-container">
                    <p className="home-title">Music Player</p>
                    <span className="home-description">
                        {" "}
                        Explore new musics, artists, genre, and more!
                    </span>
                    <button
                        className="home-listen-button"
                        onClick={handleListenNowClick}
                    >
                        Listen Now
                    </button>
                </div>
                <div class="home-page-gif"></div>
            </div>
        </div>
    );
}
