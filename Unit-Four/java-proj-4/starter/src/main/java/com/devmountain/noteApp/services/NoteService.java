package com.devmountain.noteApp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.transaction.annotation.Transactional;

import com.devmountain.noteApp.dtos.NoteDto;

public interface NoteService {

    Optional<NoteDto> getNoteById(Long noteId);

    List<NoteDto> getAllNotesByUser(Long userId);

    void addNote(NoteDto noteDto, Long userId);

    void deleteNote(Long noteId);

    void updateNote(Long noteId, String body);

}