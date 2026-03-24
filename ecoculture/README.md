# 🌿 EcoCulture — Smart Digital Platform for Eco-Cultural Tourism

> **Sustainable travel for a planet worth protecting.** EcoCulture bridges conscious travelers with eco-friendly destinations, AI-generated itineraries, and a marketplace supporting local artisan communities.

---

## 📁 Project Structure

```
ecoculture/
├── frontend/          # Next.js 14 + React 19 + Tailwind CSS + Framer Motion
│   ├── app/           # Next.js App Router pages
│   │   ├── page.tsx              # Homepage (hero, stats, featured destinations)
│   │   ├── destinations/         # Destination discovery with filters & search
│   │   ├── planner/              # AI-powered itinerary planner
│   │   ├── shop/                 # Eco marketplace
│   │   ├── dashboard/            # User dashboard & eco-impact tracker
│   │   └── auth/                 # Login & registration
│   ├── components/    # Reusable UI components
│   │   ├── layout/   # Navbar, Footer
│   │   ├── ui/       # DestinationCard, StatCounter
│   │   └── providers/ # NextAuth session provider
│   ├── lib/           # API client, auth config, Prisma client, data
│   └── prisma/        # Schema + seed data
│
└── backend/           # Java 17 Spring Boot RESTful API
    └── src/main/java/com/ecoculture/
        ├── config/     # Security, CORS, exception handler, data seeder
        ├── controller/ # Auth, Destinations, Itineraries, Shop, Bookings, Users
        ├── dto/        # Request/response DTOs with validation
        ├── model/      # JPA entities (User, Destination, Itinerary, Product, Order, Booking, Review)
        ├── repository/ # Spring Data JPA repositories
        ├── security/   # JWT service + authentication filter
        └── service/    # Business logic (AuthService, DestinationService)
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm/yarn
- **Java 17** and Maven 3.8+
- **Git**

---

### Frontend Setup

```bash
cd frontend

# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local
# Edit .env.local — set NEXTAUTH_SECRET at minimum

# 3. Set up database
npx prisma db push
npx prisma db seed   # Loads sample destinations & products

# 4. Start dev server
npm run dev
# → http://localhost:3000
```

---

### Backend Setup

```bash
cd backend

# 1. Build & run (H2 in-memory DB auto-configured)
./mvnw spring-boot:run

# → API available at http://localhost:8080/api
# → H2 Console at http://localhost:8080/api/h2-console
#   JDBC URL: jdbc:h2:mem:ecoculturedb  User: sa  Password: (blank)
```

The backend seeds itself on first startup:
- **Admin**: `admin@ecoculture.travel` / `Admin@1234`
- **User**: `priya@example.com` / `User@1234`

---

## 🔑 Key Features

| Feature | Frontend | Backend |
|---|---|---|
| **Authentication** | NextAuth + JWT | Spring Security + JWT filter |
| **Account Security** | Login form with validation | Max attempts + account lockout |
| **Destination Discovery** | Filter, search, sort by eco score | `/api/destinations` REST endpoints |
| **AI Travel Planner** | Multi-step form → structured itinerary | `/api/itineraries/generate` (connect AI provider) |
| **Carbon Tracking** | Visual carbon report per itinerary | Per-activity `carbonImpact` field |
| **Eco Shop** | Product grid with cart + wishlist | `/api/products` + `/api/orders` |
| **Bookings** | Booking flow | `/api/bookings` CRUD |
| **Dashboard** | Eco score, trip history, orders | `/api/users/me` profile |
| **Interactive Map** | Google Maps integration ready | Lat/lng on each Destination |

---

## 🌐 API Reference

### Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login, returns JWT |
| POST | `/api/auth/refresh` | Public | Refresh access token |
| POST | `/api/auth/forgot-password` | Public | Trigger password reset email |
| POST | `/api/auth/reset-password` | Public | Reset password with token |

### Destinations
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/destinations` | Public | List all (supports `?category=`, `?featured=true`, `?minScore=`) |
| GET | `/api/destinations/:slug` | Public | Destination details |
| GET | `/api/destinations/search?q=` | Public | Full-text search |

