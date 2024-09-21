import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nAsyncOptions,
} from 'nestjs-i18n';
import { join } from 'path';

export const i18nConfig: I18nAsyncOptions = {
  useFactory: () => ({
    fallbackLanguage: 'ru',
    throwOnMissingKey: true,
    loaderOptions: {
      path: join(__dirname, '../../i18n/'),
      watch: true,
    },
  }),
  resolvers: [new HeaderResolver(['x-custom-lang']), AcceptLanguageResolver],
};
