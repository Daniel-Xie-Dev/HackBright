package com.server.digital_music_player.Dtos;

import java.io.Serializable;

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

    public UserDto(User user) {
        if (user.getId() != null) {
            this.id = user.getId();
        }

        if (user.getEmail() != null) {
            this.email = user.getEmail();
        }

        if (user.getPassword() != null) {
            this.password = null;
        }
    }

}
