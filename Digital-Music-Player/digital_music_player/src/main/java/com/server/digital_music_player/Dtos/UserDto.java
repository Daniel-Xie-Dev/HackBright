package com.server.digital_music_player.Dtos;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

import com.server.digital_music_player.Entities.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto implements Serializable {

    private Long id;
    private String email;
    private String password;
    // private Timestamp created_at;
    private Set<TrackListDto> trackLists = new HashSet<>();

    public UserDto(User user) {
        if (user.getId() != null) {
            this.id = user.getId();
        }

        if (user.getEmail() != null) {
            this.email = user.getEmail();
        }

        if (user.getPassword() != null) {
            this.password = user.getPassword();
        }

        // if (user.getCreated_at() != null) {
        // this.created_at = user.getCreated_at();
        // }
    }

}
