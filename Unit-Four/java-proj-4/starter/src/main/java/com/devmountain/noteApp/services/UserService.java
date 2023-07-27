package com.devmountain.noteApp.services;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.devmountain.noteApp.dtos.UserDto;

public interface UserService {

    @Transactional
    List<String> addUser(UserDto userDto);

    List<String> userLogin(UserDto userDto);

}