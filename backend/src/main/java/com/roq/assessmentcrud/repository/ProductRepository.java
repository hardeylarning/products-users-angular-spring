package com.roq.assessmentcrud.repository;

import com.roq.assessmentcrud.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {
}
