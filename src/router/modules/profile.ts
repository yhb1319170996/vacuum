const profile: AuthRoute.Route = {
  name: 'profile',
  path: '/profile',
  component: 'basic',
  children: [
    {
      name: 'profile_heat',
      path: '/profile/heat',
      component: 'self',
      meta: {
        title: '加热参数配置',
				i18nTitle: 'message.routes.profile.heat',
        requiresAuth: true,
        icon: 'ic-round-settings-suggest'
      }
    },
    {
      name: 'profile_track',
      path: '/profile/track',
      component: 'self',
      meta: {
        title: '轨道参数配置',
				i18nTitle: 'message.routes.profile.track',
        requiresAuth: true,
        icon: 'ic-round-settings-suggest'
      }
    },
    {
      name: 'profile_nitrogen',
      path: '/profile/nitrogen',
      component: 'self',
      meta: {
        title: '氮气参数配置',
				i18nTitle: 'message.routes.profile.nitrogen',
        requiresAuth: true,
        icon: 'ic-round-settings-suggest'
      }
    },
    {
      name: 'profile_vacuum',
      path: '/profile/vacuum',
      component: 'self',
      meta: {
        title: '真空参数配置',
				i18nTitle: 'message.routes.profile.vacuum',
        requiresAuth: true,
        icon: 'ic-round-settings-suggest'
      }
    }
  ],
  meta: {
    title: '编辑profile',
		i18nTitle: 'message.routes.profile._value',
    icon: 'mdi-file-edit',
    order: 18
  }
};

export default profile;
