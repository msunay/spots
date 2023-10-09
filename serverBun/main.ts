import Koa from 'koa'
import bodyparser from 'koa-bodyparser';
import cors from '@koa/cors'

const app = new Koa()

const PORT = 3000;

app
  .use(bodyparser())
  .use(cors())
  // .use(router.routes())
  // .use(router.allowedMethods());


app.listen(PORT, () => console.log(`server running at http://127.0.0.1:${PORT}`));