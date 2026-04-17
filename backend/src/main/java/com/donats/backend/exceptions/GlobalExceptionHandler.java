package com.donats.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ProblemDetail handleUserAlreadyExists(UserAlreadyExistsException ex) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, ex.getMessage());
        problemDetail.setTitle("Користувач вже існує");
        return createProblemDetail(HttpStatus.CONFLICT, "Користувач вже існує", ex.getMessage());
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ProblemDetail handleUserNotFound(UserNotFoundException ex) {
        return createProblemDetail(HttpStatus.NOT_FOUND, "Користувача не знайдено", ex.getMessage());
    }

    @ExceptionHandler({InvalidTokenException.class, TokenExpiredException.class})
    public ProblemDetail handleTokenExceptions(RuntimeException ex) {
        return createProblemDetail(HttpStatus.UNAUTHORIZED, "Помилка токена", ex.getMessage());
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ProblemDetail handleBadCredentials() {
        return createProblemDetail(HttpStatus.UNAUTHORIZED, "Помилка авторизації", "Неправильний email або пароль");
    }

    private ProblemDetail createProblemDetail(HttpStatus status, String title, String detail) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(status, detail);
        problemDetail.setTitle(title);
        return problemDetail;
    }
}
