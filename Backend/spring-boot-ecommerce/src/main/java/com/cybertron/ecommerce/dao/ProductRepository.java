package com.cybertron.ecommerce.dao;

import com.cybertron.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;


@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository <Product, Integer> {
    // Behind the scenes, Spring will execute s query similar tho this SELECT * FROM product where category_id=?
    // Spring Data Rest will automatically exposes endpoint http://localhost:8080/api/products/search/findByCategoryId?id=2
    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);



    // Behind the scenes, Spring will execute s query similar to this SELECT * FROM product p where p.name LIKE concat ('%' , :name , '%')
    // Spring Data Rest will automatically exposes endpoint http://localhost:8080/api/products/search/findByNameContaining?name=ilovejavaprogramming
    Page<Product> findByNameContaining(@Param("name") String name, Pageable pageable);
}
