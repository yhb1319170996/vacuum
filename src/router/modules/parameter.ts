const parameter: AuthRoute.Route = {
  name: 'parameter',
  path: '/parameter',
  component: 'basic',
  children: [
    {
      name: 'parameter_furnace',
      path: '/parameter/furnace',
      component: 'self',
      meta: {
        title: '炉区参数配置',
        i18nTitle: 'message.routes.parameter.furnace',
        requiresAuth: true,
        icon: 'material-symbols:settings-overscan-outline-sharp'
      }
    },
    {
      name: 'parameter_system',
      path: '/parameter/system',
      component: 'self',
      meta: {
        title: '系统参数配置',
        i18nTitle: 'message.routes.parameter.system',
        requiresAuth: true,
        icon: 'material-symbols:settings-alert'
      }
    }
  ],
  meta: {
    title: '系统重要参数配置',
    i18nTitle: 'message.routes.parameter._value',
    icon: 'material-symbols:settings-outline-rounded',
    order: 21
  }
};

export default parameter;
