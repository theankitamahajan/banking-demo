package com.meditrack.banking.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record CreateAccountRequest(
        @NotBlank String ownerName,
        @NotBlank String accountNumber,
        @NotNull @DecimalMin(value = "0.00") BigDecimal initialBalance
) {}
