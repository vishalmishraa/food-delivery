import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import calculatePriceRoutes from './routes/cost.routes';
import OrganizationRoutes from './routes/Organization.routes';
import priceStructureRoutes from './routes/Pricing.routes';
import ItemRoutes from './routes/Item.routes';
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', 
            calculatePriceRoutes, 
            OrganizationRoutes, 
            priceStructureRoutes, 
            ItemRoutes
);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

//* ************ midleware *************** */

app.use((err: any, req: Request, res: Response, next: NextFunction) => { //eslint-disable-line
    const statusCode = err.statusCode || 500; // 500 means internal server error
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);//eslint-disable-line
});
