package com.roq.assessmentcrud.controller;

import com.roq.assessmentcrud.model.Login;
import com.roq.assessmentcrud.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api")
public class LoginController {
    @Autowired
    UserServiceImpl userService;

    @PostMapping("/login")
    public ResponseEntity<?> createToken(@RequestBody Login request) throws Exception {
        return ResponseEntity.ok(userService.login(request));
    }
}
