import axios from "axios";

const parseData = (isMusicSearch, currentMusic) => {
    const musicTracks =
        isMusicSearch === 1
            ? {
                  apiId: currentMusic.id,
                  title: currentMusic.title,
                  artist: currentMusic.artist.name,
                  album: currentMusic.album.title,
              }
            : {
                  apiId: currentMusic.music.apiId,
                  title: currentMusic.music.title,
                  artist: currentMusic.music.artist,
                  album: currentMusic.music.title,
              };
    return musicTracks;
};

export async function addMusicTrackToTracklist(
    trackId,
    isMusicSearch,
    currentMusic
) {
    try {
        const musicTracks = parseData(isMusicSearch, currentMusic);

        console.log(musicTracks);

        const response = await axios.post(
            `http://localhost:8080/api/v1/musicTracks/add/${trackId}`,
            {
                ...musicTracks,
            }
        );

        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function removeMusicTrackFromList(isMusicSearch, musics, currentMusic) {
    try {
        console.log(currentMusic);
        const id =
            isMusicSearch === 1
                ? musics.find((item) => item.music.apiId === currentMusic.id).id
                : musics.find(
                      (item) => item.music.apiId === currentMusic.music.apiId
                  ).id;

        // const response = "success";

        const response = await axios.delete(
            `http://localhost:8080/api/v1/musicTracks/delete/${id}`
        );

        if (response.data === "success") {
            return isMusicSearch === 1 ? currentMusic.id : currentMusic.music.apiId;
        }

        return undefined;
    } catch (error) {
        console.log(error);
    }
}

export async function removeMusicLibrary(apiId, musics) {
    try {
        console.log(musics);
        const id = musics.find((item) => item.music.apiId === apiId).id;

        // const response = "success";

        const response = await axios.delete(
            `http://localhost:8080/api/v1/musicTracks/delete/${id}`
        );

        if (response.data === "success") {
            return apiId;
        }

        return undefined;
    } catch (error) {
        console.log(error);
    }
}
