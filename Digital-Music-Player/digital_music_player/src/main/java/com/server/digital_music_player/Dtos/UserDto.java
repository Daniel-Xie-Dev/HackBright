package com.server.digital_music_player.Dtos;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

import com.server.digital_music_player.Entities.TrackList;
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
    private String username;
    private String password;
    private Long favorite_list;
    // private Timestamp created_at;
    private Set<TrackListDto> trackLists = new HashSet<>();

    public UserDto(User user) {
        if (user.getId() != null) {
            this.id = user.getId();
        }

        if (user.getEmail() != null) {
            this.email = user.getEmail();
        }

        if (user.getUsername() != null){
            this.username = user.getUsername();
        }

        if(user.getFavorite_list() != null){
            this.favorite_list = user.getFavorite_list();
        }

//        if(user.getTrackLists() != null){
//            for(TrackList trackList : user.getTrackLists()){
//                this.trackLists.add(new TrackListDto(trackList));
//            }
//        }
//
//        if (user.getPassword() != null) {
//            this.password = user.getPassword();
//        }

        // if (user.getCreated_at() != null) {
        // this.created_at = user.getCreated_at();
        // }
    }

}
