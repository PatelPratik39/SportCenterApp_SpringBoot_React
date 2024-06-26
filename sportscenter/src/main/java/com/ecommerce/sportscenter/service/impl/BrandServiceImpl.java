package com.ecommerce.sportscenter.service.impl;

import com.ecommerce.sportscenter.entity.Brand;
import com.ecommerce.sportscenter.model.BrandResponse;
import com.ecommerce.sportscenter.repository.BrandRepository;
import com.ecommerce.sportscenter.service.BrandService;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Log4j2
public class BrandServiceImpl implements BrandService {

    private final BrandRepository brandRepository;

    public BrandServiceImpl(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }

    @Override
    public List<BrandResponse> getAllBrands() {
//        first logs the message
        log.info("Fetching All Brands....!!!");
//        fetch all the brand items from the repository
        List<Brand> brandList = brandRepository.findAll();
//        now use "stream()" operator to map with Response
//        List<BrandResponse> brandResponses = brandList.stream().map(this::convertToBrandResponse).collect(Collectors.toList());
        List<BrandResponse> brandResponses = brandList
                .stream()
                .map(brand -> new BrandResponse(brand.getId(),brand.getName()))
                .collect(Collectors.toList());
        log.info("Fetched All Brands ---- ");
        return brandResponses;
    }

//    private BrandResponse convertToBrandResponse(Brand brand) {
//        return BrandResponse.builder()
//                .id(brand.getId())
//                .name(brand.getName())
//                .build();
//    }
}
