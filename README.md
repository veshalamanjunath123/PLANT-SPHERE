# PlantSphere

A full-stack e-commerce platform for plants with a React frontend and Spring Boot backend.

## Project Structure

- `plantsphere-frontend/` - React + Vite frontend application
- `plantsphere-backend/` - Spring Boot backend API

## Frontend Tech Stack

- React 19
- Vite
- Bootstrap 5
- React Router
- Axios

## Backend Tech Stack

- Java 17+
- Spring Boot
- Spring Security
- JPA/Hibernate
- JWT Authentication

## Local Development

### Frontend
```bash
cd plantsphere-frontend
npm install
npm run dev
```

### Backend
```bash
cd plantsphere-backend
mvn spring-boot:run
```

## Deployment

### Vercel (Frontend)

The frontend is configured for Vercel deployment. Vercel will automatically:
- Install dependencies in `plantsphere-frontend/`
- Build the project with `npm run build`
- Serve from `plantsphere-frontend/dist/`

To deploy:
1. Connect your GitHub repository to Vercel
2. Set root directory to `.`
3. Vercel will detect the `vercel.json` configuration
4. Deploy!

### Backend

The Spring Boot backend can be deployed to:
- Heroku
- AWS Elastic Beanstalk
- DigitalOcean App Platform
- Render
- Railway

## Environment Variables

Frontend (.env):
```
VITE_API_URL=http://localhost:8080/api
```

Backend (application.properties):
```
server.port=8080
spring.datasource.url=jdbc:h2:mem:testdb
spring.jpa.hibernate.ddl-auto=update
```

## Features

- Product catalog with categories
- Shopping cart functionality
- User authentication (JWT)
- Order management
- Admin panel for product management
- Wishlist functionality
- Product reviews
