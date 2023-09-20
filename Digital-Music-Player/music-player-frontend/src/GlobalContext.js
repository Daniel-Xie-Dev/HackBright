import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function useAppContext() {
    return useContext(AppContext);
}

export function AppProvider({ children }) {
    const [playlist, setPlaylist] = useState([]);
    const [library, setLibrary] = useState(new Map());
    const [playlistIndex, setPlaylistIndex] = useState(0);
    const [likedMusiclist, setLikedMusiclist] = useState(new Map());

    const contextValue = {
        playlist,
        setPlaylist,
        library,
        setLibrary,
        playlistIndex,
        setPlaylistIndex,
        likedMusiclist,
        setLikedMusiclist,
    };

    return (
        <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
    );
}
