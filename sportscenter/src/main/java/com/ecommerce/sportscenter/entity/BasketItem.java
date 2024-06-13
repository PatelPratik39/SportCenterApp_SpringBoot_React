package com.ecommerce.sportscenter.entity;


import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;

@Data
@RedisHash("BasketItem")
public class BasketItem {
        @Id
        private Integer id;
        private String name;
        private String description;
        private String price;
        private String pictureUrl;
        private String productBrand;
        private String productType;
        private Integer quantity;
}
