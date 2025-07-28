FROM php:8.4-apache

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    default-mysql-client \
    && rm -rf /var/lib/apt/lists/*

# Instalar extensões PHP
RUN docker-php-ext-install pdo pdo_mysql

# Habilitar mod_rewrite
RUN a2enmod rewrite

# Copiar composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Definir diretório de trabalho
WORKDIR /var/www/html

# Copiar arquivos do projeto
COPY . .

# Instalar dependências do PHP
RUN composer install

# Atualizar DocumentRoot para /public
RUN sed -i 's|DocumentRoot /var/www/html|DocumentRoot /var/www/html/public|' /etc/apache2/sites-available/000-default.conf

# Permissões
RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html

# Script de espera pelo MySQL
COPY wait-for-mysql.sh /wait-for-mysql.sh
RUN chmod +x /wait-for-mysql.sh

# Comando de inicialização
CMD ["/wait-for-mysql.sh", "mysql", "apache2-foreground"]
