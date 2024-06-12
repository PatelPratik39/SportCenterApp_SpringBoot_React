package com.ecommerce.sportscenter.service.impl;

import com.ecommerce.sportscenter.entity.Product;
import com.ecommerce.sportscenter.model.ProductResponse;
import com.ecommerce.sportscenter.repository.ProductRepository;
import com.ecommerce.sportscenter.service.ProductService;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
@Log4j2
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }


    @Override
    public Page<ProductResponse> getAllProducts(Pageable pageable) {
        log.info("Fetching ALl the Products from database ++++");
//        fetch all products from product repository
        Page<Product> productPage = productRepository.findAll(pageable);
//      convert all fetched product lists to a dto object(productResponse)
        Page<ProductResponse> productResponses = productPage.map(this::convertToProductResponse);
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
