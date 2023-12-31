const product: AuthRoute.Route = {
  name: 'product_navigation',
  path: '/product/navigation',
  component: 'self',
  meta: {
    title: '进出板信号',
		i18nTitle: 'message.routes.product.navigation',
    requiresAuth: true,
    singleLayout: 'basic',
    icon: 'ph:traffic-signal-duotone',
    order: 6
  }
};

export default product;
