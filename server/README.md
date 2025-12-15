# iMall Backend Server

Express + TypeScript backend for the iMall marketplace application with full authentication support.

## Features

- ✅ User authentication (signup, signin, logout)
- ✅ JWT token-based authorization
- ✅ User role management (customer, vendor, admin)
- ✅ Password hashing with bcrypt
- ✅ Input validation
- ✅ Error handling middleware
- ✅ CORS enabled for mobile app
- ✅ TypeScript for type safety
- ✅ In-memory data store (ready for database integration)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration (JWT_SECRET is important!)

## Development

Start the development server with hot reload:
```bash
npm run dev
```

The server will run on `http://localhost:3001` by default (configurable via PORT in .env).

## Build

Build the TypeScript code to JavaScript:
```bash
npm run build
```

## Production

Start the production server:
```bash
npm start
```

## Scripts

- `npm run dev` - Start development server with nodemon
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run clean` - Remove build directory
- `npm run rebuild` - Clean and rebuild

## Project Structure

```
server/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Express middleware
│   ├── models/         # Data models
│   ├── routes/         # API routes
│   ├── types/          # TypeScript types/interfaces
│   └── index.ts        # Application entry point
├── dist/               # Compiled JavaScript (generated)
├── .env                # Environment variables
├── .env.example        # Example environment variables
├── nodemon.json        # Nodemon configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies and scripts
```

## API Endpoints

### System Routes
- `GET /` - API welcome message
- `GET /health` - Server health status

### Authentication Routes (Base: `/api/auth`)
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/signin` - Authenticate user
- `POST /api/auth/set-user-type` - Set user role (customer/vendor/admin)
- `POST /api/auth/reset-password` - Request password reset
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/logout` - Logout user (protected)

For detailed API documentation with request/response examples, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

## Quick Test

Test the API with curl:

```bash
# Sign up a new user
curl -X POST http://localhost:3001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","password":"password123"}'

# Sign in
curl -X POST http://localhost:3001/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"jane@example.com","password":"password123"}'

# Set user type
curl -X POST http://localhost:3001/api/auth/set-user-type \
  -H "Content-Type: application/json" \
  -d '{"userId":"<user-id>","userType":"customer"}'
```

## Environment Variables

Required variables in `.env`:

```env
PORT=3001                  # Server port
NODE_ENV=development       # Environment (development/production)
JWT_SECRET=your-secret-key # Secret key for JWT tokens
JWT_EXPIRES_IN=7d         # Token expiration time
```

See `.env.example` for all available environment variables.

## Client Integration

This backend is designed to work with the React Native (Expo) client located in the `/client` folder.

**Authentication Flow:**
1. User signs up → receives user object + JWT token
2. User selects type (customer/vendor) → user profile updated
3. Client stores token in AsyncStorage
4. Client includes token in Authorization header for protected routes

**Base URL Configuration:**
- Development: `http://localhost:3001/api`
- Production: Update to your deployed server URL

## Database Integration

Currently using in-memory storage for development. To integrate a real database:

1. Install your preferred database driver (e.g., `pg` for PostgreSQL, `mongoose` for MongoDB)
2. Update `src/models/User.ts` to use database queries instead of in-memory store
3. Create database schema/tables
4. Add database connection in `src/config/`
5. Update controllers to use new database models

## Future Enhancements

- [ ] Product management endpoints (for vendors)
- [ ] Shopping cart functionality (for customers)
- [ ] Order management system
- [ ] Payment integration
- [ ] Image upload for products
- [ ] Search and filtering
- [ ] Reviews and ratings
- [ ] Real-time notifications
- [ ] Admin dashboard endpoints
