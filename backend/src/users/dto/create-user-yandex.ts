import { AuthProvider } from '../enums/auth-providers/auth-provider.enum';

export class CreateUserYandexDto {
  externalId: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  birthDate: string;
  authProvider: AuthProvider.YANDEX;
}
