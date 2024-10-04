import { Permission } from 'src/users/enums/permissions/permission.enum';

export type JWTUser = {
  id: string;
  email: string;
  permissions: Permission[];
};

export type YandexOAuthUser = {
  first_name: string;
  last_name: string;
  default_email: string;
  is_avatar_empty: boolean;
  birthday: string;
  default_avatar_id?: string;
  id: string;
};
