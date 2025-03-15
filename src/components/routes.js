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
  '/pokemon/:id/edit': {
    template: 'poke-edit',
    path: '/pokemon/:id/edit',
    title: 'Pokemon Edit',
  },
  '/about': {
    template: 'about',
    path: '/about',
    title: 'About',
  },
};
