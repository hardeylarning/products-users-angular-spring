package com.roq.assessmentcrud.controller;

import com.roq.assessmentcrud.exception.NotFoundException;
import com.roq.assessmentcrud.model.ResponseMessage;
import com.roq.assessmentcrud.model.User;
import com.roq.assessmentcrud.service.DataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/users")
public class UserController {
    @Autowired
    private DataService<User> userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAll();
    }

    @PostMapping
    public ResponseMessage addUser(@RequestBody User user) {
        return userService.insert(user);
    }

    @PutMapping("{id}")
    public ResponseMessage updateUser(@RequestBody User user, @PathVariable int id) throws NotFoundException {
        return userService.update(user, id);
    }

    @GetMapping("{id}")
    public User getUser(@PathVariable int id) throws NotFoundException {
      return userService.get(id);
    }

    @DeleteMapping("{ids}")
    public void deleteUsers(@PathVariable List<Integer> ids) {
        userService.deleteAll(ids);
    }
}
