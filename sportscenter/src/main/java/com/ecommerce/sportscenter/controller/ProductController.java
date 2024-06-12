package com.ecommerce.sportscenter.controller;

import com.ecommerce.sportscenter.model.BrandResponse;
import com.ecommerce.sportscenter.model.ProductResponse;
import com.ecommerce.sportscenter.model.TypeResponse;
import com.ecommerce.sportscenter.service.BrandService;
import com.ecommerce.sportscenter.service.ProductService;
import com.ecommerce.sportscenter.service.TypeService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Page<ProductResponse>> getAllProducts(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size,
            @RequestParam(name = "keyword", required = false) String keyword,
            @RequestParam(name = "brandId", required = false) Integer brandId,
            @RequestParam(name = "typeId", required = false) Integer typeId,
            @RequestParam(name = "sort", defaultValue = "name") String sort,
            @RequestParam(name = "order", defaultValue = "asc") String order
            ){
//        Convert order to a sorted direction
        Sort.Direction  direction = order.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sorting = Sort.by(direction, sort);
        Pageable pageable = PageRequest.of(page, size, sorting);
//        get all products
        Page<ProductResponse> allProducts = productService.getAllProducts(pageable, brandId, typeId, keyword);
        return new ResponseEntity<>(allProducts, HttpStatus.OK);
    }
//  Get Product using id
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
