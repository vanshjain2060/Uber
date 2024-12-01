# Backend Api Documentation

## Endpoint: `/users/register`

### Description
Registers a new user by creating an account with the provided details. Returns an authentication token and the user information upon successful registration.

### Method
`POST`

### Required Data
The request body must be a JSON object containing the following fields:

- **fullname**
  - **firstname** (string, required): First name of the user. Must be at least 3 characters long.
  - **lastname** (string, optional): Last name of the user. Must be at least 3 characters long if provided.
- **email** (string, required): Valid email address of the user.
- **password** (string, required): Password for the user account. Must be at least 6 characters long.

#### Example Request Body
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "yourpassword"
}
```

#### Example Response
```json
{
  "token": "your-jwt-token",
  "user": {
    "_id": "user-id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com"
  }
}
```

### Login Route

**Endpoint:** `/api/login`

**Method:** `POST`

**Description:** Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "email": "johndoe@example.com",
  "password": "yourpassword"
}
```
#### Example Response
```json
{
  "token": "your-jwt-token",
  "user": {
    "_id": "user-id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com"
  }
}
```
### Endpoint: `/users/profile`

### Description
Fetches the profile information of the authenticated user. Requires a valid authentication token.

### Method
`GET`

### Headers
- **Authorization** (string, required): Bearer token for authentication.

### Example Response
```json
{
  "user": {
    "_id": "user-id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com"
  }
}
```

### Endpoint: `/users/logout`

### Description
Logs out the authenticated user by invalidating the authentication token.

### Method
`POST`

### Headers
- **Authorization** (string, required): Bearer token for authentication.

### Example Response
```json
{
  "message": "Successfully logged out"
}
```
### Endpoint: `/captains/register`

### Description
Registers a new captain by creating an account with the provided details. Returns an authentication token and the captain information upon successful registration.

### Method
`POST`

### Required Data
The request body must be a JSON object containing the following fields:

- **fullname**
  - **firstname** (string, required): First name of the captain. Must be at least 3 characters long.
  - **lastname** (string, optional): Last name of the captain. Must be at least 3 characters long if provided.
- **email** (string, required): Valid email address of the captain.
- **password** (string, required): Password for the captain account. Must be at least 6 characters long.
- **vehicle**
  - **color** (string, required): Color of the vehicle.
  - **plate** (string, required): License plate number of the vehicle.
  - **capacity** (number, required): Capacity of the vehicle.
  - **vehicleType** (string, required): Type of the vehicle.

#### Example Request Body
```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "janesmith@example.com",
  "password": "yourpassword",
  "vehicle": {
    "color": "red",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "Sedan"
  }
}
```

#### Example Response
```json
{
  "token": "your-jwt-token",
  "captain": {
    "_id": "captain-id",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Smith"
    },
    "email": "janesmith@example.com",
    "vehicle": {
      "color": "red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "Sedan"
    }
  }
}
```