# 📝 Notes App — Laravel + React + Docker

Aplicación mínima de notas (CRUD) desarrollada con **Laravel 11 (API JSON)** y **React + Vite**, totalmente dockerizada.  
Usa **SQLite** como base de datos para simplificar la puesta en marcha.

---

## 🧱 Stack técnico

### Backend
- PHP 8.4 (PHP-FPM)
- Laravel 11 (API JSON)
- SQLite
- FormRequest + API Resources
- PHPUnit

### Frontend
- React
- Vite
- React Router
- Axios
- Tests básicos

### Infraestructura
- Docker
- Docker Compose
- Nginx
- PHP-FPM
- Node

---

## 📁 Estructura del proyecto

```text
notes-app/
├── backend/
│   ├── app/
│   └── database/
├── frontend/
│   └── src/
├── docker/
│   ├── nginx/
│   └── php/
├── docker-compose.yml
└── README.md
```


---

## 🚀 Puesta en marcha

### Requisitos
- Docker
- Docker Compose

---

### 1️⃣ Clonar el repositorio

```bash
git clone <repo-url>
cd notes-app
```

### 2️⃣ Crear el archivo de entorno del backend

```bash
cp backend/.env.example backend/.env
```

### 3️⃣ Crear la base de datos SQLite

#### Linux/WSL

```bash
touch backend/database/database.sqlite
```

#### Windows (Powershell)

```bash
New-Item -Path "./backend/database/database.sqlite" -ItemType File
```

### 4️⃣ Levantar los contenedores
> ⚠️ En Windows, asegúrate de que **Docker Desktop** esté ejecutándose antes de usar cualquier comando `docker compose`.

```bash
docker compose up --build
```

### 5️⃣ Instalar dependencias del backend

```bash
docker compose exec backend composer install
```

### 6️⃣ Instalar dependencias del frontend

```bash
docker compose exec frontend npm install
```

### 7️⃣ Generar la clave de la aplicación

```bash
docker compose exec backend php artisan key:generate
```

### 8️⃣ Ejecutar migraciones

```bash
docker compose exec backend php artisan migrate
```

## 🌐 URLs

### Frontend:
http://localhost:5173

### API Backend:
http://localhost/api/notes

http://localhost/api/health

## 🧪 Tests
### Frontend:

```bash
docker compose exec frontend npm run test
```

### API Backend:

```bash
docker compose exec backend php artisan test
```

## 📝 Notas

### Tras el setup inicial, basta con ejecutar:

```bash
docker compose up
```
