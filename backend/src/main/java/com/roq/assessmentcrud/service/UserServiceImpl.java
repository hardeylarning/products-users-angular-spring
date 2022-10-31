package com.roq.assessmentcrud.service;

import com.roq.assessmentcrud.exception.NotFoundException;
import com.roq.assessmentcrud.model.JwtResponse;
import com.roq.assessmentcrud.model.Login;
import com.roq.assessmentcrud.model.ResponseMessage;
import com.roq.assessmentcrud.model.User;
import com.roq.assessmentcrud.repository.UserRepository;
import com.roq.assessmentcrud.util.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class UserServiceImpl implements DataService<User>{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserDetailsService userDetailsService;

    @Autowired
    JwtUtil jwtTokenUtil;


    public User userDetail(String username) {
        Optional<User> optionalUser = userRepository.findByEmail(username);
        return optionalUser.orElse(null);
    }

    public JwtResponse login(Login request) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
        }
        catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }
        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        final String jwt = jwtTokenUtil.generateToken(userDetails);

        return new JwtResponse(jwt, userDetail(request.getUsername()));
    }

    @Override
    public ResponseMessage insert(User user) {
        userRepository.save(user);
        return new ResponseMessage("Account was created successfully!");
    }

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public ResponseMessage update(User user, int id) throws NotFoundException {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty()) {
        throw new NotFoundException("No User found for Id:=> "+id);
        }
        User user1 = optionalUser.get();
        user1.setEmail(user.getEmail());
        user1.setFirstName(user.getFirstName());
        user1.setLastName(user.getLastName());
        userRepository.save(user1);
        return new ResponseMessage("Account updated successfully!");
    }

    @Override
    public User get(int id) throws NotFoundException {
        Optional<User> user = userRepository.findById(id);

        if (user.isEmpty())
            throw new NotFoundException("No User found for Id:=> "+id);

        return user.get();
    }


    @Override
    public void deleteAll(List<Integer> ids) {
        log.info("User ids to be deleted: "+ids);
        userRepository.deleteAllById(ids);
    }
}
