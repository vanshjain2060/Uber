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