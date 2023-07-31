import Router from '@koa/router';
import { getAllLondonSpots, getOneLondonSpot } from './Controllers.js';


const router = new Router();


router.get('/london', getAllLondonSpots);

router.get('/london/details/:_id', getOneLondonSpot);

export default router;