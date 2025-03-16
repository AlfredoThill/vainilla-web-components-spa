import { PokeList, PokeHome, PokeDetail, PokeEdit } from './../components/pokemons';

export const routes = {
  '/home': {
    template: PokeHome.tagName,
    path: '/home',
    title: 'Home',
  },
  '/pokemons': {
    template: PokeList.tagName,
    path: '/pokemons',
    title: 'Pokemons',
  },
  '/pokemon/:id': {
    template: PokeDetail.tagName,
    path: '/pokemon/:id',
    title: 'Pokemon Detail',
  },
  '/pokemon/:id/edit': {
    template: PokeEdit.tagName,
    path: '/pokemon/:id/edit',
    title: 'Pokemon Edit',
  },
  '/about': {
    template: 'about',
    path: '/about',
    title: 'About',
  },
};
