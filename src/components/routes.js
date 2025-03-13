export const routes = {
  '/home': {
    template: 'poke-home',
    path: '/home',
    title: 'Home',
  },
  '/pokemons': {
    template: 'poke-list',
    path: '/pokemons',
    title: 'Pokemons',
  },
  '/pokemon/:id': {
    template: 'poke-detail',
    path: '/pokemon/:id',
    title: 'Pokemon Detail',
  },
  '/about': {
    template: 'about',
    path: '/about',
    title: 'About',
  },
};
