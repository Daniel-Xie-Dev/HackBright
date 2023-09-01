import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function useAppContext() {
    return useContext(AppContext);
}

export function AppProvider({ children }) {
    const [playlist, setPlaylist] = useState([]);
    const [playlistIndex, setPlaylistIndex] = useState(0);

    const contextValue = {
        playlist,
        setPlaylist,
        playlistIndex,
        setPlaylistIndex,
    };

    return (
        <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
    );
}
