package com.manjunath.plantsphere.dto;

import com.manjunath.plantsphere.entity.Address;
import jakarta.validation.constraints.NotNull;

public class OrderRequest {
    @NotNull(message = "Shipping address is required")
    private Address shippingAddress;

    public OrderRequest() {}
    public Address getShippingAddress() { return shippingAddress; }
    public void setShippingAddress(Address shippingAddress) { this.shippingAddress = shippingAddress; }
}