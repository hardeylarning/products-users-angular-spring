package com.roq.assessmentcrud.service;

import com.roq.assessmentcrud.exception.NotFoundException;
import com.roq.assessmentcrud.model.Product;
import com.roq.assessmentcrud.model.ResponseMessage;
import com.roq.assessmentcrud.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements DataService<Product>{

    @Autowired
    private ProductRepository productRepository;

    @Override
    public ResponseMessage insert(Product product) {
        Product saved = productRepository.save(product);
        return new ResponseMessage("Product created successfully!");
    }

    @Override
    public List<Product> getAll() {
        return productRepository.findAll();
    }

    @Override
    public ResponseMessage update(Product product, int id) throws NotFoundException {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isEmpty()) {
            throw new  NotFoundException("No Product found for Id:=> "+id);
        }
        Product product1 = optionalProduct.get();
        product1.setCode(product.getCode());
        product1.setName(product.getName());
        product1.setTag(product.getTag());
        productRepository.save(product1);
        return new ResponseMessage("Product updated successfully!");
    }

    @Override
    public Product get(int id) throws NotFoundException {
        Optional<Product> product = productRepository.findById(id);
        if (product.isEmpty()) {
            throw new NotFoundException("No Product found for Id:=> "+id);
        }
        return product.get();
    }


    @Override
    public void deleteAll(List<Integer> ids) {
        productRepository.deleteAllById(ids);
    }
}
