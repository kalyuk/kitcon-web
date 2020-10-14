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
import { DatabusService } from '@kitcon/node/services/abstract/databus.service';
import { RedisDatabusService } from '@kitcon/node/services/redis-databus.service';
import { ApiService } from '@kitcon/ui/services/api.service';
import { ApiSsrService } from '@kitcon/ui/services/api-ssr.service';

const app = express();

const currentPath = path.join(global.ROOT_PATH, 'dist', 'server');
const publicPath = path.join(global.ROOT_PATH, 'dist', 'public');

app.engine('mst', mustacheExpress());
app.set('view engine', 'mst');
app.set('views', currentPath + '/views');


app.use(express.static(publicPath));

app.get('/favicon.ico', (req, res) => res.status(500).end());


Container.set(DatabusService, () => new RedisDatabusService("WEB-KITCON"));
Container.set(ApiService, () => new ApiSsrService());

const container = Container.getContext();
const redisDatabuService = container.get<RedisDatabusService>(DatabusService);
redisDatabuService.listen();

app.get('*', async (request: express.Request, response: express.Response) => {

    const context: any = {};
    const session = new Container();
    const locationService = session.get<LocationService>(LocationService);
    const dataService = session.get<DataService>(DataService);

    locationService.handleChangeLocation({
        pathname: request.path,
        search: request.originalUrl.replace(request.path, '')
    });

    await dataService.load(PAGES);

    const body = renderToString(
        <Context.Provider value={session}>
            <StaticRouter context={context} location={request.url}>
                {renderRoutes(PAGES)}
            </StaticRouter>
        </Context.Provider>
    );

    session.destroy();

    response.render('index', { body });
});

app.listen(process.env.PORT, () => {
    console.info(`application started at ${process.env.PORT} port`);
});
