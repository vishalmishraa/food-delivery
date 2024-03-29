import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        version: 'v1.0.0',
        title: 'Food Delivery API',
        description: 'Implementation of a Food Delivery price calculator API',
    },
    servers: [
        {
            url: 'http://localhost:5000',
            description: ''
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
            }
        }
    }
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/calculatePrice.routes.ts', './routes/Organization.routes.ts', './routes/Pricing.routes.ts ', './routes/Item.routes.ts'];

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc);