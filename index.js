const express = require('express');
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const app = express();
require('./models/user')


//CONNECTING TO MONGODB
mongoose.connect(keys.mongoURI)
.then(() =>{
    console.log('MongoDB is connected');
})
.catch(err => {
    console.log('Database connection failed with error : '. err.message);
});


//REGISTERING ROUTES
routes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server has started and is listening on port : ', PORT)
});