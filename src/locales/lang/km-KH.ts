import type { LocaleMessages } from 'vue-i18n';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { I18nType } from '@/typings/system';

const locale: LocaleMessages<I18nType.Schema> = {
  message: {
    system: {
      title: 'ប្រព័ន្ធគ្រប់គ្រង'
    },
    routes: {
      dashboard: {
        analysis: 'ផ្ទាំងវិភាគ'
      },
      heat: {
        homepage: 'ថការ​ផ្លាស់ទី'
      },
      track: {
        navigation: 'បទ'
      },
      nitrogen: {
        navigation: 'អាសូត'
      },
      count: {
        navigation: 'រាប់'
      },
      product: {
        navigation: 'ផលិតផល'
      },
      vacuum: {
        homepage: 'បូមធូលី'
      },
      system: {
        _value: 'ការថែរក្សាប្រព័ន្ធ',
        navigation: 'ទំព័ររុករក',
        oil: 'ប្រេង',
        maintain: 'ការរាប់ថយក្រោយនៃការថែទាំ'
      },
      log: {
        _value: 'កំណត់ហេតុប្រព័ន្ធ',
        output: 'កំណត់ហេតុអាកប្បកិរិយា'
      },
      alarm: {
        _value: 'ការគ្រប់គ្រងសំឡេងរោទិ៍',
        navigation: 'ការរុករកសំឡេងរោទិ៍'
      },
      profile: {
        _value: 'កែទម្រង់',
        heat: 'ការកំណត់រចនាសម្ព័ន្ធកំដៅ',
        track: 'តាមដានការកំណត់រចនាសម្ព័ន្ធ',
        nitrogen: 'ការកំណត់រចនាសម្ព័ន្ធអាសូត',
        vacuum: 'ការកំណត់រចនាសម្ព័ន្ធបូមធូលី'
      },
      user: {
        _value: 'ការគ្រប់គ្រងអ្នកប្រើប្រាស់',
        home: 'ការកំណត់រចនាសម្ព័ន្ធចូលរបស់អ្នកប្រើ',
        accredit: 'សមាសភាគអនុញ្ញាត',
        other: 'ប៉ារ៉ាម៉ែត្រផ្សេងទៀត។'
      },
      ipconfig: {
        _value: 'ការគ្រប់គ្រង IP',
        homepage: 'ការកំណត់រចនាសម្ព័ន្ធ IP'
      },
      parameter: {
        _value: 'ប៉ារ៉ាម៉ែត្រប្រព័ន្ធសំខាន់',
        furnace: 'ប៉ារ៉ាម៉ែត្រតំបន់ឡ',
        system: 'ការកំណត់រចនាសម្ព័ន្ធប៉ារ៉ាម៉ែត្រ'
      },
      file: {
        _value: 'ប៉ារ៉ាម៉ែត្រតំបន់ឡ',
        heat: 'ការកែសម្រួលកំដៅ',
        track: 'តាមដានការកែសម្រួល',
        n2: 'ការកែសម្រួលអាសូត',
        vacuum: 'កម្មវិធីនិពន្ធបូមធូលី',
        mes: 'កែសម្រួលខែ'
      },
      about: 'អំពីប្រព័ន្ធ'
    }
  }
};

export default locale;
