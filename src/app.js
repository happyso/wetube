  
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import path from "path";
import MongoStore from "connect-mongo";
import { localMiddleware } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import apiRouter from "./routers/apiRouter";

import "./passport";

const app = express();
const CokieStore = MongoStore( session );

app.use( helmet() );
app.set( 'view engine', 'pug' );
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static(path.join(__dirname, "static")));
app.use( cookieParser() ); // 유저로부터받은 cookie이해를 위해
app.use( bodyParser.json() ); // 서버가 유저로부터 받은 데이터 이해를 위해
app.use( bodyParser.urlencoded( {
    extended: true
} ) ); // 서버가 유저로부터 받은 데이터 이해를 위해

app.use( morgan( 'dev' ) ); // logging
app.use( session( {
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CokieStore( {
        mongooseConnection: mongoose.connection
    } )
} ) );
app.use( passport.initialize() );
app.use( passport.session() );

app.use( localMiddleware );

app.use( routes.home, globalRouter );
app.use( routes.users, userRouter );
app.use( routes.videos, videoRouter );
app.use( routes.api, apiRouter );


export default app;

// mvc module data view look control funstion that looks for data
