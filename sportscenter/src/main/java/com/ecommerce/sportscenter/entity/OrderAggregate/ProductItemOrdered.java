package com.ecommerce.sportscenter.entity.OrderAggregate;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Embeddable
public class ProductItemOrdered {

    private Integer productId;
    private String name;
    private String pictureUrl;

}