### Itineraries
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/itineraries/generate` | Auth | AI-generate itinerary |
| GET | `/api/itineraries/my` | Auth | User's itineraries |
| GET | `/api/itineraries/:id` | Auth | Itinerary detail |
| DELETE | `/api/itineraries/:id` | Auth | Delete itinerary |

### Shop
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/products` | Public | Product list (supports filters) |
| GET | `/api/products/:id` | Public | Product detail |
| POST | `/api/orders` | Auth | Place order |
| GET | `/api/orders/my` | Auth | User's orders |
| PATCH | `/api/orders/:id/cancel` | Auth | Cancel order |

### Bookings
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/bookings` | Auth | Create booking |
| GET | `/api/bookings/my` | Auth | User's bookings |
| PATCH | `/api/bookings/:id/cancel` | Auth | Cancel booking |

### Users
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/users/me` | Auth | Get own profile |
| PUT | `/api/users/me` | Auth | Update profile |
| GET | `/api/users/me/saved-destinations` | Auth | Saved destinations |
| POST | `/api/users/me/saved-destinations/:id` | Auth | Save destination |
| DELETE | `/api/users/me/saved-destinations/:id` | Auth | Unsave destination |

---

## ⚡ AI Planner Integration

To enable real AI-generated itineraries, connect an AI provider in `ItineraryController.java`:

```java
// Option A: OpenAI GPT-4
// Add dependency: com.openai:openai-java
OpenAIClient client = OpenAIOkHttpClient.fromEnv();
ChatCompletion completion = client.chat().completions().create(
    ChatCompletionCreateParams.builder()
        .model(ChatModel.GPT_4O)
        .addSystemMessage(ECO_TRAVEL_SYSTEM_PROMPT)
        .addUserMessage(buildItineraryPrompt(request))
        .build()
);

// Option B: Google Gemini
// Add dependency: com.google.cloud:google-cloud-vertexai
```

The system prompt should instruct the model to return a structured JSON itinerary with `carbonImpact` per activity.

---

## 🗄️ Database

### Development (default)
- **Frontend**: SQLite via Prisma (`dev.db`)
- **Backend**: H2 in-memory (auto-reset on restart)

### Production
**Frontend** — switch `DATABASE_URL` to PostgreSQL:
```
DATABASE_URL="postgresql://user:pass@host:5432/ecoculturedb"
```

**Backend** — add to `application-prod.yml`:
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/ecoculturedb
    username: postgres
    password: ${DB_PASSWORD}
  jpa:
    database-platform: org.hibernate.dialect.PostgreSQLDialect
    hibernate:
      ddl-auto: validate
```

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `forest-500` | `#2d8530` | Primary green — CTAs, icons |
| `earth-500` | `#9e6d3c` | Accent earth — shop, secondary |
| `stone-950` | `#0a1f0b` | Background |
| `forest-display` | Playfair Display | Headings, brand |
| `font-body` | Nunito | Body text, UI labels |
| Glass card | `rgba(20,57,22,0.4)` + blur | All card surfaces |

---

## 🌱 Sustainability Metrics

Each destination has a `sustainabilityScore` (0-100) computed from:
- Renewable energy usage
- Waste management practices  
- Local community employment ratio
- Carbon offset programs
- Plastic-free initiatives
- Water conservation

Each itinerary tracks `carbonFootprint` (kg CO₂) broken down by:
- Transport mode (flight vs train vs cycle)
- Accommodation type (eco-certified vs standard)
- Activities and local tours

---

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | Next.js 14 (App Router) + React 19 |
| Styling | Tailwind CSS 3 + custom design tokens |
| Animation | Framer Motion 11 |
| Auth (Frontend) | NextAuth.js v4 |
| ORM (Frontend) | Prisma 5 + SQLite |
| State Management | Zustand + React Hook Form |
| API Client | Axios |
| Backend Framework | Spring Boot 3.2 + Java 17 |
| Security | Spring Security + JWT (jjwt 0.12) |
| Database (Backend) | H2 (dev) / PostgreSQL (prod) |
| Validation | Jakarta Bean Validation |
| Build Tools | npm / Maven |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "feat: add your feature"`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

Please ensure all new API endpoints have corresponding frontend API client methods in `lib/api.ts`.

---

*Made with 🌱 for a sustainable future — EcoCulture 2024*
