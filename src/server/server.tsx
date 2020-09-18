import 'reflect-metadata';
import * as express from 'express';
import * as path from 'path';
import * as mustacheExpress from 'mustache-express';

import * as React from 'react';
import { StaticRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import { renderToString } from 'react-dom/server';
import { PAGES } from '../application/pages';
import { Container } from '@kitcon/core/container';
import { Context } from '@kitcon/ui/context';
import { LocationService } from '@kitcon/ui/services/location.service';
import { DataService } from '@kitcon/ui/services/data.service';

const app = express();

const currentPath = path.join(global.ROOT_PATH, 'dist', 'server');
const publicPath = path.join(global.ROOT_PATH, 'dist', 'public');

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', currentPath + '/views');


app.use(express.static(publicPath));

app.get('/favicon.ico', (req, res) => res.status(500).end());

app.get('*', async (request: express.Request, response: express.Response) => {

    const context: any = {};
    const container = new Container();
    const locationService = container.get<LocationService>(LocationService);
    const dataService = container.get<DataService>(DataService);

    locationService.handleChangeLocation({
        pathname: request.path,
        search: request.originalUrl.replace(request.path, '')
    });

    await dataService.load(PAGES);

    const body = renderToString(
        <Context.Provider value={container}>
            <StaticRouter context={context} location={request.url}>
                {renderRoutes(PAGES)}
            </StaticRouter>
        </Context.Provider>
    );

    container.destroy();

    response.render('index', { body });
});

app.listen(process.env.PORT, () => {
    console.info(`application started at ${process.env.PORT} port`);
});
