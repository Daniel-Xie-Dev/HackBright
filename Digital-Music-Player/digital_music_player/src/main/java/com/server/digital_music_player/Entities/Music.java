package com.server.digital_music_player.Entities;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.server.digital_music_player.Dtos.MusicDto;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "musics")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Music {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "music_id")
    private Long id;

    @Column(name = "api_id")
    private Long apiId;

    @Column(name = "title")
    private String title;

    @Column(name = "artist")
    private String artist;

    @Column(name = "album")
    private String album;

    // @Column(name = "created_at")
    // @CreationTimestamp
    // private Timestamp createdAt;

    @OneToMany(mappedBy = "music", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonManagedReference(value = "music-musictracks")
    private Set<MusicTracks> musicTracks = new HashSet<>();

//    @OneToMany(mappedBy = "music", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    @JsonManagedReference
//    private Set<History> histories = new HashSet<>();

    public Music(MusicDto musicDto) {
        if (musicDto.getApiId() != null) {
            this.apiId = musicDto.getApiId();
        }

        if(musicDto.getArtist() != null){
            this.artist = musicDto.getArtist();
        }

        if(musicDto.getTitle() != null){
            this.title = musicDto.getTitle();
        }

        if(musicDto.getAlbum() != null){
            this.album = musicDto.getAlbum();
        }




    }

}
