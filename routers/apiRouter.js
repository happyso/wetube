import express from 'express';
import routes from '../routes';
import {
  reqisterView
} from '../controller/videoController';


const apiRouter = express.Router();

apiRouter.get( routes.registerView, reqisterView );


export default apiRouter;
