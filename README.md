# Expense Tracker Backend

## Overview

This is a backend API for a personal expense tracker.

It allows users to:

* Add expenses
* View expenses
* Filter and sort data
* See total expenses

---

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* Zod

---

## Features

### Create Expense

POST /expenses

### Get Expenses

GET /expenses

Supports:

* Filter by category
* Sort by date (newest first)

---

## Key Design Decisions

### Idempotency

Used Idempotency-Key header to prevent duplicate entries.

### Money Handling

Stored amount as integer (paise) to avoid floating-point errors.

### Validation

Used Zod for strict request validation.

---

## Project Structure

src/
config/
models/
validators/
services/
controllers/
routes/
middlewares/

---

## Environment Variables

Create `.env` file:

PORT=3000
MONGO_URI=your_mongodb_url

---

## Run Project

npm install
npm run dev

---

## API Example

POST /expenses

{
"amount": 100.5,
"category": "Food",
"description": "Lunch",
"date": "2026-04-20"
}

---

## Trade-offs

* No authentication
* No pagination

---

## Future Improvements

* Add authentication
* Add pagination
* Add tests
