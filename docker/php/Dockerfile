FROM php:8.4-fpm-alpine

RUN apk add --no-cache \
        $PHPIZE_DEPS \
        sqlite-dev \
        libzip-dev \
        && docker-php-ext-install pdo pdo_sqlite

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

RUN sed -i 's/user = www-data/user = root/g' /usr/local/etc/php-fpm.d/www.conf \
    && sed -i 's/group = www-data/group = root/g' /usr/local/etc/php-fpm.d/www.conf