const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

// CORS options
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.json());
// app.use((req, res, next)=> {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
//     );
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST,PUT, DELETE, OPTIONS');
//     next();
// });



//import and use routes
app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err){
        console.log(err);
    }
    else {
        app.listen(port, () => {console.log(`Database is listening and node Running on port ${port}`)});
    }
});

