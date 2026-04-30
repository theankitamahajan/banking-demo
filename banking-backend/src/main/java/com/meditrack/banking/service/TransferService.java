package com.meditrack.banking.service;

import com.meditrack.banking.dto.TransferRequest;
import com.meditrack.banking.entity.Account;
import com.meditrack.banking.entity.Transaction;
import com.meditrack.banking.exception.InsufficientFundsException;
import com.meditrack.banking.exception.NotFoundException;
import com.meditrack.banking.repository.AccountRepository;
import com.meditrack.banking.repository.TransactionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Service
public class TransferService {
    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;

    public TransferService(AccountRepository accountRepository, TransactionRepository transactionRepository) {
        this.accountRepository = accountRepository;
        this.transactionRepository = transactionRepository;
    }

    @Transactional
    public Transaction transfer(TransferRequest request) {
        if (request.fromAccountId().equals(request.toAccountId())) {
            throw new IllegalArgumentException("Source and destination accounts must be different");
        }

        Account source = accountRepository.findById(request.fromAccountId())
                .orElseThrow(() -> new NotFoundException("Source account not found"));
        Account destination = accountRepository.findById(request.toAccountId())
                .orElseThrow(() -> new NotFoundException("Destination account not found"));

        BigDecimal newBalance = source.getBalance().subtract(request.amount());
        if (newBalance.compareTo(BigDecimal.ZERO) < 0) {
            throw new InsufficientFundsException("Insufficient funds for account: " + source.getAccountNumber());
        }

        source.setBalance(newBalance);
        destination.setBalance(destination.getBalance().add(request.amount()));
        accountRepository.save(source);
        accountRepository.save(destination);

        Transaction transaction = new Transaction();
        transaction.setFromAccountId(source.getId());
        transaction.setToAccountId(destination.getId());
        transaction.setAmount(request.amount());
        transaction.setCreatedAt(Instant.now());
        return transactionRepository.save(transaction);
    }

    public List<Transaction> getTransactionsForAccount(Long accountId) {
        if (!accountRepository.existsById(accountId)) {
            throw new NotFoundException("Account not found for id: " + accountId);
        }
        return transactionRepository.findByFromAccountIdOrToAccountIdOrderByCreatedAtDesc(accountId, accountId);
    }
}
