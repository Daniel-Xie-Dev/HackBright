package com.devmountain.noteApp.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devmountain.noteApp.dtos.NoteDto;
import com.devmountain.noteApp.dtos.UserDto;
import com.devmountain.noteApp.entities.Note;
import com.devmountain.noteApp.entities.User;
import com.devmountain.noteApp.repositories.NoteRepository;
import com.devmountain.noteApp.repositories.UserRepository;

@Service
public class NoteServiceImpl implements NoteService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private NoteRepository noteRepository;

    @Override
    public Optional<NoteDto> getNoteById(Long noteId) {
        Optional<Note> noteOptional = noteRepository.findById(noteId);
        if (noteOptional.isPresent()) {
            return Optional.of(new NoteDto(noteOptional.get()));
        }

        return Optional.empty();
    }

    @Override
    public List<NoteDto> getAllNotesByUser(Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        System.out.println(userOptional.isPresent());
        if (userOptional.isPresent()) {
            List<Note> noteList = noteRepository.findAllByUserEquals(userOptional.get());
            List<NoteDto> noteDtos = new ArrayList<>();
            for (Note note : noteList) {
                noteDtos.add(new NoteDto(note));
            }
            return noteDtos;
        }

        return Collections.emptyList();
    }

    @Override
    @Transactional
    public void addNote(NoteDto noteDto, Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        Note note = new Note(noteDto);
        if (userOptional.isPresent()) {
            note.setUser(userOptional.get());
        }
        noteRepository.saveAndFlush(note);
    }

    @Override
    @Transactional
    public void deleteNote(Long noteId) {
        Optional<Note> noteOptional = noteRepository.findById(noteId);
        if (noteOptional.isPresent()) {
            noteRepository.delete(noteOptional.get());
        }
    }

    @Override
    @Transactional
    public void updateNote(Long noteId, String body) {
        Optional<Note> noteOptional = noteRepository.findById(noteId);
        if (noteOptional.isPresent()) {
            noteOptional.get().setBody(body);
            noteRepository.saveAndFlush(noteOptional.get());
        }

    }

}
