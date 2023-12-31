const count: AuthRoute.Route = {
  name: 'count_navigation',
  path: '/count/navigation',
  component: 'self',
  meta: {
    title: '计数器',
		i18nTitle: 'message.routes.count.navigation',
    requiresAuth: true,
    singleLayout: 'basic',
    icon: 'material-symbols:counter-8-outline',
    order: 5
  }
};

export default count;
