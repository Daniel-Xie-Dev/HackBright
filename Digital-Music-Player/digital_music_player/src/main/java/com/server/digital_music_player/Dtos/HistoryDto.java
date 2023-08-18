package com.server.digital_music_player.Dtos;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

import com.server.digital_music_player.Entities.History;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HistoryDto implements Serializable {

    private Long id;
    // private Timestamp createdAt;
    private UserDto userDto;
    private MusicDto musicDto;
    // private Set<MusicDto> musicDtos = new HashSet<>();

    public HistoryDto(History history) {
        if (history.getId() != null) {
            this.id = history.getId();
        }
        // if (history.getCreatedAt() != null) {
        // this.createdAt = history.getCreatedAt();
        // }
    }

}
