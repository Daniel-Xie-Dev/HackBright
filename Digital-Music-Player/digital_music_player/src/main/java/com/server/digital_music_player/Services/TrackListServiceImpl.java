package com.server.digital_music_player.Services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import javax.sound.midi.Track;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.server.digital_music_player.Dtos.TrackListDto;
import com.server.digital_music_player.Entities.TrackList;
import com.server.digital_music_player.Entities.User;
import com.server.digital_music_player.Respositories.TrackListRepository;
import com.server.digital_music_player.Respositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class TrackListServiceImpl implements TrackListService {

    @Autowired
    private TrackListRepository trackListRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<TrackListDto> getAllTrackListByUser(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            List<TrackList> trackLists = trackListRepository.findAllTrackListsByUser(userOptional.get());
            List<TrackListDto> trackListDtos = new ArrayList<>();
            for (TrackList trackList : trackLists) {
                trackListDtos.add(new TrackListDto(trackList));
            }
            return trackListDtos;
        }
        return Collections.emptyList();
    }

    @Override
    @Transactional
    public Optional<TrackListDto> addTrackListToUser(Long userId, String trackListTitle) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            TrackList trackList = new TrackList();
            trackList.setTrackTitle(trackListTitle);
            trackList.setUser(userOptional.get());
            TrackList trackList1 = trackListRepository.saveAndFlush(trackList);

            return Optional.of(new TrackListDto(trackList1));
        }
        return Optional.empty();
    }

    @Override
    @Transactional
    public String deleteTrackList(Long trackListId) {
        Optional<TrackList> trackListOptional = trackListRepository.findById(trackListId);
        if (trackListOptional.isPresent()) {
            trackListRepository.delete(trackListOptional.get());
            return "success";
        }
        return "no such user found!";
    }

    @Override
    @Transactional
    public void editTrackTitle(TrackListDto trackListDto) {
        Optional<TrackList> trackListOptional = trackListRepository.findById(trackListDto.getId());
        if (trackListOptional.isPresent()) {
            trackListOptional.get().setTrackTitle(trackListDto.getTrackTitle());
            trackListRepository.saveAndFlush(trackListOptional.get());
        }
    }
}
