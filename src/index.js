// imports and configs
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const {connectDB} = require('./configs/database.config');
// test route
const testRoutes = require('./routes/test.routes');
// question route
const questionRoutes = require('./routes/question.routes');


// application setup
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// database connection
connectDB();


// routes
app.use('/api/test', testRoutes);
app.use('/api/question', questionRoutes);


// server setup
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port https://localhost:${PORT}`);
});

