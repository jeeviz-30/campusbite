# CampusBite REST API Specification

All API endpoints exchange data using standard `application/json` format.

---

## Base Path
- Tomcat Context: `/canteen-preorder-system/api/`
- Root Context: `/api/`

---

## 1. Authentication Endpoints

### Register User
- **Method**: `POST`
- **Path**: `/api/auth/register`
- **Request Body**:
  ```json
  {
    "name": "Jane Student",
    "email": "jane@campus.edu",
    "password": "StrongPassword123",
    "role": "STUDENT"
  }
  ```
- **Responses**:
  - `201 Created`:
    ```json
    {
      "success": true,
      "message": "User registered successfully!"
    }
    ```
  - `400 Bad Request`:
    ```json
    {
      "success": false,
      "message": "Registration failed."
    }
    ```

### Login User
- **Method**: `POST`
- **Path**: `/api/auth/login`
- **Request Body**:
  ```json
  {
    "email": "jane@campus.edu",
    "password": "StrongPassword123"
  }
  ```
- **Responses**:
  - `200 OK`:
    ```json
    {
      "success": true,
      "message": "Login successful!",
      "user": {
        "userId": 1,
        "name": "Jane Student",
        "email": "jane@campus.edu",
        "role": "STUDENT"
      }
    }
    ```
  - `401 Unauthorized`:
    ```json
    {
      "success": false,
      "message": "Invalid email or password."
    }
    ```

---

## 2. Menu Endpoints

### Get Available Menu Items (Student View)
- **Method**: `GET`
- **Path**: `/api/menu`
- **Response `200 OK`**:
  ```json
  [
    {
      "itemId": 1,
      "name": "Idli",
      "category": "Breakfast",
      "price": 30.0,
      "available": true
    },
    {
      "itemId": 2,
      "name": "Masala Dosa",
      "category": "Breakfast",
      "price": 60.0,
      "available": true
    }
  ]
  ```

### Get All Menu Items (Admin View)
- **Method**: `GET`
- **Path**: `/api/menu/all`
- **Response `200 OK`**: List of all items regardless of availability.

### Update Item Availability (Admin / Staff)
- **Method**: `PUT`
- **Path**: `/api/menu/availability`
- **Request Body**:
  ```json
  {
    "itemId": 1,
    "isAvailable": false
  }
  ```
- **Response `200 OK`**:
  ```json
  {
    "success": true,
    "message": "Item status updated."
  }
  ```

---

## 3. Order Endpoints

### Place Pre-Order
- **Method**: `POST`
- **Path**: `/api/orders`
- **Request Body**:
  ```json
  {
    "userId": 1,
    "totalAmount": 150.00,
    "pickupTime": "12:45 PM",
    "items": [
      {
        "itemId": 2,
        "quantity": 1,
        "price": 60.00
      },
      {
        "itemId": 4,
        "quantity": 1,
        "price": 90.00
      }
    ]
  }
  ```
- **Response `201 Created`**:
  ```json
  {
    "success": true,
    "message": "Pre-order placed successfully!"
  }
  ```

### Get User Orders
- **Method**: `GET`
- **Path**: `/api/orders?userId={id}`
- **Response `200 OK`**:
  ```json
  [
    {
      "orderId": 101,
      "userId": 1,
      "totalAmount": 150.0,
      "status": "PENDING",
      "pickupTime": "12:45 PM",
      "createdAt": 1727850000000
    }
  ]
  ```

### Update Order Status (Canteen Staff)
- **Method**: `PUT`
- **Path**: `/api/orders/status`
- **Request Body**:
  ```json
  {
    "orderId": 101,
    "status": "READY_FOR_PICKUP"
  }
  ```
- **Response `200 OK`**:
  ```json
  {
    "success": true,
    "message": "Order status updated."
  }
  ```
