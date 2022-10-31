package com.roq.assessmentcrud.controller;

import com.roq.assessmentcrud.exception.NotFoundException;
import com.roq.assessmentcrud.model.Product;
import com.roq.assessmentcrud.model.ResponseMessage;
import com.roq.assessmentcrud.service.DataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/products")
public class ProductController {
    @Autowired
    private DataService<Product> productService;

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAll();
    }

    @PostMapping
    public ResponseMessage addProduct(@RequestBody Product product) {
        return productService.insert(product);
    }

    @PutMapping("{id}")
    public ResponseMessage updateProduct(@RequestBody Product product, @PathVariable int id) throws NotFoundException {
        return productService.update(product, id);
    }

    @GetMapping("{id}")
    public Product getProduct(@PathVariable int id) throws NotFoundException {
       return productService.get(id);
    }

    @DeleteMapping("{ids}")
    public void deleteProducts(@PathVariable List<Integer> ids) {
        productService.deleteAll(ids);
    }
}
