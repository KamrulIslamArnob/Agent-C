const express = require('express');
const app = express();
require('dotenv').config();
const testRoutes = require('./modules/test/routes/test.routes');

// Supabase client setup

app.use(express.json());

app.use('/api/test', testRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
