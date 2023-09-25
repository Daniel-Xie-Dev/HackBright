//package com.server.digital_music_player.Entities;
//
//import com.fasterxml.jackson.annotation.JsonBackReference;
//import com.server.digital_music_player.Dtos.LikedMusicDto;
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//@Entity
//@Table(name = "liked-musics")
//@Data
//@AllArgsConstructor
//@NoArgsConstructor
//public class LikedMusic {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "id")
//    private Long id;
//
//    @Column(name = "api")
//    private Long api;
//
//    @ManyToOne()
//    @JsonBackReference
//    @JoinColumn(name = "user_id")
//    private User user;
//
//    public LikedMusic(LikedMusicDto likedMusicDto){
//        if(likedMusicDto.getId() != null){
//            this.id = likedMusicDto.getId();
//        }
//
//        if(likedMusicDto.getApi() != null){
//            this.api = likedMusicDto.getApi();
//        }
//    }
//}
