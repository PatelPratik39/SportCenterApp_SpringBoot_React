# SportCenterApp_SpringBoot_React
* Add Swagger and redis data dependency in pom.xml file 
```
<!-- https://mvnrepository.com/artifact/org.springdoc/springdoc-openapi-starter-webmvc-ui -->
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.5.0</version>
</dependency>
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-data-redis</artifactId>
	<version>3.3.0</version>
</dependency>
<!-- MapStruct dependencies -->
<dependency>
	<groupId>org.mapstruct</groupId>
	<artifactId>mapstruct</artifactId>
	<version>1.5.2.Final</version>
</dependency>
<dependency>
	<groupId>org.mapstruct</groupId>
	<artifactId>mapstruct-processor</artifactId>
	<version>1.5.2.Final</version>
	<scope>provided</scope>
</dependency>
```

# API End point validation usnig Swagger - UI

<img src="./ss1.png" alt="swagger1" />
<img src="./ss2.png" alt="swagger2" />

* Server Error Page
<img src="./serverError.png" alt="serverError" />

* Page Not Found for any incorrect path
<img src="./pagNotFound.png" alt="pageNotFound" />

* Initial Cart page and Cart with Items
<img src="./cart0.png" alt="cart0" />

<img src="./cartItems.png" alt="Cart" />

<img src="./store1.png" alt="Store Page" />

<img src="./Swagger2.png" alt="Store Page" />
<img src="./UpdateCart1.png" alt="UpdateCart Page" />
<img src="./UpdateCart2.png" alt="UpdateCart Page" />
<img src="./UpdateCart3.png" alt="UpdateCart Page" />
<img src="./UpdateCart4.png" alt="UpdateCart Page" />
