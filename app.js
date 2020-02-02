import express from "express";
import morgan from "morgan"; //middleware
import helmet from "helmet";//middleware 보안
import cookieParser from "cookie-parser";//middleware
import bodyParser from "body-parser";//middleware
import { userRouter } from "./router";

const app = express();

const handleHome = (req, res) => {res.send("Hi from Home!");}

const handleProfile = (req, res) =>{res.send("you are on my profile");}


app.use(cookieParser());//유저로부터받은 cookie이해를 위해
app.use(bodyParser.json({extended : true})); //서버가 유저로부터 받은 데이터 이해를 위해
app.use(bodyParser.urlencoded({extended : true})); //서버가 유저로부터 받은 데이터 이해를 위해
app.use(helmet());
app.use(morgan("dev"));


app.get('/',  handleHome);

app.get ("/profile", handleProfile);
app.use ("/user", userRouter);


export default app;