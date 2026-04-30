package com.meditrack.banking.controller;

import com.meditrack.banking.dto.TransferRequest;
import com.meditrack.banking.entity.Transaction;
import com.meditrack.banking.service.TransferService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TransferController {
    private final TransferService transferService;

    public TransferController(TransferService transferService) {
        this.transferService = transferService;
    }

    @PostMapping("/transfers")
    public Transaction transfer(@Valid @RequestBody TransferRequest request) {
        return transferService.transfer(request);
    }

    @GetMapping("/transactions/{accountId}")
    public List<Transaction> getTransactionsForAccount(@PathVariable Long accountId) {
        return transferService.getTransactionsForAccount(accountId);
    }
}
