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

    @Column(name = "source")
    private Long apiSource;

    // @Column(name = "created_at")
    // @CreationTimestamp
    // private Timestamp createdAt;

    @OneToMany(mappedBy = "music", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonManagedReference
    private Set<MusicTracks> musicTracks = new HashSet<>();

    @OneToMany(mappedBy = "music", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonManagedReference
    private Set<History> histories = new HashSet<>();

    public Music(MusicDto musicDto) {
        if (musicDto.getApiId() != null) {
            this.apiId = musicDto.getApiId();
        }

        if (musicDto.getApiSource() != null) {
            this.apiSource = musicDto.getApiSource();
        }
    }

}
