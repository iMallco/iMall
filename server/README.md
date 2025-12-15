# iMall Backend Server

Express + TypeScript backend for the iMall application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration

## Development

Start the development server with hot reload:
```bash
npm run dev
```

The server will run on `http://localhost:5000` by default.

## Build

Build the TypeScript code to JavaScript:
```bash
npm run build
```

## Production

Start the production server:
```bash
npm start
```

## Scripts

- `npm run dev` - Start development server with nodemon
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run clean` - Remove build directory
- `npm run rebuild` - Clean and rebuild

## Project Structure

```
server/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Express middleware
│   ├── models/         # Data models
│   ├── routes/         # API routes
│   ├── types/          # TypeScript types/interfaces
│   └── index.ts        # Application entry point
├── dist/               # Compiled JavaScript (generated)
├── .env                # Environment variables
├── .env.example        # Example environment variables
├── nodemon.json        # Nodemon configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies and scripts
```

## API Endpoints

### Health Check
- `GET /health` - Server health status

### Base Route
- `GET /` - API welcome message

## Environment Variables

See `.env.example` for all available environment variables.
