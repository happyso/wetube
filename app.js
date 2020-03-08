import express from 'express';
import morgan from 'morgan'; // middleware
import helmet from 'helmet'; // middleware 보안
import cookieParser from 'cookie-parser'; // middleware
import bodyParser from 'body-parser'; // middleware
import {
    localMiddleware
} from './middlewares';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import globalRouter from './routers/globalRouter';
import routes from './routes';


const app = express();

app.use(helmet());
app.set('view engine', 'pug');
app.use('/uploads', express.static('uploads'));
app.use('/static', express.static('static'));
app.use(cookieParser()); // 유저로부터받은 cookie이해를 위해
app.use(bodyParser.json()); // 서버가 유저로부터 받은 데이터 이해를 위해
app.use(bodyParser.urlencoded({
    extended: true
})); // 서버가 유저로부터 받은 데이터 이해를 위해
app.use(morgan('dev')); // logging 

app.use(localMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);


export default app;

// mvc module data view look control funstion that looks for data