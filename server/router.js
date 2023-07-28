import Router from '@koa/router';
import { getAllLocations } from './Controllers.js';


const router = new Router();


router.get('/london', getAllLocations);


export default router;