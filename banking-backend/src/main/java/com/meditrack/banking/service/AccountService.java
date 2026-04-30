package com.meditrack.banking.service;

import com.meditrack.banking.dto.CreateAccountRequest;
import com.meditrack.banking.entity.Account;
import com.meditrack.banking.exception.NotFoundException;
import com.meditrack.banking.repository.AccountRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {
    private final AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public Account createAccount(CreateAccountRequest request) {
        Account account = new Account();
        account.setOwnerName(request.ownerName());
        account.setAccountNumber(request.accountNumber());
        account.setBalance(request.initialBalance());
        return accountRepository.save(account);
    }

    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    public Account getAccount(Long id) {
        return accountRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Account not found for id: " + id));
    }
}
