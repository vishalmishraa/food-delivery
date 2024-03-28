import dotenv from 'dotenv';
import express from 'express';
import calculatePriceRoutes from './routes/calculatePrice.routes.js';
import newOrganizationRoutes from './routes/newOrganization.routes.js';
import priceStructureRoutes from './routes/priceStructure.routes.js';

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/calculatePrice', calculatePriceRoutes);
app.use('/api/newOrganization', newOrganizationRoutes);
app.use('/api/priceStructure', priceStructureRoutes);

//* ************ midleware *************** */

app.use((err, req, res, next) => {//eslint-disable-line
    const statusCode = err.statusCode || 500;// 500 means internal server error
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on: http://localhost:3000');//eslint-disable-line
});
