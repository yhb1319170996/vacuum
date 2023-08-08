const parameter: AuthRoute.Route = {
  name: 'file',
  path: '/file',
  component: 'basic',
  children: [
    {
      name: 'file_heat',
      path: '/file/heat',
      component: 'self',
      meta: {
        title: '加热编辑',
				i18nTitle: 'message.routes.file.heat',
        requiresAuth: true,
        icon: 'ic-round-settings-suggest'
      }
    },
    {
      name: 'file_track',
      path: '/file/track',
      component: 'self',
      meta: {
        title: '轨道编辑',
				i18nTitle: 'message.routes.file.track',
        requiresAuth: true,
        icon: 'ic-round-settings-suggest'
      }
    },
    {
      name: 'file_n2',
      path: '/file/n2',
      component: 'self',
      meta: {
        title: '氮气编辑',
				i18nTitle: 'message.routes.file.n2',
        requiresAuth: true,
        icon: 'ic-round-settings-suggest'
      }
    },
    {
      name: 'file_vacuum',
      path: '/file/vacuum',
      component: 'self',
      meta: {
        title: '真空编辑',
				i18nTitle: 'message.routes.file.vacuum',
        requiresAuth: true,
        icon: 'ic-round-settings-suggest'
      }
    },
    {
      name: 'file_mes',
      path: '/file/mes',
      component: 'self',
      meta: {
        title: 'MES编辑',
				i18nTitle: 'message.routes.file.mes',
        requiresAuth: true,
        icon: 'ic-round-settings-suggest'
      }
    }
  ],
  meta: {
    title: '文件保存',
		i18nTitle: 'message.routes.file._value',
    icon: 'mdi-file-document-plus',
    order: 22
  }
};

export default parameter;
