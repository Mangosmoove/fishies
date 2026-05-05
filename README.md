# 🐟 Fish Tank Game

A full-stack web game where a bouncing DVD logo collides with user-drawn fish. Built with vanilla JS + HTML5 Canvas on the frontend and Java Spring Boot + PostgreSQL on the backend.

---

## Project Structure

```
fish-tank/
├── frontend/        ← Vanilla JS, HTML5 Canvas, CSS
└── backend/         ← Spring Boot (com.fish.fishtank)
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Vanilla JavaScript, HTML5 Canvas |
| Backend | Java Spring Boot |
| Database | PostgreSQL |
| Containerization | Docker, Docker Compose |
| Cloud | AWS (EC2, RDS, S3) |

---

## Getting Started

### Prerequisites

- Java 17+
- PostgreSQL (local install or Docker)
- Docker & Docker Compose
- Maven

### Local Development

1. **Database** — PostgreSQL running locally (superuser: `your username`, no password)
   ```sql
   CREATE DATABASE fishtank;
   ```

2. **Backend** — configured via `application.properties` with the `fishtank` datasource
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```
   Server starts at `http://localhost:8080`

3. **Frontend** — open `frontend/index.html` directly in a browser, or serve it statically.

---

## API Reference

### Users `/api/users`

| Method | URL | Description |
|---|---|---|
| `GET` | `/api/users` | Get all users |
| `GET` | `/api/users/{username}` | Find user by username |
| `GET` | `/api/users/email/{email}` | Find user by email |
| `GET` | `/api/users/search?username=x&email=y` | Find user by username + email |
| `POST` | `/api/users` | Create a user |

**User fields:** `id`, `username`, `email`, `password` *(write-only)*, `maxFish` *(default: 5)*

---

### Fish `/api/fish`

| Method | URL | Description |
|---|---|---|
| `GET` | `/api/fish/user/{userId}` | Get all fish for a user |
| `GET` | `/api/fish/name/{name}` | Find fish by name |
| `GET` | `/api/fish/active/{isActive}` | Get active or inactive fish |
| `GET` | `/api/fish/user/{userId}/lives` | Get user's fish sorted by lives (asc) |
| `PUT` | `/api/fish/{id}/status?isActive=false` | Update fish active status |
| `POST` | `/api/fish` | Create a fish |

**Fish fields:** `id`, `userId`, `name`, `lives` *(default: 3)*, `isActive` *(default: true)*, `size`, `speed`, `createdAt` *(auto-set)*

---

## Backend Architecture

```
Controller  →  Repository  →  Database
```

### Key files

```
backend/src/main/java/com/fish/fishtank/
├── model/
│   ├── User.java
│   └── Fish.java
├── repository/
│   ├── UserRepository.java
│   └── FishRepository.java
└── controller/
    ├── UserController.java
    └── FishController.java
```

### Concepts used

- `@RestController`, `@RequestMapping`, `@GetMapping`, `@PostMapping`, `@PutMapping`
- `@PathVariable` vs `@RequestParam` vs `@RequestBody`
- `@PrePersist` for auto-setting `createdAt` timestamps
- `Optional<T>` with `.map().orElse()` for not-found handling
- `ResponseEntity` for explicit HTTP status codes
- `@JsonProperty(access = WRITE_ONLY)` to hide password from responses
- `ddl-auto=update` for auto table creation/migration
- Getters/setters required by Hibernate and Jackson (Lombok `@Getter`/`@Setter` as a future simplification)

---

## Roadmap

- [x] Users API
- [x] Fish API
- [ ] **Docker** — `Dockerfile` + `docker-compose.yml` for Spring Boot + PostgreSQL
- [ ] Frontend ↔ Backend integration
- [ ] AWS deployment (EC2, RDS, S3)
- [ ] Password hashing with BCrypt
- [ ] Authentication / session management

---

## Docker (Next Step)

The plan is to write a `Dockerfile` for the Spring Boot app and a `docker-compose.yml` that spins up both the app and a PostgreSQL container together.
