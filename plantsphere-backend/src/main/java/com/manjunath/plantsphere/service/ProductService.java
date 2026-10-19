package com.manjunath.plantsphere.service;

import com.manjunath.plantsphere.dto.ProductRequest;
import com.manjunath.plantsphere.dto.ProductResponse;
import com.manjunath.plantsphere.entity.Category;
import com.manjunath.plantsphere.entity.Product;
import com.manjunath.plantsphere.exception.ResourceNotFoundException;
import com.manjunath.plantsphere.repository.CategoryRepository;
import com.manjunath.plantsphere.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@Transactional(readOnly = true)
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public Page<ProductResponse> getProducts(Long categoryId, String search, BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable) {
        String trimmedSearch = (search != null && !search.trim().isEmpty()) ? search.trim() : null;
        return productRepository.findProductsWithFilters(categoryId, trimmedSearch, minPrice, maxPrice, pageable)
                .map(this::mapToResponse);
    }

    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .filter(Product::isActive)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        return mapToResponse(product);
    }

    @Transactional
    public ProductResponse createProduct(ProductRequest request, Long sellerId) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + request.getCategoryId()));

        Product product = new Product();
        applyRequestToEntity(request, product, category);
        product.setSellerId(sellerId);

        Product saved = productRepository.save(product);
        return mapToResponse(saved);
    }

    @Transactional
    public ProductResponse updateProduct(Long id, ProductRequest request, Long sellerId) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + request.getCategoryId()));

        applyRequestToEntity(request, product, category);
        Product updated = productRepository.save(product);
        return mapToResponse(updated);
    }

    @Transactional
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        // Soft delete: keep the record for order integrity, but mark it inactive
        product.setActive(false);
        productRepository.save(product);
    }

    private void applyRequestToEntity(ProductRequest request, Product product, Category category) {
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStockQuantity(request.getStockQuantity());
        product.setImageUrl(request.getImageUrl());
        product.setActive(request.isActive());
        product.setCategory(category);
        product.setSunlightRequirement(request.getSunlightRequirement());
        product.setWateringFrequency(request.getWateringFrequency());
        product.setDifficultyLevel(request.getDifficultyLevel());
        product.setPetFriendly(request.getPetFriendly());
        product.setSuitableLocation(request.getSuitableLocation());
    }

    public ProductResponse mapToResponse(Product product) {
        ProductResponse dto = new ProductResponse();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setStockQuantity(product.getStockQuantity());
        dto.setImageUrl(product.getImageUrl());
        dto.setActive(product.isActive());
        dto.setCategoryId(product.getCategory().getId());
        dto.setCategoryName(product.getCategory().getName());
        dto.setSunlightRequirement(product.getSunlightRequirement());
        dto.setWateringFrequency(product.getWateringFrequency());
        dto.setDifficultyLevel(product.getDifficultyLevel());
        dto.setPetFriendly(product.getPetFriendly());
        dto.setSuitableLocation(product.getSuitableLocation());
        dto.setSellerId(product.getSellerId());
        dto.setCreatedAt(product.getCreatedAt());
        dto.setUpdatedAt(product.getUpdatedAt());
        return dto;
    }
}