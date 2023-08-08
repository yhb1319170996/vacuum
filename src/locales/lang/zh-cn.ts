import type { LocaleMessages } from 'vue-i18n';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { I18nType } from '@/typings/system';

const locale: LocaleMessages<I18nType.Schema> = {
  message: {
    system: {
      title: '真空回流炉'
    },
    routes: {
      dashboard: {
        analysis: '主页'
      },
      heat: {
        homepage: '加热'
      },
      track: {
        navigation: '轨道'
      },
      nitrogen: {
        navigation: '氮气'
      },
      count: {
        navigation: '计数器'
      },
      product: {
        navigation: '进出板信号'
      },
      vacuum: {
        homepage: '真空'
      },
      system: {
        _value: '系统维护',
        navigation: '系统维护导航页',
        oil: '注油参数配置页',
        maintain: '维护倒计时提示页'
      },
      log: {
        _value: '系统日志',
        output: '行为日志输出页'
      },
      alarm: {
        _value: '报警管理',
        navigation: '系统报警导航页'
      },
      profile: {
        _value: '编辑profile',
        heat: '加热参数配置',
        track: '轨道参数配置',
        nitrogen: '氮气参数配置',
        vacuum: '真空参数配置'
      },
      user: {
        _value: '用户管理',
        home: '用户登录配置页',
        accredit: '授权组件配置页',
        other: '回流炉其他参数配置页'
      },
      ipconfig: {
        _value: 'IP管理',
        homepage: 'IP配置界面'
      },
      parameter: {
        _value: '系统重要参数配置',
        furnace: '炉区参数配置',
        system: '系统参数配置'
      },
      file: {
        _value: '文件保存',
        heat: '加热编辑',
        track: '轨道编辑',
        n2: '氮气编辑',
        vacuum: '真空编辑',
        mes: 'MES编辑'
      },
      about: '关于'
    }
  }
};

export default locale;
