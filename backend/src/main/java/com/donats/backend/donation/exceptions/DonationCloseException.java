package com.donats.backend.donation.exceptions;

public class DonationCloseException extends RuntimeException {
    public DonationCloseException(String message) {
        super(message);
    }
}
