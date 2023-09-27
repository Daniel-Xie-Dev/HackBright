import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function useAppContext() {
    return useContext(AppContext);
}

export function AppProvider({ children }) {
    const [playlist, setPlaylist] = useState([]);
    const [isMusicSearch, setIsMusicSearch] = useState(0);
    const [library, setLibrary] = useState(new Map());
    const [playlistIndex, setPlaylistIndex] = useState(0);
    const [likedMusiclist, setLikedMusiclist] = useState(new Set());

    const contextValue = {
        playlist,
        setPlaylist,
        library,
        isMusicSearch,
        setIsMusicSearch,
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
