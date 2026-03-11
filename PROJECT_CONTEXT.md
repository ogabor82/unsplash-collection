# Unsplash Collection Project Context

## Stack

- Frontend: React + TypeScript + Vite
- Backend: NestJS + Prisma
- Database: SQLite in development, PostgreSQL in production

## Architecture

- client: React frontend application
- server: NestJS REST API
- backend proxies Unsplash API requests
- database stores collections and saved images
- frontend never calls Unsplash directly with secret keys

## Main features

- search images via Unsplash
- fetch image details
- create, update, delete collections
- save images into collections
- remove images from collections

## Code style

- keep frontend feature-based
- keep backend module-based
- use DTOs in NestJS
- keep logic in services, controllers thin
- Prisma is the only DB access layer

## Database modeling rules

- store Unsplash images in a dedicated Image table
- never duplicate the same Unsplash image by unsplashId
- use a join table between collections and images
- one image can belong to multiple collections
