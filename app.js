
const createError     = require('http-errors');
const path            = require('path');
const app             = require('express')();
const bodyParser      = require('body-parser');
const indexRoutes     = require('./routes');
const providersRoutes = require('./routes/provider');
const routeCustomer   = require('./routes/customer');
const session         = require('express-session');

//helpers
app.locals.formatCurency = require('./helpers/formatCurency.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
   secret: "express secret key",
   resave: false,
   saveUninitialized: true
}));

// Routes
app.use('/', indexRoutes);
app.use('/provider', providersRoutes);
app.use('/customer', routeCustomer);

// -----------------------------------------------------------------------------
module.exports = app;
