// imports and configs
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const { connectDB } = require('./configs/database.config');


// question route
const questionRoutes = require('./routes/question.routes');

// query route
const queryRoutes = require('./routes/query.routes');

// test route
const testRoutes = require('./routes/test.routes');


// application setup
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// database connection
connectDB();


// routes
app.use('/api/question', questionRoutes);
app.use('/api/query', queryRoutes);
app.use('/api/test', testRoutes);



// server setup
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port https://localhost:${PORT}`);
});

