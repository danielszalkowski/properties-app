FROM php:8.4-fpm-alpine

RUN apk add --no-cache \
        $PHPIZE_DEPS \
        sqlite-dev \
        libzip-dev \
        && docker-php-ext-install pdo pdo_sqlite

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

RUN usermod -u 1000 www-data && groupmod -g 1000 www-data

RUN mkdir -p storage/logs bootstrap/cache database \
    && chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache