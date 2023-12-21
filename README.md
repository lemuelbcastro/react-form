# React Form

A simple app built using [React](https://react.dev/), [Express](https://expressjs.com/), and [Node](https://nodejs.org/).

## Installation

Navigate to the root directory and run:

```bash
npm install
```

Run the [Prisma](https://www.prisma.io/) migration:

```bash
cd server
cp .env.example .env
npx prisma migrate dev
```

## Scripts

### `npm run dev`

Runs the app in development mode.

### `npm run dev:client`

Runs the client in development mode.

### `npm run dev:server`

Runs the server in development mode.

### `npm run format`

Formats the source files.

### `npm run lint`

Identifies all lint errors/warnings.

### `npm run test:client`

Runs all the tests in the client directory.

### `npm run test:server`

Runs all the tests in the server directory.
