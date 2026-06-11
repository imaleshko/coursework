# Donats

Платформа для збору донатів: створення онлайн-зборів, керування ними та
пожертви через інтернет-еквайринг LiqPay.

## Можливості

- Реєстрація та авторизація (JWT + refresh-токени з ротацією)
- Керування акаунтом: email, нікнейм, пароль, аватар
- Створення та редагування зборів із зображеннями й тегами
- Сторінка збору з прогресом, історією донатів і топом найбільших пожертв
- Анонімні донати через LiqPay із повідомленням
- Оновлення до зборів
- Фільтрація зборів за тегами, пагінація
- Автоматичне закриття збору при досягненні цілі

## Стек

**Бекенд:** Java, Spring Boot, Spring Security, Spring Data JPA (Hibernate)

**Фронтенд:** React, TypeScript, Vite, React Router, TanStack Query, Axios

**База даних:** PostgreSQL

**Сторонні сервіси:** LiqPay (платежі), Cloudinary (зберігання зображень)

## Архітектура

- Бекенд організовано за принципом feature-based: кожна функціональна можливість (`fundraiser`,
  `donation`, `user`, `image`) — окремий пакет із контролером, сервісом і DTO.
- Аутентифікація — stateless JWT у заголовку `Authorization`; refresh-токен
  зберігається в httpOnly cookie й ротується при кожному оновленні.
- Платежі: бекенд формує підписаний запит до LiqPay, статус донату
  підтверджується через server-callback (`/donations/liqpay/server`).

## Запуск

### База даних

```bash
cd backend
docker compose up -d
```

### Бекенд

Потрібні змінні середовища:
`PORT`, `DB_URL`, `DB_USER`, `DB_PASSWORD`, `JWT_SECRET_KEY`, `CORS_ALLOWED_ORIGIN`,
`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `LIQPAY_PUBLIC_KEY`, `LIQPAY_PRIVATE_KEY`,
`SERVER_URL`.

```bash
./mvnw spring-boot:run
```

### Фронтенд

Потрібна змінна середовища:
`VITE_API_BASE_URL`.

```bash
cd frontend
npm install
npm run dev
```
