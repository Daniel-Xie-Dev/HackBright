package com.server.digital_music_player.Services;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.digital_music_player.Dtos.MusicDto;
import com.server.digital_music_player.Dtos.MusicTracksDto;
import com.server.digital_music_player.Entities.Music;
import com.server.digital_music_player.Entities.MusicTracks;
import com.server.digital_music_player.Entities.TrackList;
import com.server.digital_music_player.Respositories.MusicRepository;
import com.server.digital_music_player.Respositories.MusicTrackRepository;
import com.server.digital_music_player.Respositories.TrackListRepository;

import jakarta.transaction.Transactional;

@Service
public class MusicTrackServiceImpl implements MusicTrackService {

    @Autowired
    private MusicTrackRepository musicTrackRepository;

    @Autowired
    TrackListRepository trackListRepository;

    @Autowired
    MusicRepository musicRepository;

    @Autowired
    private MusicService musicService;

    @Override
    public List<MusicTracksDto> getAllMusicTracksInTrackList(Long trackListId) {
        Optional<TrackList> trackList = trackListRepository.findById(trackListId);
        if (trackList.isPresent()) {
            List<MusicTracks> musicTracks = musicTrackRepository.findAllByTrackList(trackList.get());
            List<MusicTracksDto> musicTracksDtos = new ArrayList<>();
            for (MusicTracks musicTrack : musicTracks) {
                musicTracksDtos.add(new MusicTracksDto(musicTrack));
            }
            return musicTracksDtos;
        }
        return Collections.emptyList();
    }

    @Override
    @Transactional
    public Optional<MusicTracksDto> addMusicTrackToTrackList(MusicDto musicDto, Long trackListId) {
        Optional<Music> musicOptional = musicRepository.findByApiId(musicDto.getApiId());
        if (musicOptional.isEmpty()) {
            musicService.storeMusic(musicDto);
        }

        musicOptional = musicRepository.findByApiId(musicDto.getApiId());
        Optional<TrackList> trackList = trackListRepository.findById(trackListId);

        if(trackList.isPresent()){
            List<MusicTracksDto> musicTracksDtos = getAllMusicTracksInTrackList(trackList.get().getId());
            for(MusicTracksDto musicTracksDto : musicTracksDtos){
                if(Objects.equals(musicTracksDto.getMusic().getApiId(), musicDto.getApiId())){
                    return Optional.empty();
                }
            }
        }

        if(trackList.isPresent()){
            MusicTracks musicTracks = new MusicTracks();
            musicTracks.setMusic(musicOptional.get());
            musicTracks.setTrackList(trackList.get());
            musicTrackRepository.saveAndFlush(musicTracks);
            return Optional.of(new MusicTracksDto(musicTracks));
        }
        return Optional.empty();
    }

    @Override
    @Transactional
    public void deleteMusicTrack(Long musicTrackId) {
        Optional<MusicTracks> musicTrackOptional = musicTrackRepository.findById(musicTrackId);
        if (musicTrackOptional.isPresent()) {
            musicTrackRepository.delete(musicTrackOptional.get());
        }
    }

}
