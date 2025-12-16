# 📝 Notes App — Laravel + React + Docker

Aplicación de notas (CRUD) desarrollada con **Laravel 11** y **React + Vite**.
Se utiliza **SQLite** como base de datos.

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

> El proyecto se puede clonar desde Windows o WSL/Linux, aunque desde Windows funciona mucho más lento ya que el sistema de archivos de Windows (NTFS) tiene una latencia alta al sincronizar volúmenes con contenedores Linux. Se recomienda encarecidamente el uso de WSL2 con los archivos ubicados dentro del sistema de archivos de la distribución (ej. ~/projects/...) para un rendimiento óptimo de PHP y Node.js.


### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/danielszalkowski/notes-app.git
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

### 4️⃣ Instalar dependencias del backend
> ⚠️ En Windows, asegúrate de que **Docker Desktop** esté ejecutándose antes de usar cualquier comando `docker compose`. Si utilizas Docker en WSL en vez de la versión de Windows, puedes ejecutar el resto de comandos en WSL directamente.

```bash
docker compose run --rm backend composer install
```

### 5️⃣ Instalar dependencias del frontend

```bash
docker compose run --rm frontend npm install
```

### 6️⃣ Levantar los contenedores

```bash
docker compose up -d
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
