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

### Render (Backend) - Recommended

Render provides a free tier for hosting the Spring Boot backend with PostgreSQL database.

To deploy:
1. Go to [render.com](https://render.com) and sign up
2. Click "New +" → "Blueprint"
3. Connect your GitHub repository: `veshalamanjunath123/PLANT-SPHERE`
4. Render will detect the `render.yaml` configuration
5. Click "Apply Blueprint" to deploy

This will create:
- A PostgreSQL database (free tier)
- A Docker web service running your Spring Boot backend (free tier)

After deployment, Render will provide a URL like: `https://plantsphere-backend.onrender.com`

### Alternative Backend Deployment Options

The Spring Boot backend can also be deployed to:
- Railway (railway.app)
- Heroku (heroku.com)
- AWS Elastic Beanstalk
- DigitalOcean App Platform

## Environment Variables

### Frontend (.env)

For local development:
```
VITE_API_BASE_URL=http://localhost:8080/api
```

For production (after deploying backend):
```
VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
```

### Backend (application.properties)

Local development:
```
server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/plant_sphere
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

Render (automatically configured via render.yaml):
- PostgreSQL database connection provided by Render
- Environment variables auto-populated from database

## Features

- Product catalog with categories
- Shopping cart functionality
- User authentication (JWT)
- Order management
- Admin panel for product management
- Wishlist functionality
- Product reviews

## Troubleshooting Connection Errors

If you see "Unable to Load Specimens" or "Unable to fetch plants. Is the backend running?":

1. **Check if backend is running locally:**
   ```bash
   cd plantsphere-backend
   mvn spring-boot:run
   ```

2. **Verify frontend environment variable:**
   - Check `plantsphere-frontend/.env` (local) or Vercel environment variables (production)
   - Ensure `VITE_API_BASE_URL` points to your backend URL

3. **For production deployment:**
   - Deploy backend to Render first and get the URL
   - Update Vercel environment variable `VITE_API_BASE_URL` with the backend URL
   - Redeploy Vercel frontend

4. **Test backend API directly:**
   ```bash
   curl http://localhost:8080/api/products
   ```
