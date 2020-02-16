import mongooes from "mongoose";
import dotenv from "dotenv";

dotenv.config();


mongooes.connect(
    process.env.MONGO_URL,
    {
    useNewUrlParser: true,
    useFindAndModify: false
    }
);

const db = mongooes.connection;

const handleOpen = () => console.log("connect to DB");
const handleError = error => console.log(`X Error on DB connection:${error}`);

db.once("open", handleOpen);
db.on("error",handleError);