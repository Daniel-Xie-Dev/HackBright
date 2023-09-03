package com.server.digital_music_player.Services;

import com.server.digital_music_player.Dtos.LikedMusicDto;
import com.server.digital_music_player.Entities.LikedMusic;
import com.server.digital_music_player.Entities.User;
import com.server.digital_music_player.Respositories.LikedMusicRepository;
import com.server.digital_music_player.Respositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class LikedMusicServiceImpl implements LikedMusicService {

    @Autowired
    private LikedMusicRepository likedMusicRepository;

    @Autowired
    private UserRepository userRepository;


    @Override
    public List<LikedMusicDto> getAllLikedMusicByUserId(Long userId){
        Optional<User> optionalUser = userRepository.findById(userId);
        if(optionalUser.isPresent()){
            List<LikedMusic> results = likedMusicRepository.findAllLikedMusicByUserId(userId);

            List<LikedMusicDto> likedMusicDtos = new ArrayList<>();
            for(LikedMusic likedMusic : results){
                likedMusicDtos.add(new LikedMusicDto(likedMusic));
            }
            return likedMusicDtos;
        }
        return Collections.emptyList();
    }

    @Override
    @Transactional
    public Optional<LikedMusicDto> addLikedMusicToUserId(Long userId, LikedMusicDto likedMusicDto){
        Optional<User> optionalUser = userRepository.findById(userId);
        if(optionalUser.isPresent()){
            LikedMusic likedMusic = new LikedMusic(likedMusicDto);
            likedMusic.setUser(optionalUser.get());
            likedMusicRepository.saveAndFlush(likedMusic);
            return Optional.of(new LikedMusicDto(likedMusic));
        }
        return Optional.empty();
    }

    @Override
    @Transactional
    public Optional<LikedMusicDto> deleteLikedMusic(Long id){
        Optional<LikedMusic> likedMusicOptional = likedMusicRepository.findById(id);
        if(likedMusicOptional.isPresent()) {
            likedMusicRepository.deleteById(id);
            return Optional.of(new LikedMusicDto(likedMusicOptional.get()));
        }
        return Optional.empty();

    }

}
