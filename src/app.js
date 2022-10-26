import express from 'express';
import handlebars from 'express-handlebars';
import { __dirname } from './utils.js';
import viewsRouter from './routes/views.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mongoose from 'mongoose';
import config from './config/config.js';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 8080;

const connection = mongoose.connect (`mongodb+srv://${config.mongo.USER}:${config.mongo.PASSWORD}@codercluster.skwuuph.mongodb.net/${config.mongo.DATABASE}?retryWrites=true&w=majority`, error => {
    if(error) console.log(error);
    else console.log('Connected to Atlas');
});

app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

initializePassport();
app.use(passport.initialize());
app.use('/', viewsRouter);
app.use('/api/sessions', sessionsRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));