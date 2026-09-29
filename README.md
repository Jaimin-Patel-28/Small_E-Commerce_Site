# E-Commerce Site — Authentication & Product CRUD

Backend: Node.js, Express, MongoDB, JWT (access + refresh tokens), bcrypt, express-validator
Frontend: React, Vite, Tailwind CSS

## Live Links
- Frontend: https://small-e-commerce-site-rho.vercel.app
- Backend API: https://small-e-commerce-site-hame.onrender.com/api

## Setup (Local)

### Backend
cd server
npm install
# .env file banao (.env.example dekho)
npm run dev

### Frontend
cd client
npm install
# .env file banao: VITE_API_URL=http://localhost:3000/api
npm run dev

## Environment Variables (Backend)
PORT, MONGO_URI, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET,
ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY, NODE_ENV, CLIENT_URL

## API Endpoints

### Auth
| Method | Endpoint | Access |
|---|---|---|
| POST | /api/auth/register | Public |
| POST | /api/auth/login | Public |
| POST | /api/auth/refresh-token | Public (valid refresh token cookie required) |
| POST | /api/auth/logout | Authenticated |
| GET | /api/auth/me | Authenticated |

### Products
| Method | Endpoint | Access |
|---|---|---|
| GET | /api/products | Public |
| GET | /api/products/:id | Public |
| POST | /api/products | Authenticated |
| PUT | /api/products/:id | Authenticated |
| DELETE | /api/products/:id | Authenticated |

## Notes
- Access tokens are short-lived (15m) and sent in the response body.
- Refresh tokens are long-lived (7d), hashed before storage, and sent via httpOnly cookies.
- Query parameter validation is not applicable since pagination was not implemented (optional per assignment).