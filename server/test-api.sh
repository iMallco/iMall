#!/bin/bash

echo "=== Testing iMall API ==="
echo ""

# Test 1: Health Check
echo "1. Testing Health Check..."
curl -s http://localhost:5000/health | python3 -m json.tool
echo ""

# Test 2: Sign Up
echo "2. Testing Sign Up..."
SIGNUP_RESPONSE=$(curl -s -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Customer","email":"jane@example.com","password":"password123"}')
echo "$SIGNUP_RESPONSE" | python3 -m json.tool
TOKEN=$(echo "$SIGNUP_RESPONSE" | python3 -c "import sys, json; print(json.load(sys.stdin).get('token', ''))")
USER_ID=$(echo "$SIGNUP_RESPONSE" | python3 -c "import sys, json; print(json.load(sys.stdin).get('user', {}).get('id', ''))")
echo ""

# Test 3: Sign Up Duplicate Email (should fail)
echo "3. Testing Sign Up with Duplicate Email (should fail)..."
curl -s -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Customer","email":"jane@example.com","password":"password123"}' | python3 -m json.tool
echo ""

# Test 4: Sign In
echo "4. Testing Sign In..."
SIGNIN_RESPONSE=$(curl -s -X POST http://localhost:5000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"jane@example.com","password":"password123"}')
echo "$SIGNIN_RESPONSE" | python3 -m json.tool
echo ""

# Test 5: Set User Type
echo "5. Testing Set User Type..."
curl -s -X POST http://localhost:5000/api/auth/set-user-type \
  -H "Content-Type: application/json" \
  -d "{\"userId\":\"$USER_ID\",\"userType\":\"customer\"}" | python3 -m json.tool
echo ""

# Test 6: Get Current User (with token)
echo "6. Testing Get Current User (protected route)..."
curl -s -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool
echo ""

# Test 7: Sign Up Vendor
echo "7. Testing Sign Up Vendor..."
VENDOR_RESPONSE=$(curl -s -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Bob Vendor","email":"bob@vendor.com","password":"password456"}')
echo "$VENDOR_RESPONSE" | python3 -m json.tool
VENDOR_ID=$(echo "$VENDOR_RESPONSE" | python3 -c "import sys, json; print(json.load(sys.stdin).get('user', {}).get('id', ''))")
echo ""

# Test 8: Set Vendor User Type
echo "8. Testing Set Vendor User Type..."
curl -s -X POST http://localhost:5000/api/auth/set-user-type \
  -H "Content-Type: application/json" \
  -d "{\"userId\":\"$VENDOR_ID\",\"userType\":\"vendor\"}" | python3 -m json.tool
echo ""

# Test 9: Password Reset
echo "9. Testing Password Reset..."
curl -s -X POST http://localhost:5000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"email":"jane@example.com"}' | python3 -m json.tool
echo ""

# Test 10: Invalid Login
echo "10. Testing Invalid Login (should fail)..."
curl -s -X POST http://localhost:5000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"jane@example.com","password":"wrongpassword"}' | python3 -m json.tool
echo ""

echo "=== API Testing Complete ==="
