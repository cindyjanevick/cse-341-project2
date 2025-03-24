const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info:{
        title: 'Students Api',
        description:'Students Api'
    },
    host: 'localhost:3001',
    schemes: ['https','http']

};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];
// const endpointsFiles = ['./routes/index.js', './routes/courses.js', './routes/students.js'];


//this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);