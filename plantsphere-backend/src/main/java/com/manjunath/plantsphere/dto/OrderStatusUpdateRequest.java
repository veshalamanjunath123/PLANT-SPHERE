package com.manjunath.plantsphere.dto;

import jakarta.validation.constraints.NotBlank;

public class OrderStatusUpdateRequest {
    @NotBlank(message = "New status is required")
    private String status;

    private String remarks;

    public OrderStatusUpdateRequest() {}
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }
}