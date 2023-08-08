const log: AuthRoute.Route = {
  name: 'log',
  path: '/log',
  component: 'basic',
  children: [
    {
      name: 'log_output',
      path: '/log/output',
      component: 'self',
      meta: {
				i18nTitle: 'message.routes.log.output',
        title: '行为日志输出页',
        requiresAuth: true,
        icon: 'ci:youtube'
      }
    }
  ],
  meta: {
    title: '系统日志',
		i18nTitle: 'message.routes.log._value',
    icon: 'ci:calendar-plus',
    order: 17
  }
};

export default log;
