#!/bin/sh
set -e

# Copy .env.example to .env if .env doesn't exist
if [ ! -f /app/.env ]; then
  echo "[entrypoint] No .env found, copying from .env.example..."
  cp /app/.env.example /app/.env
fi

# Install composer deps if vendor doesn't exist
if [ ! -d /app/vendor ]; then
  echo "[entrypoint] Installing composer dependencies..."
  composer install --no-interaction --prefer-dist --optimize-autoloader
fi

# Generate app key if it's empty or not set
APP_KEY_VALUE=$(grep '^APP_KEY=' /app/.env | cut -d '=' -f2)
if [ -z "$APP_KEY_VALUE" ]; then
  echo "[entrypoint] Generating APP_KEY..."
  php artisan key:generate --force
fi

# Wait for postgres to be ready
echo "[entrypoint] Waiting for database..."
until php -r "
  try {
    \$pdo = new PDO(
      'pgsql:host=' . getenv('DB_HOST') . ';port=' . getenv('DB_PORT') . ';dbname=' . getenv('DB_DATABASE'),
      getenv('DB_USERNAME'),
      getenv('DB_PASSWORD')
    );
    exit(0);
  } catch (Exception \$e) {
    exit(1);
  }
"; do
  echo "[entrypoint] DB not ready, retrying in 2s..."
  sleep 2
done

echo "[entrypoint] Running migrations..."
php artisan migrate --force

echo "[entrypoint] Starting Laravel..."
exec php artisan serve --host=0.0.0.0 --port=8000