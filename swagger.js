const swaggerAutogen = require('swagger-autogen')();    

const doc = {
    info: {
        title: 'School Class API',
        description: 'API documentation for the School Class application',
        version: '2.12.77',
    },
    host: 'crud-y8ei.onrender.com',
    "basePath": "/api",
    
    schemes: ['https'],
};
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);