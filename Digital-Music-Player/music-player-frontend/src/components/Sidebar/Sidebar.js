import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBarButton from "./SidebarButton";
import "./sidebar.css";

///// React icons //////
import { AiFillHome } from "react-icons/ai";
import { BiTrendingUp } from "react-icons/bi";
import { BiSolidPlaylist } from "react-icons/bi";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { Navigate } from "react-router-dom";

export default function Sidebar() {
    // const [image, setImage] = useState("");
    /**logic here to get user information (image) to backend API after successful user login
     * then set user image*/
    const navigate = useNavigate();

    const handleUserProfile = () => {
        navigate("/profile");
    };
    return (
        <div className="sidebar-container">
            <img
                src="https://e1.pxfuel.com/desktop-wallpaper/957/639/desktop-wallpaper-luffy-profile-pic-posted-by-zoey-johnson.jpg"
                className="profile-img"
                alt="user-profile"
                onClick={handleUserProfile}
            />
            <div className="sidebar-buttons">
                <SideBarButton
                    title="Dashboard"
                    to="/dashboard"
                    icon={<AiFillHome />}
                />
                <SideBarButton
                    title="Trending"
                    to="/trending"
                    icon={<BiTrendingUp />}
                />
                <SideBarButton
                    title="Library"
                    to="/library"
                    icon={<BiSolidPlaylist />}
                />
            </div>
            <div className="setting-buttons">
                <SideBarButton
                    title="Sign Out"
                    to="/signout"
                    icon={<BsFillArrowRightSquareFill />}
                />
                {/* <SideBarButton title="Log In" to="/login" icon={< BsFillArrowLeftSquareFill />} /> */}
            </div>
        </div>
    );
}
