package com.ecommerce.sportscenter.service.impl;

import com.ecommerce.sportscenter.entity.Product;
import com.ecommerce.sportscenter.model.ProductResponse;
import com.ecommerce.sportscenter.repository.ProductRepository;
import com.ecommerce.sportscenter.service.ProductService;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Log4j2
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }


    @Override
    public List<ProductResponse> getAllProducts() {
        log.info("Fetching ALl the Products from database ++++");
//        fetch all products from product repository
        List<Product> allProducts = productRepository.findAll();
//      convert all fetched product lists to a dto object(productResponse)
        List<ProductResponse> productResponses = allProducts.stream()
                .map(this::convertToProductResponse)
                .collect(Collectors.toList());
        log.info("Fetched All Products!!!!");
        return productResponses;
    }

    @Override
    public ProductResponse getProductById(Integer productId) {
        log.info("Fetching Product by Id : {} ", productId);
        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product does not exists ....!!!! "));
//        now convert the product to ProductResponse
        ProductResponse productResponse = convertToProductResponse(product);
        log.info("Fetched Product by Product Id: {}",productId);

        return productResponse;
    }

//    entity to DTO likewise Product entity to productResponse
    private ProductResponse convertToProductResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .pictureUrl(product.getPictureUrl())
                .productBrand(product.getBrand().getName())
                .productType(product.getType().getName())
                .build();
    }
}
