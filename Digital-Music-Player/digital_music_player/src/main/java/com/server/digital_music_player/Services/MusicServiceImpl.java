package com.server.digital_music_player.Services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.digital_music_player.Dtos.MusicDto;
import com.server.digital_music_player.Entities.Music;
import com.server.digital_music_player.Respositories.MusicRepository;

import jakarta.transaction.Transactional;

@Service
public class MusicServiceImpl implements MusicService {

    @Autowired
    private MusicRepository musicRepository;

    @Override
    @Transactional
    public Optional<MusicDto> storeMusic(MusicDto musicDto) {
        Optional<Music> musicOptional = musicRepository.findByApiId(musicDto.getApiId());
        if (musicOptional.isPresent())
            return Optional.empty();
        Music temp = musicRepository.saveAndFlush(new Music(musicDto));
        return Optional.of(new MusicDto(temp));
    }

    @Override
    public Optional<MusicDto> findMusicById(Long id) {
        Optional<Music> musicOptional = musicRepository.findById(id);
        if (musicOptional.isPresent()) {
            return Optional.of(new MusicDto(musicOptional.get()));
        }
        return Optional.empty();
    }

    @Override
    public Optional<MusicDto> findMusicByApiId(Long id) {
        Optional<Music> musicOptional = musicRepository.findByApiId(id);
        if (musicOptional.isPresent()) {
            return Optional.of(new MusicDto(musicOptional.get()));
        }
        return Optional.empty();
    }

}
