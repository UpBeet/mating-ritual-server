import root from './controllers/index.js';

const routes = {
  routes: [
    {
      path: '/',
      method: 'GET',
      handler: root.GET,
    },
  ],
};

export default routes;
