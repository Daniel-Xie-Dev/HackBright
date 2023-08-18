package com.server.digital_music_player.Dtos;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

import com.server.digital_music_player.Entities.TrackList;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrackListDto implements Serializable {

    private Long id;
    private String trackTitle;
    // private Timestamp createdAt;
    private UserDto user;
    private Set<MusicDto> musics = new HashSet<>();

    public TrackListDto(TrackList trackList) {
        if (trackList.getId() != null) {
            this.id = trackList.getId();
        }

        if (trackList.getTrackTitle() != null) {
            this.trackTitle = trackList.getTrackTitle();
        }

        // if (trackList.getUser() != null) {
        // this.user = new UserDto(trackList.getUser());
        // }

        // if (trackList.getCreatedAt() != null) {
        // this.createdAt = trackList.getCreatedAt();
        // }
    }

}
