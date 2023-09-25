package com.server.digital_music_player.Entities;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.server.digital_music_player.Dtos.TrackListDto;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tracklists")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrackList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tracklist_id")
    private Long id;

    @Column(name = "track_title")
    private String trackTitle;

    // @Column(name = "created_at")
    // @CreationTimestamp
    // private Timestamp createdAt;

    @ManyToOne
    @JsonBackReference(value = "user-tracklist")
    private User user;

    @OneToMany(mappedBy = "trackList", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value = "tracklist-musictracks")
    private Set<MusicTracks> musicTracks = new HashSet<>();

    public TrackList(TrackListDto trackListDto) {
        if (trackListDto.getTrackTitle() != null) {
            this.trackTitle = trackListDto.getTrackTitle();
        }

        // if (trackListDto.getCreatedAt() != null) {
        // this.createdAt = trackListDto.getCreatedAt();
        // }
    }

}
