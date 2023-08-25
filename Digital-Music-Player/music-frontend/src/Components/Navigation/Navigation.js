import React from "react";
import "./Navigation.css";

import HomeButton from "../HomeComponent/HomeButton";
import SearchInput from "../SearchComponent/SearchInput";
import Tracklist from "../TracklistComponent/Tracklist";
import User from "../UserComponent/User";
import { useCookies } from "react-cookie";

function Navigation() {
    const [cookies] = useCookies(["user"]);

    console.log(cookies.user);

    return (
        <div className="Navigation">
            <HomeButton></HomeButton>
            <SearchInput></SearchInput>
            {cookies.user ? (
                <>
                    <Tracklist></Tracklist>
                </>
            ) : (
                <></>
            )}

            <User></User>
        </div>
    );
}

export default Navigation;
