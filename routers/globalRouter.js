import express from 'express';
import routes from '../routes';
import { getLogin, postLogin, getJoin, postJoin, logout } from '../controller/userController';
import { home, search } from '../controller/videoController';
import { onlyPublic } from '../middlewares';

const globalRouter = express.Router();

globalRouter.get( routes.home, home );
globalRouter.get( routes.search, search );

globalRouter.get( routes.join, onlyPublic, getJoin );
globalRouter.post( routes.join, onlyPublic, postJoin, postLogin );

globalRouter.get( routes.login, onlyPublic, getLogin );
globalRouter.post( routes.login, onlyPublic, postLogin );

globalRouter.get( routes.logout, onlyPublic, logout );


export default globalRouter;
