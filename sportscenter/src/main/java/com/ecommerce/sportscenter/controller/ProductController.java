package com.ecommerce.sportscenter.controller;

import com.ecommerce.sportscenter.model.BrandResponse;
import com.ecommerce.sportscenter.model.ProductResponse;
import com.ecommerce.sportscenter.model.TypeResponse;
import com.ecommerce.sportscenter.service.BrandService;
import com.ecommerce.sportscenter.service.ProductService;
import com.ecommerce.sportscenter.service.TypeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;
    private final BrandService brandService;
    private final TypeService typeService;


    public ProductController(ProductService productService, BrandService brandService, TypeService typeService) {
        this.productService = productService;
        this.brandService= brandService;
        this.typeService =typeService;
    }

//    Get All Products
    @GetMapping()
    public ResponseEntity<List<ProductResponse>> getAllProducts(){
//        get all products
        List<ProductResponse> allProducts = productService.getAllProducts();
        return new ResponseEntity<>(allProducts, HttpStatus.OK);
    }
//  Get Product using Id
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable("id") Integer productId){
        ProductResponse productResponse = productService.getProductById(productId);
        return new ResponseEntity<>(productResponse, HttpStatus.OK);
    }

//    get All Brand
    @GetMapping("/brands")
    public ResponseEntity<List<BrandResponse>> getAllBrands(){
        List<BrandResponse> allBrands = brandService.getAllBrands();
        return new ResponseEntity<>(allBrands, HttpStatus.OK);
    }
//    Get All Types
    @GetMapping("/types")
    public ResponseEntity <List<TypeResponse>> getAllTypes() {
        List<TypeResponse> allTypes = typeService.getAllTypes();
        return new ResponseEntity<>(allTypes, HttpStatus.OK);
    }

}
