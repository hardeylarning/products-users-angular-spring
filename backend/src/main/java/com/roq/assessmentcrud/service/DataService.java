package com.roq.assessmentcrud.service;

import com.roq.assessmentcrud.exception.NotFoundException;
import com.roq.assessmentcrud.model.ResponseMessage;

import java.util.List;

public interface DataService <T>{

    ResponseMessage insert(T t);

    List<T> getAll();

    ResponseMessage update (T t, int id) throws NotFoundException;

    T get(int id) throws NotFoundException;

    void deleteAll(List<Integer> ids);

}
