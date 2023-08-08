const alarm: AuthRoute.Route = {
  name: 'alarm',
  path: '/alarm',
  component: 'basic',
  children: [
    {
      name: 'alarm_navigation',
      path: '/alarm/navigation',
      component: 'self',
      meta: {
        title: '系统报警导航页',
				i18nTitle: 'message.routes.alarm.navigation',
        requiresAuth: true,
        icon: 'ci:mail-open'
      }
    }
  ],
  meta: {
    title: '报警管理',
		i18nTitle: 'message.routes.alarm._value',
    icon: 'ci:warning',
    order: 18
  }
};

export default alarm;
