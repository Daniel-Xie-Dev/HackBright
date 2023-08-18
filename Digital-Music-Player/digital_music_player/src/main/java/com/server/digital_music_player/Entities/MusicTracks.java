package com.server.digital_music_player.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.server.digital_music_player.Dtos.MusicTracksDto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "musicTracks")
@NoArgsConstructor
@Data
@AllArgsConstructor
public class MusicTracks {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "tracklist_id")
    private TrackList trackList;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "music_id")
    private Music music;

    public MusicTracks(MusicTracksDto musicTracksDto) {
        if (musicTracksDto.getId() != null) {
            this.id = musicTracksDto.getId();
        }
    }

}
