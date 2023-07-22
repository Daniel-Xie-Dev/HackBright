package com.devmountain.noteApp.dtos;

import java.io.Serializable;

import com.devmountain.noteApp.entities.Note;
import com.devmountain.noteApp.entities.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NoteDto implements Serializable {

    private Long id;
    private String body;
    private User userDto;

    public NoteDto(Note note) {
        if (note.getId() != null) {
            this.id = note.getId();
        }

        if (note.getBody() != null) {
            this.body = note.getBody();
        }
    }
}
