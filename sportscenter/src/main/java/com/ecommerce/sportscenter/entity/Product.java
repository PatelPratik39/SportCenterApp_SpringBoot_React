//package com.ecommerce.sportscenter.entity;
//
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//@Entity
//@Data
//@AllArgsConstructor
//@NoArgsConstructor
//@Table(name = "Product")
//public class Product {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "Id")
//    private Integer id;
//    @Column(name = "name" , nullable = false)
//    private String name;
//    @Column(name = "description", length = 1000 , nullable = false)
//    private String description;
//    @Column(name = "price", nullable = false)
//    private String price;
//    @Column(name = "pictureUrl", nullable = false)
//    private String pictureUrl;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "ProductBrandId", referencedColumnName = "Id")
//    private Brand brand;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "ProductTypeId", referencedColumnName = "Id")
//    private Type type;
//
//}

package com.ecommerce.sportscenter.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Integer id;

    @Column(name = "Name", nullable = false)
    private String name;

    @Column(name = "Description", length = 1000)
    private String description;

    @Column(name = "Price", nullable = false)
    private Long price;

    @Column(name = "PictureUrl")
    private String pictureUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ProductBrandId", referencedColumnName = "Id")
    private Brand brand;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ProductTypeId", referencedColumnName = "Id")
    private Type type;
}
