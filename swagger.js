const swaggerAutogen = require('swagger-autogen')();    

const doc = {
    info: {
        title: 'Class API',
        description: 'API documentation for the Class application',
        version: '1.0.0',
    },
    host: 'https://crud-y8ei.onrender.com',
    
    schemes: ['https'],
};
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);