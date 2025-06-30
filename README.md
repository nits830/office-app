# Office App - Association Management System

A full-stack application for managing association elections with secure voting capabilities, built with Next.js and Express.js.

## Features

- **Secure Online Voting System** with OTP verification
- **Real-time Election Results** with visual progress bars
- **Mobile-friendly Interface** built with Tailwind CSS
- **Admin Dashboard** for user management
- **Document/Notice Management**
- **Year-wise Election Tracking**

## Tech Stack

### Frontend
- **Next.js 15** with App Router
- **React 19** with TypeScript
- **Tailwind CSS 4** for styling
- **Client-side state management** with React hooks

### Backend
- **Express.js 5** server
- **PostgreSQL** database
- **Prisma ORM** for database management
- **JWT** authentication
- **CORS** enabled for cross-origin requests

## Project Structure

```
office-app/
├── client/                 # Next.js frontend
│   ├── src/
│   │   ├── app/           # App router pages
│   │   ├── components/    # React components
│   │   ├── lib/          # API utilities
│   │   └── types/        # TypeScript interfaces
│   └── package.json
├── server/                # Express.js backend
│   ├── controllers/      # Route controllers
│   ├── routes/          # API routes
│   ├── models/          # Database models
│   ├── prisma/          # Database schema & migrations
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn package manager

### Backend Setup

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the server directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/office_app"
   DIRECT_URL="postgresql://username:password@localhost:5432/office_app"
   JWT_SECRET="your-secret-key-here"
   ```

4. **Set up the database:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Seed the database (optional):**
   ```bash
   npm run seed
   ```

6. **Start the server:**
   ```bash
   node server.js
   ```

The server will run on `http://localhost:3000`

### Frontend Setup

1. **Navigate to client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:3001`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `POST /api/auth/verify-otp` - OTP verification

### Elections
- `GET /api/elections` - Get all elections
- `GET /api/elections/:id` - Get specific election

### Voting
- `POST /vote/submit` - Submit a vote
- `GET /vote/results/:year` - Get election results by year

### Admin
- `POST /api/admin/login` - Admin login
- `GET /api/admin/users` - Get all users
- `DELETE /api/admin/users/:id` - Delete user

## Usage

1. **Access the application** at `http://localhost:3001`
2. **Navigate to the Dashboard** to view elections and cast votes
3. **Select an election** from the dropdown
4. **Choose a candidate** and submit your vote
5. **View real-time results** in the results section

## Database Schema

The application uses the following main entities:

- **User**: Association members with verification status
- **Election**: Year-based elections with time constraints
- **Candidate**: Election candidates with winner status
- **Vote**: Secure voting records with year-wise tracking
- **Admin**: Administrative users

## Development

### Adding New Features

1. **Backend**: Add routes in `server/routes/` and controllers in `server/controllers/`
2. **Frontend**: Create components in `client/src/components/` and pages in `client/src/app/`
3. **Database**: Update schema in `server/prisma/schema.prisma`

### Code Style

- Use TypeScript for type safety
- Follow ESLint configuration
- Use Tailwind CSS for styling
- Implement proper error handling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License. 