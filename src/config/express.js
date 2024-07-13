import * as http from 'http';

import ALBUM_ROUTER from '../router/album.router';
import CONTACT_ROUTER from '../router/contact.router';
import DISCUSSIONS_SOCKET from '../socket/discussion.socket';
import DISCUSSION_ROUTER from '../router/discussion.router';
import FILMS_AND_SERIES_ROUTER from '../router/film-and-serie.router';
import GAME_ROUTER from '../router/game.router';
import POKEMONS_ROUTER from '../router/pokemon.router';
import SHOP_ROUTER from '../router/shop.router';
import VIEW_ROUTER from '../router/html.router';
import YAML from 'yamljs';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import io from 'socket.io';
import optionsSwagger from './doc/swagger';
import swaggerUi from 'swagger-ui-express';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(SHOP_ROUTER);
app.use(ALBUM_ROUTER);
app.use(GAME_ROUTER);
app.use(CONTACT_ROUTER);
app.use(POKEMONS_ROUTER);
app.use(FILMS_AND_SERIES_ROUTER);
app.use(DISCUSSION_ROUTER);
app.use(VIEW_ROUTER);

const swaggerDocument = YAML.load(__dirname + '/doc/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, optionsSwagger));

const _static_dirname = __dirname.replace('/src/config', '');
app.use('/public', express.static(_static_dirname + '/public'));

export const server = http.createServer(app);

const socketIo = io(server, {
    cors: {
        credentials: false
    }
});

socketIo
    .of('discussions')
    .on('connection', DISCUSSIONS_SOCKET);

export default server;