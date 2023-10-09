import Router from '@koa/router';
import { getAllLondonSpots, getOneLondonSpot, addNewSpot } from './controllers';

const router = new Router();

router.get('/london', getAllLondonSpots);

router.get('/london/details/:_id', getOneLondonSpot);

router.post('/london', addNewSpot);

export default router;