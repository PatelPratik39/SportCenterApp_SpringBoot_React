package com.ecommerce.sportscenter.service.impl;

import com.ecommerce.sportscenter.entity.Type;
import com.ecommerce.sportscenter.model.TypeResponse;
import com.ecommerce.sportscenter.repository.TypeRepository;
import com.ecommerce.sportscenter.service.TypeService;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Log4j2
public class TypeServiceImpl implements TypeService {

    private final TypeRepository typeRepository;

    public TypeServiceImpl(TypeRepository typeRepository) {
        this.typeRepository = typeRepository;
    }

    @Override
    public List<TypeResponse> getAllTypes() {
        log.info("Fetching All Types......!!");
//        Fetch Type from Database
        List<Type> types = typeRepository.findAll();
//        using stream() operator i am mapping and building Type List
//        List<TypeResponse> typeResponses = types.stream().map(this::convertToTypeResponse).collect(Collectors.toList());
        List<TypeResponse> typeResponses = types.stream()
                                                .map(type -> new TypeResponse(type.getId(),type.getName()))
                                                .collect(Collectors.toList());
        return typeResponses;
    }

//        private TypeResponse convertToTypeResponse(Type type) {
//        return TypeResponse.builder()
//                .id(type.getId())
//                .name(type.getName())
//                .build();
//    }
}
