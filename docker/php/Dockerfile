FROM php:8.4-fpm-alpine

RUN apk add --no-cache \
    $PHPIZE_DEPS \
    git \
    zip \
    unzip \
    sqlite-dev \
    libzip-dev

RUN docker-php-ext-install pdo pdo_sqlite zip

ENV HOME=/var/www

RUN mkdir -p /var/www/.composer \
    && chown -R 1000:1000 /var/www

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
