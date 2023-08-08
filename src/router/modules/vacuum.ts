const vacuum: AuthRoute.Route = {
  name: 'vacuum_homepage',
  path: '/vacuum/homepage',
  component: 'self',
  meta: {
    title: '真空',
		i18nTitle: 'message.routes.vacuum.homepage',
    requiresAuth: true,
    singleLayout: 'basic',
    icon: 'mdi:vacuum',
    order: 7
  }
};
export default vacuum;
