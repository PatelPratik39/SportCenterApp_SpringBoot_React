package com.ecommerce.sportscenter.model;


import com.ecommerce.sportscenter.entity.Brand;
import com.ecommerce.sportscenter.entity.Type;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductResponse {
    private Integer id;
    private String name;
    private String description;
    private String price;
    private String pictureUrl;
    private String productBrand;
    private String productType;
}
