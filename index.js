
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./global/errorHandler');

const app = express();
// Import Routes
const authRoute = require('./routes/Auth.Routes');
const postRoute = require('./routes/Post.Route');

dotenv.config();

// Connect to my mongo DB
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(
  process.env.DB_CONNECT,
  //{useNewUrlParser:true},
  () => console.log('Connected to db!'), (err) => {
    next(err);
  }
);

//  Middleware
app.use(express.json());

// Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

// global error handler
app.use(errorHandler);

app.listen(3000, () => console.log('Server Up and running at port 3000'));