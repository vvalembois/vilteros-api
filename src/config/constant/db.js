import path from 'path';

const dataBddDirectory = __dirname.replace('constant', '');

export const gamesFiles = path.resolve(dataBddDirectory, 'data/games.json');

export const seriesFiles = path.resolve(dataBddDirectory, 'data/series.json');

export const albumsFiles = path.resolve(dataBddDirectory, 'data/albums.json');

export const articleFiles = path.resolve(dataBddDirectory, 'data/articles.json');

export const internsFiles = path.resolve(dataBddDirectory, 'data/interns.json');

export const pokemonsFiles = path.resolve(dataBddDirectory, 'data/pokemons.json');

export const discussionFiles = path.resolve(dataBddDirectory, 'data/discussion.json');