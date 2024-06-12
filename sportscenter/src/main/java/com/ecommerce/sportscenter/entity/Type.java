package com.ecommerce.sportscenter.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "Type")
public class Type {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Integer id;
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "type", fetch = FetchType.LAZY)
    private List<Product> products;
}
