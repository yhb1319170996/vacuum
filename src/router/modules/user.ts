const user: AuthRoute.Route = {
  name: 'user',
  path: '/user',
  component: 'basic',
  children: [
    {
      name: 'user_home',
      path: '/user/home',
      component: 'self',
      meta: {
        title: '用户登录配置页',
        i18nTitle: 'message.routes.user.home',
        requiresAuth: true,
        icon: 'mdi:login-variant'
      }
    },
    {
      name: 'user_accredit',
      path: '/user/accredit',
      component: 'self',
      meta: {
        title: '授权组件配置页',
        i18nTitle: 'message.routes.user.accredit',
        requiresAuth: true,
        icon: 'fluent-mdl2:permissions-solid'
      }
    },
    {
      name: 'user_other',
      path: '/user/other',
      component: 'self',
      meta: {
        title: '回流炉其他参数配置页',
        i18nTitle: 'message.routes.user.other',
        requiresAuth: true,
        icon: 'fluent-mdl2:permissions-solid'
      }
    }
  ],
  meta: {
    title: '用户管理',
    i18nTitle: 'message.routes.user._value',
    icon: 'ph:user-bold',
    order: 19
  }
};

export default user;
