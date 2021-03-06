'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const { sequelize } = require('./models');
const users = require('./routes/users');
const courses = require('./routes/courses');
const cors = require('cors');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

const corsOptions = {
  exposedHeaders: 'Location',
};

app.use(cors(corsOptions));
app.use(express.json());

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// sets /api route for routes
app.use('/api/users', users);
app.use('/api/courses', courses);

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);
let server;
(async() => {
  try {
    await sequelize.authenticate();    
    console.log("Connection successful!");

    // sync before starting to listen to the port
    await sequelize.sync();
    console.log("Sync successful!");

    // start listening on our port
    server = app.listen(app.get('port'), () => {
      console.log(`Express server is listening on port ${server.address().port}`);
    });
  } catch (error) {
    console.error("Unable to connect!");
  }
})();


