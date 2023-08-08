const ipconfig: AuthRoute.Route = {
  name: 'ipconfig',
  path: '/ipconfig',
  component: 'basic',
  children: [
    {
      name: 'ipconfig_homepage',
      path: '/ipconfig/homepage',
      component: 'self',
      meta: {
        title: 'IP配置界面',
				i18nTitle: 'message.routes.ipconfig.homepage',
        requiresAuth: true,
        icon: 'mdi:map-marker-multiple'
      }
    }
  ],
  meta: {
    title: 'IP管理',
		i18nTitle: 'message.routes.ipconfig._value',
    icon: 'material-symbols:bring-your-own-ip',
    order: 20
  }
};

export default ipconfig;
