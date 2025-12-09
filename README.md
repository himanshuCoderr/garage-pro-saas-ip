# GP-IP Backend API

Production-ready Node.js Express backend with TypeScript.

## Features

- **TypeScript** - Type-safe development
- **Express.js** - Fast, unopinionated web framework
- **Security** - Helmet, CORS, rate limiting
- **Logging** - Winston logger with file rotation
- **Validation** - Zod schema validation
- **Error Handling** - Centralized error handling with custom ApiError
- **API Response** - Standardized response format

## Project Structure

```
src/
├── config/          # Environment & app configuration
├── middleware/      # Express middlewares
├── routes/          # API routes
├── types/           # TypeScript type definitions
├── utils/           # Utilities (logger, ApiError, ApiResponse)
├── app.ts           # Express app setup
└── server.ts        # Server entry point
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp env.sample .env

# Start development server
npm run dev
```

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors |
| `npm run typecheck` | Type check without emit |

## API Endpoints

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/health` | Full health check |
| GET | `/api/v1/health/live` | Liveness probe |
| GET | `/api/v1/health/ready` | Readiness probe |

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | development | Environment mode |
| `PORT` | 3000 | Server port |
| `API_PREFIX` | /api/v1 | API route prefix |
| `CORS_ORIGIN` | * | Allowed CORS origin |
| `RATE_LIMIT_WINDOW_MS` | 900000 | Rate limit window (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | 100 | Max requests per window |
| `LOG_LEVEL` | info | Logging level |

## Response Format

### Success Response

```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error description",
  "errors": {
    "field": ["error messages"]
  }
}
```

## License

ISC

