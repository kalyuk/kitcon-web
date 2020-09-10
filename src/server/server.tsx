import * as express from 'express'; 
import * as path from 'path';
import * as mustacheExpress from 'mustache-express';

const app = express();

const currentPath = path.join(global.ROOT_PATH, 'dist', 'server');
const publicPath = path.join(global.ROOT_PATH, 'dist', 'public');

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', currentPath + '/views');


app.use(express.static(publicPath));

app.get('/favicon.ico', (req, res) => res.status(500).end());

app.get('*', async (request: express.Request, response: express.Response) => {
  response.render('index', { });
});

app.listen(process.env.PORT, () => {
  console.info(`application started at ${process.env.PORT} port`);
});
