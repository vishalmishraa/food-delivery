import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import calculatePriceRoutes from './routes/calculatePrice.routes';
import OrganizationRoutes from './routes/Organization.routes';
import priceStructureRoutes from './routes/priceStructure.routes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/calculatePrice', calculatePriceRoutes);
app.use('/api/organizations', OrganizationRoutes);
app.use('/api/priceStructure', priceStructureRoutes);

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
