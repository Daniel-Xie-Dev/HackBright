package com.server.digital_music_player.Dtos;

import com.server.digital_music_player.Entities.LikedMusic;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LikedMusicDto {

    private Long id;
    private Long api;
    private UserDto userDto;

    public LikedMusicDto(LikedMusic likedMusic){
        if(likedMusic.getId() != null){
            this.id = likedMusic.getId();
        }
        if(likedMusic.getApi() != null){
            this.api = likedMusic.getApi();
        }

    }
}
