package com.donats.backend.fundraising.creating.exception;

public class SlugAlreadyInUseException extends RuntimeException {
    public SlugAlreadyInUseException(String message) {
        super(message);
    }
}
