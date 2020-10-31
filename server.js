const express = require('express'); //old way
const connectDB = require('./config/db');
const path = require('path');
const app = express();

connectDB();

//initialize middleware
app.use(express.json());

// Define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/builds', require('./routes/builds'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
