# Action Community Platform

A community platform where people create petitions, gather support locally and worldwide, generate clean reports for government officials, and coordinate real-world action together.

## Features

### Core Features
- **Petitions**: Create and manage petitions with support goals
- **Live Feed**: Twitter-style social feed with posts, likes, reposts, and comments
- **AI Report Generation**: Automatic generation of objective summaries and draft emails
- **Events Calendar**: Browse and create community events
- **Global Discovery**: Worldwide search and regional exploration
- **Profile Management**: User profiles with stats and customization
- **Real-time Notifications**: Updates on petition progress and engagement

### Technology Stack
- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js (Email + Google OAuth)
- **AI**: OpenAI GPT-4 for report generation
- **Real-time**: Socket.io for live updates
- **Storage**: AWS S3 / Cloudinary for media

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- Google OAuth credentials
- OpenAI API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/ddkyoto/action-platform.git
cd action-platform
```

2. Install dependencies
```bash
npm install
```

3. Setup environment variables
```bash
cp .env.example .env.local
```
Fill in your credentials in `.env.local`

4. Setup database
```bash
npm run db:push
```

5. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
action-platform/
├── app/              # Next.js app directory
│   ├── api/         # API routes
│   ├── auth/        # Authentication pages
│   ├── petitions/   # Petition pages
│   ├── feed/        # Social feed
│   ├── events/      # Events
│   └── profile/     # User profile
├── components/       # React components
├── lib/             # Utilities and helpers
├── prisma/          # Database schema
├── public/          # Static files
└── types/           # TypeScript types
```

## Database Schema

- **User**: User accounts and profiles
- **Petition**: Petitions with metadata
- **Signature**: Signatures on petitions
- **Post**: Social feed posts
- **Event**: Community events
- **Report**: Generated AI reports
- **Notification**: User notifications

## API Documentation

See `/docs` directory for detailed API documentation.

## Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Create a Pull Request

## License

MIT License - see LICENSE file for details
