import type { LocaleMessages } from 'vue-i18n';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { I18nType } from '@/typings/system';

const locale: LocaleMessages<I18nType.Schema> = {
  message: {
    system: {
      title: 'vacuum reflow oven'
    },
    routes: {
      dashboard: {
        analysis: 'Analysis'
      },
      heat: {
        homepage: 'Heat'
      },
      track: {
        navigation: 'Track'
      },
      nitrogen: {
        navigation: 'Nitrogen'
      },
      count: {
        navigation: 'Count'
      },
      product: {
        navigation: 'Product'
      },
      vacuum: {
        homepage: 'Vacuum'
      },
      system: {
        _value: 'System maintenance',
        navigation: 'Navigation page',
        oil: 'Oil',
        maintain: 'Maintenance countdown'
      },
      log: {
        _value: 'System log',
        output: 'Behavior log'
      },
      alarm: {
        _value: 'Alarm management',
        navigation: 'Alarm navigation'
      },
      profile: {
        _value: 'Edit profile',
        heat: 'Heating configuration',
        track: 'Track configuration',
        nitrogen: 'Nitrogen configuration',
        vacuum: 'Vacuum configuration'
      },
      user: {
        _value: 'User Management',
        home: 'User login configuration',
        accredit: 'Authorization component',
        other: 'Other Parameters'
      },
      ipconfig: {
        _value: 'IP management',
        homepage: 'IP configuration'
      },
      parameter: {
        _value: 'Important system parameter',
        furnace: 'Furnace zone parameter',
        system: 'System parameter configuration'
      },
      file: {
        _value: 'File save',
        heat: 'Heating edit',
        track: 'Track edit',
        n2: 'Nitrogen Edit',
        vacuum: 'Vacuum editor',
        mes: 'MES Edit'
      },
      about: 'About'
    }
  }
};

export default locale;
