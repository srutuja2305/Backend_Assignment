# Backend_Assignment

## Overview
This is a project with Node.js, Express, Socket.io, and MySQL.

## Features
- User authentication and registration
- Role-based access control
- Image upload functionality

## Setup Instructions

1. **Clone the repository**:
    ```bash
    git clone https://github.com/srutuja2305/Backend_Assignment.git
    cd bidding-platform
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file with the following content:
    ```env
    PORT=3000
    DB_HOST=localhost
    DB_USER=your_db_user
    DB_PASS=your_db_password
    DB_NAME=backend_assignment
    JWT_SECRET=your_jwt_secret
    ```

4. **Set up the database**:
    Ensure you have MYSQL installed and create a database.
    ```sql
    CREATE DATABASE backend_assignment;
    ```

5. **Run the server**:
    ```bash
    npm start
    ```

## API Endpoints

### Users
- POST /users/register - Register a new user.
- POST /users/login - Authenticate a user and return a token.
- GET /users/profile - Get the profile of the logged-in user.

### Items
- GET /items/items - Retrieve all auction items.
- GET /items/getItems/:id - Retrieve a single auction item by ID.
- POST /items/create - Create a new auction item.
- PUT /items/updateItem/:id - Update an auction item by ID.
- DELETE /items/deleteItem/:id - Delete an auction item by ID.

### Bids
- GET /items/:itemId/getbids - Retrieve all bids for a specific item.
- POST /items/:itemId/bids - Place a new bid on a specific item.

### Notifications
- GET /notifications/get_all - Retrieve notifications for the logged-in user.
- POST /notifications/mark-read - Mark notifications as read.

## Testing
Run tests using Jest:
```bash
npm test
