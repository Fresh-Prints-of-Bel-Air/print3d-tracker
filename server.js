const express = require('express'); //old way
//const connectDB = require('./config/db'); //commented out for heroku environment variables
const connectDBProduction = require('./configProduction/dbProduction');
const path = require('path');
const app = express();

//
//connectDB();

connectDBProduction();


//initialize middleware
app.use(express.json());

// Define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/builds', require('./routes/builds'));
app.use('/api/admin', require('./routes/admin'));


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
