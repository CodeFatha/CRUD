const swaggerAutogen = require('swagger-autogen')();    

const doc = {
    info: {
        title: 'Class API',
        description: 'API documentation for the Class application',
        version: '1.0.0',
    },
    host: 'localhost:3000',
    
    schemes: ['https'],
};
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);