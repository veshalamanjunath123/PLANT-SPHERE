package com.manjunath.plantsphere.dto;

import java.math.BigDecimal;
import java.util.List;

public class CartResponse {
    private Long id;
    private List<CartItemResponse> items;
    private BigDecimal totalAmount;
    private Integer totalItems;

    public CartResponse() {}
    public CartResponse(Long id, List<CartItemResponse> items, BigDecimal totalAmount, Integer totalItems) {
        this.id = id;
        this.items = items;
        this.totalAmount = totalAmount;
        this.totalItems = totalItems;
    }

    public Long getId() { return id; }
    public List<CartItemResponse> getItems() { return items; }
    public BigDecimal getTotalAmount() { return totalAmount; }
    public Integer getTotalItems() { return totalItems; }
}