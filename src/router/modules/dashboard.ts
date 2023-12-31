const dashboard: AuthRoute.Route = {
  name: 'dashboard_analysis',
  path: '/dashboard/analysis',
  component: 'self',
  meta: {
    title: '主页',
		i18nTitle: 'message.routes.dashboard.analysis',
    requiresAuth: true,
    singleLayout: 'basic',
    icon: 'material-symbols:cloud-domains',
    order: 1
  }
};

export default dashboard;
