import express from 'express';
import morgan from 'morgan';
import methodOverride from 'method-override';
import "./db/connection.js"

import fruitsRouter from './controllers/fruits.js';

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan('dev'));

// Routes
app.use("/", fruitsRouter);


app.listen(3000, () => {
  console.log('Listening on port 3000');
});

