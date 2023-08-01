import Router from '@koa/router';
import { addNewSpot, getAllLondonSpots, getOneLondonSpot } from './Controllers.js';


const router = new Router();


router.get('/london', getAllLondonSpots);

router.get('/london/details/:_id', getOneLondonSpot);

router.post('/london', addNewSpot);

export default router;