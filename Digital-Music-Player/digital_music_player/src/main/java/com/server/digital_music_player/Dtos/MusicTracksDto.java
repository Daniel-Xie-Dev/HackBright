package com.server.digital_music_player.Dtos;

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
    private MusicDto musicDto;

    public MusicTracksDto(MusicTracks musicTracks) {
        if (musicTracks.getId() != null) {
            this.id = musicTracks.getId();
        }
    }
}
