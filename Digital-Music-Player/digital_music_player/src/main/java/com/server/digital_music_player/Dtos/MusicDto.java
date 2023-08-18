package com.server.digital_music_player.Dtos;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

import com.server.digital_music_player.Entities.Music;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MusicDto implements Serializable {

    private Long id;
    private Long apiId;
    private Long apiSource;
    // private Timestamp createdAt;

    // private HistoryDto historyDto;

    private Set<MusicTracksDto> musicTracks = new HashSet<>();
    private Set<HistoryDto> historyDtos = new HashSet<>();

    public MusicDto(Music music) {
        if (music.getId() != null) {
            this.id = music.getId();
        }

        if (music.getApiId() != null) {
            this.apiId = music.getApiId();
        }

        if (music.getApiSource() != null) {
            this.apiSource = music.getApiSource();
        }

        // if (music.getCreatedAt() != null) {
        // this.createdAt = music.getCreatedAt();
        // }
    }

}
