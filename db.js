import mongooes from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongooes.connect(
    process.env.MONGO_URL,
    {
    useNewUrlParser: true,
    useFindAndModify: false
    }
);

const db = mongooes.connection;

const handleOpen = () => console.log( '✅ Connect to DB' );
const handleError = error => console.log( `❌  Error on DB connection:${error}` );

db.once( 'open', handleOpen );
db.on( 'error', handleError );


/*

> show dbs
admin    0.000GB
config   0.000GB
local    0.000GB
we-tube  0.000GB

> use we-tube
switched to db we-tube

> show collections
sessions
users
videos

> db.videos.find({})
and worked!
 */
