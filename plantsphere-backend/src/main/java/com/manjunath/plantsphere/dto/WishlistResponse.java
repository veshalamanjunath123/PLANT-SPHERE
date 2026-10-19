package com.manjunath.plantsphere.dto;

import java.util.List;

public class WishlistResponse {
    private Long id;
    private List<ProductResponse> items;

    public WishlistResponse() {}
    public WishlistResponse(Long id, List<ProductResponse> items) {
        this.id = id;
        this.items = items;
    }
    public Long getId() { return id; }
    public List<ProductResponse> getItems() { return items; }
}