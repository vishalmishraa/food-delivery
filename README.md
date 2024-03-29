# Food delivery API

A REST API backend for a food delivery app using Node.js. The primary focus is on a dynamic pricing module to calculate the total cost of food delivery based on various factors.



## Project Setup

To set up the project, follow these steps:

1. Copy the provided `.env.example` file to `.env`.
2. Generate API keys for the `NeonDB for PostgreSQL`
    

3. Set up your project by running the following commands:

```bash
# Install dependencies
npm install

# Configure your DB using drizzle-ORM
drizzle-kit post:pg

# Bild command
npm run build

# Start command 
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.




## Technologies Used

### PostgreSQL by NeonDB
The robust backend relies on NeonDB, managed via Drizzle ORM. This ensures seamless handling of user and chat data.

### Swagger UI
Swagger follows the OpenAPI Specification (OAS), which is a standard for describing RESTful APIs in a machine-readable and human-readable format. Swagger allows developers to create interactive and dynamic documentation for their APIs
