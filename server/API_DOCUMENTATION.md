# iMall API Documentation

Base URL: `http://localhost:3001/api`

## Table of Contents
- [Authentication](#authentication)
  - [Sign Up](#sign-up)
  - [Sign In](#sign-in)
  - [Set User Type](#set-user-type)
  - [Reset Password](#reset-password)
  - [Get Current User](#get-current-user)
  - [Logout](#logout)

---

## Authentication

### Sign Up

Create a new user account.

**Endpoint:** `POST /auth/signup`

**Request Body:**
```json
{
  "name": "Jane Customer",
  "email": "jane@example.com",
  "password": "password123"
}
```

**Validation:**
- `name`: minimum 2 characters
- `email`: valid email format
- `password`: minimum 6 characters

**Success Response (201):**
```json
{
  "success": true,
  "user": {
    "id": "user_1765818304565_zzplr38g3",
    "name": "Jane Customer",
    "email": "jane@example.com",
    "userType": null
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Email already registered"
}
```

---

### Sign In

Authenticate an existing user.

**Endpoint:** `POST /auth/signin`

**Request Body:**
```json
{
  "email": "jane@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "user_1765818304565_zzplr38g3",
    "name": "Jane Customer",
    "email": "jane@example.com",
    "userType": "customer"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (401):**
```json
{
  "success": false,
  "error": "Invalid email or password"
}
```

---

### Set User Type

Set or update the user's role (customer, vendor, or admin).

**Endpoint:** `POST /auth/set-user-type`

**Request Body:**
```json
{
  "userId": "user_1765818304565_zzplr38g3",
  "userType": "customer"
}
```

**Valid User Types:**
- `customer` - End user purchasing products
- `vendor` - Seller managing products/store
- `admin` - System administrator

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "user_1765818304565_zzplr38g3",
    "name": "Jane Customer",
    "email": "jane@example.com",
    "userType": "customer"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": "User not found"
}
```

---

### Reset Password

Request a password reset (sends email in production).

**Endpoint:** `POST /auth/reset-password`

**Request Body:**
```json
{
  "email": "jane@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "If the email exists, a password reset link has been sent"
}
```

**Note:** For security reasons, the response is the same whether the email exists or not.

---

### Get Current User

Get the authenticated user's information.

**Endpoint:** `GET /auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "user_1765818304565_zzplr38g3",
    "name": "Jane Customer",
    "email": "jane@example.com",
    "userType": "customer"
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "error": "Access token required"
}
```

**Error Response (403):**
```json
{
  "success": false,
  "error": "Invalid or expired token"
}
```

---

### Logout

Logout the current user (token invalidation).

**Endpoint:** `POST /auth/logout`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## Error Handling

All errors follow this format:

```json
{
  "success": false,
  "error": "Error message here"
}
```

Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid credentials)
- `403` - Forbidden (invalid/expired token)
- `404` - Not Found
- `500` - Internal Server Error

---

## Authentication Flow for Client

1. **User Registration:**
   ```
   POST /api/auth/signup
   → Receive user object + token
   → Store token securely
   ```

2. **User Type Selection:**
   ```
   POST /api/auth/set-user-type
   → Update user's role (customer/vendor)
   ```

3. **Subsequent Requests:**
   ```
   Include header: Authorization: Bearer <token>
   ```

4. **Token Management:**
   - Tokens expire in 7 days by default
   - Store token in AsyncStorage (React Native)
   - Include token in Authorization header for protected routes
   - Handle 403 errors by prompting re-login

---

## Testing Examples

### Using cURL:

**Sign Up:**
```bash
curl -X POST http://localhost:3001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

**Sign In:**
```bash
curl -X POST http://localhost:3001/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

**Set User Type:**
```bash
curl -X POST http://localhost:3001/api/auth/set-user-type \
  -H "Content-Type: application/json" \
  -d '{"userId":"user_xxx","userType":"customer"}'
```

**Get Current User (with token):**
```bash
curl -X GET http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer <your-token-here>"
```

---

## Next Steps for Client Integration

1. **Create API Service Layer** (`client/services/api.ts`):
   - Configure base URL: `http://localhost:3001/api` (development)
   - Add axios/fetch wrapper
   - Add request/response interceptors

2. **Update AuthContext** (`client/contexts/AuthContext.tsx`):
   - Replace console.log with actual API calls
   - Add token storage using AsyncStorage
   - Add token to all authenticated requests
   - Handle token refresh/expiry

3. **Error Handling:**
   - Display user-friendly error messages
   - Handle network errors
   - Implement retry logic

4. **Production:**
   - Update base URL to production server
   - Enable HTTPS
   - Implement proper error logging
   - Add rate limiting on client side
