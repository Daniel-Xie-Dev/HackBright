package com.server.digital_music_player.Dtos;

import com.server.digital_music_player.Entities.Music;
import com.server.digital_music_player.Entities.MusicTracks;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class MusicTracksDto {

    private Long id;
    private TrackListDto trackListDto;
    private Music music;

    public MusicTracksDto(MusicTracks musicTracks) {
        if (musicTracks.getId() != null) {
            this.id = musicTracks.getId();
        }

        if(musicTracks.getMusic() != null){
            this.music = musicTracks.getMusic();
        }
    }
}
